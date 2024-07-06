// Transforms a patient object returned from SQL query into FHIR-compliant JSON format.

const convertToFHIR = (patient) => {
    const {
        identifier,
        active, 
        givenname, 
        familyname, 
        telecom, 
        gender, 
        birthdate, 
        deceased, 
        address,
        maritalstatus,
        contactgivenname,
        contactfamilyname,
        contactrelationship,
        contacttelecom,
        contactaddress,
        contactgender,
        communication,
        generalpractitioner,
        managingorganisation
    } = patient

    const fhirJSON = {
        "resourceType" : "Patient",
        "identifier" : [{
        "use" : "usual",
        "type" : {
            "coding" : [{
            "system" : "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code" : "MR"
            }]
        },
        "system" : "urn:oid:1.2.36.146.595.217.0.1",
        "value" : identifier,
        "assigner" : {
            "display" : "General Healthcare"
        }
        }],
        "active" : active,
        "name" : [{
        "use" : "official",
        "family" : familyname,
        "given" : [givenname]
        }],
        "telecom" : [{
        "system" : "phone",
        "value" : telecom,
        "use" : "home",
        "rank" : 1
        }],
        "gender" : gender,
        "birthDate" : birthdate,
        "deceasedBoolean" : deceased,
        "address" : [{
        "use" : "home",
        "type" : "both",
        "text" : address,
        }],
        "maritalStatus" : {
            "coding" : [{
            "system" : "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
            "code" : maritalstatus,
            "display" : maritalstatus === "M" ? "Married" 
            : maritalstatus === "S" ? "Never Married"
            : maritalstatus === "D" ? "Divorced" : ""
            }]
        },
        "contact" : [{
        "relationship" : [{
            "coding" : [{
            "system" : "http://terminology.hl7.org/CodeSystem/v2-0131",
            "code" : contactrelationship
            }]
        }],
        "name" : {
            "family" : contactfamilyname,
            "given" : [contactgivenname]
        },
        "telecom" : [{
            "system" : "phone",
            "value" : contacttelecom,
            "use" : "home",
            "rank" : 1
        }],
        "address" : [{
            "use" : "home",
            "type" : "both",
            "text" : contactaddress,
        }],
        "gender" : contactgender,
        }],
        "communication" : [{
            "language": communication,
            "preferred": true
        }],
        // In actual implementation the following fields are reference not string
        "generalPractitioner" : {
            "text" : generalpractitioner
        },
        "managingOrganization" : {
            "text" : managingorganisation
        }
    }
  return fhirJSON
};

module.exports = {convertToFHIR};