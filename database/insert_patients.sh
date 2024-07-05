#!/bin/bash
PSQL="psql -X --username=postgres --dbname=fhir --no-align --tuples-only -c"

cat patients.txt | while IFS="#" read ID NAME TELECOM ACTIVE GENDER BIRTHDATE DECEASED ADDRESS MARITAL CON_NAME CON_REL CON_TEL CON_ADD CON_GENDER COMM GP ORG
do
    output=$($PSQL "INSERT INTO patients(
        identifier,
        name,
        telecom,
        active,
        gender,
        birthDate,
        deceased,
        address,
        maritalStatus,
        contactName,
        contactRelationship,
        contactTelecom,
        contactAddress,
        contactGender,
        communication,
        generalPractitioner,
        managingOrganisation
    ) VALUES (
        $ID,
        '$NAME',
        '$TELECOM',
        $ACTIVE,
        '$GENDER',
        '$BIRTHDATE',
        $DECEASED,
        '$ADDRESS',
        '$MARITAL',
        '$CON_NAME',
        '$CON_REL',
        '$CON_TEL',
        '$CON_ADD',
        '$CON_GENDER',
        '$COMM',
        '$GP',
        '$ORG'
    );")

    if [[ $? -eq 0 ]]
    then
        echo "Added $NAME: $ID to database"
    else
        echo "Adding $NAME: $ID to database failed"
    fi
done