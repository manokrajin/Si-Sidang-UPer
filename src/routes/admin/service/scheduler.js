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
        dateEnd: entry.tanggal,
    }));
    console.log(allSchedules, 'allSchedules');

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
            const scheduledStartTime = new Date(`2000-01-01 ${scheduled[0].overlappingStart}`);
            const scheduledEndTime = new Date(`2000-01-01 ${scheduled[0].overlappingEnd}`);

            // If there is any overlap, we remove the schedule
            if (
                (startTime >= scheduledStartTime && startTime < scheduledEndTime) ||
                (endTime > scheduledStartTime && endTime <= scheduledEndTime) ||
                (startTime <= scheduledStartTime && endTime >= scheduledEndTime)
            ) {
                return false;
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
            console.log(pembimbingDocs, 'duar');

            const jamKosongList = pembimbingDocs[0].waktuKosong;
            return jamKosongList;
        } else {
            console.log(`Dokumen pembimbing ${nama} tidak ditemukan.`);
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getScheduled = async(nama) => {
    try {
        const dosenCollectionRef = collection(db, 'dosen');
        const querySnapshot = await getDocs(query(dosenCollectionRef, where('nama', '==', nama)));
        if (!querySnapshot.empty) {
            const pembimbingDocs = querySnapshot.docs.map((doc) => doc.data());
            console.log(pembimbingDocs, 'duar');
            if (pembimbingDocs[0].waktuTerisi) {
                const scheduled = pembimbingDocs[0].waktuTerisi;
                return scheduled;
            } else {
                console.log(`Dokumen pembimbing ${nama} tidak ditemukan. ini kah`);
                return null;
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

import { db } from '../../service/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const setJadwal = async(data) => {
    try {
        let schedule = [];
        let terisi = [];
        const dosenCollectionRef = collection(db, 'dosen');
        console.log(data, 'halo');
        if (data.dosenPembimbing1) {
            const nama1 = data.dosenPembimbing1;
            const jamKosongList1 = await getJamKosongList(nama1);

            schedule = [...schedule, ...jamKosongList1];
            const scheduled1 = await getScheduled(nama1);
            console.log(scheduled1, 'scheduled1');
            if (scheduled1) {
                terisi = [...terisi, ...scheduled1];
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
        }

        if (data.dosenPenguji1) {
            const nama3 = data.dosenPenguji1;
            const jamKosongList3 = await getJamKosongList(nama3);

            schedule = [...schedule, ...jamKosongList3];
            const scheduled3 = await getScheduled(nama3);
            if (scheduled3) {
                terisi = [...terisi, ...scheduled3];
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
        }

        if (data.dosenPenguji3) {
            const nama5 = data.dosenPenguji3;
            const jamKosongList5 = await getJamKosongList(nama5);

            schedule = [...schedule, ...jamKosongList5];
            const scheduled5 = await getScheduled(nama5);
            if (scheduled5) {
                terisi = [...terisi, ...scheduled5];
            }
        }

        const newSchedule = await scheduler(schedule, terisi);
        console.log(newSchedule, 'newSchedule');
    } catch (error) {
        console.log(error);
    }
};