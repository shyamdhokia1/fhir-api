const db = require('./database/index.js');
const json_converter = require('./json-schema-converter')

//GET -> /Patient/ID
module.exports.searchById = async (args) => {
    try {
        // query postgres db
        const res = await db.query("SELECT * FROM patients WHERE identifier = $1", [args.id]);
        
        if (res.length > 0) {
            // if returned array contains a patient, convert to FHIR JSON
            const FHIRres = json_converter.convertToFHIR(res[0]);
            console.log(`Successful GET request for ${FHIRres.name[0].given[0]} ${FHIRres.name[0].family} - ID: ${args.id}`);
            return FHIRres;
        } else {
            throw new Error(`Unable to locate patient with ID: ${args.id}`);
        }
    } catch (error) {
        console.error('Error in GET route:', error);
        throw new Error(`Error in GET route: ${error.message}`);
    }
};

//PATCH -> /Patient/ID?field=value
//Receives field: value pairs via parameters and updates postgres db with values
//Returns 200 Response on success
module.exports.patch = async (args, { req }) => {
    const update = req.query;
    const cols = Object.keys(update);
    const values = Object.values(update);

    // Generate parameterized query
    const setList = cols.map((col, index) => `${col} = $${index + 1}`).join(', ');
    const queryString = `UPDATE patients SET ${setList} WHERE identifier = ${args.id}`;
    try {
        //Check if patient exists
        let res = await db.query("SELECT * FROM patients WHERE identifier = $1", [args.id]);
        if (res.length === 0){
            throw new Error(`Unable to locate patient with ID: ${args.id}`);
        } else {
            //Update db
            const updateResult = await db.query(queryString, values);
            console.log(`Successful PATCH request for patient ID: ${args.id}\n Updated columns ${cols} to ${values}`);
            //Return updated patient
            res = await db.query("SELECT * FROM patients WHERE identifier = $1", [args.id]);
            const FHIRres = json_converter.convertToFHIR(res[0]);
            return {
                id: args.id,
                resource_version: FHIRres.meta ? FHIRres.meta.versionId : undefined,
                created: false //PATCH should never create new resource
            };
        }
    } catch (error) {
        console.error('Error in PATCH route:', error);
        throw new Error(`Error in PATCH route: ${error.message}`);
    }
};


