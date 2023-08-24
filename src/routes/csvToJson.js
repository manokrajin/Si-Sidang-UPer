import Papa from 'papaparse';

const fs = require('fs');
const file = fs.createReadStream('tes1.csv')

async function dataToJson() {

    const dataToJson = await Papa.parse(file, {
        header: true, // Convert rows to Objects using headers as properties
        delimiter: ',', // CSV field delimiter
    });

}


// Export the JSON data
export default dataToJson;