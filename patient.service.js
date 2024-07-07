const db = require('./database/index.js');
const json_converter = require('./json-schema-converter')

//GET -> /Patient/ID
//Returns FHIR JSON for patient
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

//PATCH -> /Patient/ID?field=value&field2=value2...
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
            await db.query(queryString, values);
            console.log(`Successful PATCH request for patient ID: ${args.id}\n Updated columns ${cols} to ${values}`);
            //Return updated patient
            res = await db.query("SELECT * FROM patients WHERE identifier = $1", [args.id]);
            const FHIRres = json_converter.convertToFHIR(res[0]);
            //ensures correct handling by handler.update middleware and correct response code
            return {
                id: args.id,
                resource_version: undefined,
                created: false //PATCH should never create new resource
            };
        }
    } catch (error) {
        console.error('Error in PATCH route:', error);
        throw new Error(`Error in PATCH route: ${error.message}`);
    }
};

//DELETE -> /Patient/ID
//Deletes patient's data
//Returns 204 Response on success
module.exports.remove = async (args) => {
    try {
        // Check if patient exists
        const check = await db.query("SELECT * FROM patients WHERE identifier = $1", [args.id]);
        if (check.length === 0){
            throw new Error(`Unable to locate patient with ID: ${args.id}`);
        }
        // Delete patient
        await db.query("DELETE FROM patients WHERE identifier = $1", [args.id]);
        console.log(`Successful DELETE request for ${check.givenname} ${check.familyname} - ID: ${args.id}`);
    } catch (error) {
        console.error('Error in DELETE route:', error);
        throw new Error(`Error in DELETE route: ${error.message}`);
    }
};


