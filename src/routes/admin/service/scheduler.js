// @ts-nocheck
const scheduler = async(schedule, scheduled) => {
    // const scheduled = [{
    //     date: '2023-08-01',
    //     overlappingStart: '10:00:00',
    //     overlappingEnd: '12:00:00'
    // }];
    // // Menggabungkan semua jadwal menjadi satu array
    const allSchedules = schedule.map((entry) => ({
        timeStart: entry.jamAwal,
        timeEnd: entry.jamAkhir,
        dateStart: entry.tanggal,
        dateEnd: entry.tanggal
    }));

    // Mengambil semua tanggal unik dari jadwal yang digabungkan
    const uniqueDates = [...new Set(allSchedules.map((schedule) => schedule.dateStart))];

    // Mencari tanggal yang terdefinisi di semua array of object
    const commonDates = uniqueDates.filter((date) => {
        return [allSchedules].every((schedule) => schedule.some((entry) => entry.dateStart === date));
    });

    // Mencari waktu beririsan minimal 120 menit (2 jam) untuk setiap tanggal unik yang terdefinisi di semua array
    const overlappingTimes = commonDates.map((date) => {
        // Mengambil jadwal untuk tanggal tertentu
        const schedulesForDate = allSchedules.filter((schedule) => schedule.dateStart === date);

        // Menentukan waktu beririsan minimal 120 menit (2 jam) untuk tanggal tersebut
        let overlappingStart = '00:00:00';
        let overlappingEnd = '23:59:59';

        schedulesForDate.forEach((schedule) => {
            if (schedule.timeStart > overlappingStart) {
                overlappingStart = schedule.timeStart;
            }
            if (schedule.timeEnd < overlappingEnd) {
                overlappingEnd = schedule.timeEnd;
            }
        });

        // Jika waktu beririsan minimal kurang dari 120 menit, anggap waktu tidak valid
        const minDuration = 120; // dalam menit
        const diffMinutes =
            (new Date(`2000-01-01 ${overlappingEnd}`) - new Date(`2000-01-01 ${overlappingStart}`)) /
            60000;
        if (diffMinutes < minDuration) {
            overlappingStart = '';
            overlappingEnd = '';
        }

        return { date, overlappingStart, overlappingEnd };
    });

    // Filter data yang overlapping valid (overlappingEnd > overlappingStart)
    const validOverlappingTimes = overlappingTimes.filter(
        (overlapping) => overlapping.overlappingStart !== ''
    );

    // Membagi overlapping valid menjadi jadwal 2 jam
    const twoHourSchedules = validOverlappingTimes.flatMap((overlapping) => {
        const { overlappingStart, overlappingEnd } = overlapping;
        const startTime = new Date(`2000-01-01 ${overlappingStart}`);
        const endTime = new Date(`2000-01-01 ${overlappingEnd}`);
        const twoHourIntervals = [];

        while (startTime < endTime) {
            const nextTime = new Date(startTime.getTime() + 120 * 60000);
            if (nextTime <= endTime) {
                twoHourIntervals.push({
                    date: overlapping.date,
                    overlappingStart: startTime.toTimeString().slice(0, 8),
                    overlappingEnd: nextTime.toTimeString().slice(0, 8)
                });
            }
            startTime.setTime(nextTime);
        }

        return twoHourIntervals;
    });

    let filteredTwoHourSchedules = twoHourSchedules;

    if (scheduled.length > 0) {
        // Filter `twoHourSchedules` to remove overlapping schedules with the data in `scheduled`
        filteredTwoHourSchedules = twoHourSchedules.filter((schedule) => {
            const startTime = new Date(`2000-01-01 ${schedule.overlappingStart}`);
            const endTime = new Date(`2000-01-01 ${schedule.overlappingEnd}`);

            for (const scheduledEntry of scheduled) {
                const scheduledStartTime = new Date(`2000-01-01 ${scheduledEntry.overlappingStart}`);
                const scheduledEndTime = new Date(`2000-01-01 ${scheduledEntry.overlappingEnd}`);

                // Check for overlap in date and time
                if (
                    schedule.date === scheduledEntry.date &&
                    ((startTime >= scheduledStartTime && startTime < scheduledEndTime) ||
                        (endTime > scheduledStartTime && endTime <= scheduledEndTime) ||
                        (startTime <= scheduledStartTime && endTime >= scheduledEndTime))
                ) {
                    return false;
                }
            }

            return true;
        });
    }
    return filteredTwoHourSchedules[0];
};
const getJamKosongList = async(nama) => {
    try {
        const dosenCollectionRef = collection(db, 'dosen');
        const querySnapshot = await getDocs(query(dosenCollectionRef, where('nama', '==', nama)));

        if (!querySnapshot.empty) {
            const pembimbingDocs = querySnapshot.docs.map((doc) => doc.data());
            const jamKosongList = pembimbingDocs[0].waktuKosong;
            return jamKosongList;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

const setScheduled = async(nama, scheduled) => {
    try {
        const dosenCollectionRef = collection(db, 'dosen');
        const querySnapshot = await getDocs(query(dosenCollectionRef, where('nama', '==', nama)));

        if (!querySnapshot.empty) {
            const pembimbingDocs = querySnapshot.docs.map((doc) => doc.data());
            const id = querySnapshot.docs[0].id;
            const scheduleToPush = {
                date: scheduled.date,
                overlappingStart: scheduled.overlappingStart,
                overlappingEnd: scheduled.overlappingEnd
            };
            let scheduledList = scheduleToPush;

            await updateDoc(doc(db, 'dosen', id), {
                waktuTerisi: [scheduledList]
            });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const getScheduled = async(nama) => {
    try {
        const dosenCollectionRef = collection(db, 'dosen');
        const querySnapshot = await getDocs(query(dosenCollectionRef, where('nama', '==', nama)));
        if (!querySnapshot.empty) {
            const pembimbingDocs = querySnapshot.docs.map((doc) => doc.data());
            if (pembimbingDocs[0].waktuTerisi) {
                const scheduled = pembimbingDocs[0].waktuTerisi;
                return scheduled;
            } else {
                return null;
            }
        }
    } catch (error) {
        return null;
    }
};

import { db } from '../../service/firestore';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

export const setJadwal = async(data) => {
    try {
        let schedule = [];
        let terisi = [];
        let dosenTanpaJadwal = [];
        const dosenCollectionRef = collection(db, 'dosen');
        if (data.dosenPembimbing1) {
            const nama1 = data.dosenPembimbing1;
            const jamKosongList1 = await getJamKosongList(nama1);

            schedule = [...schedule, ...jamKosongList1];
            const scheduled1 = await getScheduled(nama1);
            if (scheduled1) {
                terisi = [...terisi, ...scheduled1];
            }
            if (!jamKosongList1 || jamKosongList1.length === 0) {
                dosenTanpaJadwal.push(data.dosenPembimbing1); // Add professor to the list
            }
        }

        if (data.dosenPembimbing2) {
            const nama2 = data.dosenPembimbing2;
            const jamKosongList2 = await getJamKosongList(nama2);

            schedule = [...schedule, ...jamKosongList2];
            const scheduled2 = await getScheduled(nama2);

            if (scheduled2) {
                terisi = [...terisi, ...scheduled2];
            }
            if (!jamKosongList2 || jamKosongList2.length === 0) {
                dosenTanpaJadwal.push(data.dosenPembimbing2); // Add professor to the list
            }
        }

        if (data.dosenPenguji1) {
            const nama3 = data.dosenPenguji1;
            const jamKosongList3 = await getJamKosongList(nama3);

            schedule = [...schedule, ...jamKosongList3];
            const scheduled3 = await getScheduled(nama3);
            if (scheduled3) {
                terisi = [...terisi, ...scheduled3];
            }
            if (!jamKosongList3 || jamKosongList3.length === 0) {
                dosenTanpaJadwal.push(data.dosenPenguji1); // Add professor to the list
            }
        }

        if (data.dosenPenguji2) {
            const nama4 = data.dosenPenguji2;
            const jamKosongList4 = await getJamKosongList(nama4);

            schedule = [...schedule, ...jamKosongList4];
            const scheduled4 = await getScheduled(nama4);
            if (scheduled4) {
                terisi = [...terisi, ...scheduled4];
            }
            if (!jamKosongList4 || jamKosongList4.length === 0) {
                dosenTanpaJadwal.push(data.dosenPenguji2); // Add professor to the list
            }
        }

        if (data.dosenPenguji3) {
            const nama5 = data.dosenPenguji3;
            const jamKosongList5 = await getJamKosongList(nama5);

            schedule = [...schedule, ...jamKosongList5];
            const scheduled5 = await getScheduled(nama5);
            if (scheduled5) {
                terisi = [...terisi, ...scheduled5];
            }
            if (!jamKosongList5 || jamKosongList5.length === 0) {
                dosenTanpaJadwal.push(data.dosenPenguji3); // Add professor to the list
            }
        }
        if (dosenTanpaJadwal.length > 0) {
            const missingProfessors = dosenTanpaJadwal.join(', ');
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: `Dosen ${missingProfessors} belum mengisi jadwal!`
            });
            return;
        }
        if (dosenTanpaJadwal.length === 0) {
            const newSchedule = await scheduler(schedule, terisi);
            if (newSchedule) {
                const scheduled = await setScheduled(data.dosenPembimbing1, newSchedule);
                if (data.dosenPembimbing2) {
                    const scheduled1 = await setScheduled(data.dosenPembimbing2, newSchedule);
                }
                if (data.dosenPenguji1) {
                    const scheduled2 = await setScheduled(data.dosenPenguji1, newSchedule);
                }
                if (data.dosenPenguji2) {
                    const scheduled3 = await setScheduled(data.dosenPenguji2, newSchedule);
                }
                if (data.dosenPenguji3) {
                    const scheduled4 = await setScheduled(data.dosenPenguji3, newSchedule);
                }
                if (scheduled) {
                    return newSchedule;
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Tidak ada jadwal yang tersedia!'
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};