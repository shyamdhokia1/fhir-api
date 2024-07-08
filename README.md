# FHIR API Project

A **FHIR** (Fast Healthcare Interoperability Resources) API using **Node.js** and **Express.js** with a **PostgreSQL** database. **FHIR** is a standard for exchanging healthcare information electronically, providing a set of resources and APIs for interoperability. It is built upon the `node-fhir-server-core` project.

Dummy patient data is loaded into a **PostgreSQL** database using a bash script. The database contains a patient data table and a users table for basic auth, which is implemented using **Passport.js**. Only the fundamental [Patient FHIR resource](https://build.fhir.org/patient.html) is currently implemented. The server exposes endpoints for reading patient data by ID, searching using specific fields, updating patient data and deleting an entry. 

### Disclaimer

This is a personal project intended for educational purposes in backend development and should not be deployed in its current form.

## Technologies

- Node.js
- Express.js
- PostgreSQL
- Jest (Unit Testing)

## Installation

To run the build of this project, make sure Node and PostgreSQL are installed and follow these steps:

1. **Clone the repository:**

```
git clone https://github.com/shyamdhokia1/fhir-api
cd fhir-api
```
2. **Build SQL database**

```
cd database
psql -U user -d target_database < patients.sql
```

3. **Define .env variables**
Update your .env with the correct details for your postgreSQL user/installation

```
cd ..
mv sample.env .env
```

4. **Install and Run**

```
cd ..
npm install
npm run
```

> Default API username is *test* and password is *password*

## API 

### `GET /Patient/ID`

Returns FHIR formatted JSON for patient with the specified ID.

- **Parameters:**
    
    - `ID` (string): Identifier of the patient
- **Example Request:**
    
    `GET /Patient/123`
    
- **Example Response:**

json
``` 
{
    "resourceType": "Patient",
    "identifier": [
        {
            "use": "usual",
            "type": {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                        "code": "MR"
                    }
                ]
            },
            "system": "urn:oid:1.2.36.146.595.217.0.1",
            "value": 11111114,
            "assigner": {
                "display": "General Healthcare"
            }
        }
    ],
    "active": true,
    "name": [
        {
            "use": "official",
            "family": "Brown",
            "given": [
                "Charlie"
            ]
        }
    ],
    "telecom": [
        {
            "system": "phone",
            "value": "(555)555-1218",
            "use": "home",
            "rank": 1
        }
    ],
    "gender": "male",
    "birthDate": "1985-12-05T00:00:00.000Z",
    "deceasedBoolean": false,
    "address": [
        {
            "use": "home",
            "type": "both",
            "text": "45 Elm St, Anytown, WY 82001"
        }
    ],
    "maritalStatus": {
        "coding": [
            {
                "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                "code": "S",
                "display": "Never Married"
            }
        ]
    },
    "contact": [
        {
            "relationship": [
                {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
                            "code": "C"
                        }
                    ]
                }
            ],
            "name": {
                "family": "van Pelt",
                "given": [
                    "Lucy"
                ]
            },
            "telecom": [
                {
                    "system": "phone",
                    "value": "(555)555-1219",
                    "use": "home",
                    "rank": 1
                }
            ],
            "address": [
                {
                    "use": "home",
                    "type": "both",
                    "text": "45 Elm St, Anytown, WY 82001"
                }
            ],
            "gender": "female"
        }
    ],
    "communication": [
        {
            "language": "English",
            "preferred": true
        }
    ],
    "generalPractitioner": {
        "text": "Dr. Harris, Mountain View Clinic"
    },
    "managingOrganization": {
        "text": "St. Jude Hospital"
    }
}
```
    

### `GET /Patient`

Searches for patients matching all provided key-value criteria, returning FHIR JSON.

- **Parameters:**
    
    - Query parameters (`key1=value1&key2=value2...`)
- **Example Request:**
    
    bash
    
    `GET /Patient?gender=male&familyname=Miller`
    
- **Example Response:**

json
``` 
{
    "resourceType": "Patient",
    "identifier": [
        {
            "use": "usual",
            "type": {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                        "code": "MR"
                    }
                ]
            },
            "system": "urn:oid:1.2.36.146.595.217.0.1",
            "value": 11111114,
            "assigner": {
                "display": "General Healthcare"
            }
        }
    ],
    "active": true,
    "name": [
        {
            "use": "official",
            "family": "Miller",
            "given": [
                "Charlie"
            ]
        }
    ]...
},
{
    "resourceType": "Patient",
    "identifier": [
        {
            "use": "usual",
            "type": {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                        "code": "MR"
                    }
                ]
            },
            "system": "urn:oid:1.2.36.146.595.217.0.1",
            "value": 11111115,
            "assigner": {
                "display": "General Healthcare"
            }
        }
    ],
    "active": true,
    "name": [
        {
            "use": "official",
            "family": "Miller",
            "given": [
                "Joe"
            ]
        }
    ]...
}

```
    
### `PATCH /Patient/ID`

Updates patient data specified by ID with provided key-value pairs.

- **Parameters:**
    - ID
    - Query parameters (`key1=value1&key2=value2...`): Updated values
- **Example Request:**
    
    bash
    
    `PATCH /Patient/123?communication=French`
    
- **Response:**

```
HTTP/1.1 200 OK
```

### `DELETE /Patient/ID`

Deletes patient data specified by ID.

- **Parameters:**
    - ID

- **Example Request:**
    
    bash
    
    `DELETE /Patient/123`
    
- **Example Response:**
    
```
HTTP/1.1 204 No Content
```