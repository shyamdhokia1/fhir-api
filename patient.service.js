const db = require('./database/index.js');
const json_converter = require('./json-schema-converter')

module.exports.searchById = (args) => new Promise((resolve, reject) => {
    (async () => {
        try {
            const res = await db.query("SELECT * FROM patients WHERE identifier = $1", [args.id]);
            if (res.length > 0) {
				//add a console.log here
				const FHIRres = json_converter.convertToFHIR(res[0])
                resolve(FHIRres);
            } else {
                reject(new Error(`Unable to locate patient with ID: ${args.id}`));
            }
        } catch (error) {
            reject(new Error(`Error querying database: ${error.message}`));
        }
    })();
});