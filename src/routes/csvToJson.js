import Papa from 'papaparse';

const fs = require('fs');
const file = fs.createReadStream('tes1.csv')

async function dataToJson() {




    const dataToJson = await Papa.parse(file, {
        header: true, // Convert rows to Objects using headers as properties
        delimiter: ',', // CSV field delimiter
        complete: ((results) => console.log(results)) // Callback function    }
    });


    // The result is an object with 'data' property containing the parsed data

}


// Export the JSON data
export default dataToJson;