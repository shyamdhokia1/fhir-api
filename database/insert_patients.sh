#!/bin/bash
PSQL="psql -X --username=postgres --dbname=fhir --no-align --tuples-only -c"

cat patients.txt | while IFS="#" read ID GIVENNAME FAMNAME TELECOM ACTIVE GENDER BIRTHDATE DECEASED ADDRESS MARITAL CON_GIV_NAME CON_FAM_NAME CON_REL CON_TEL CON_ADD CON_GENDER COMM GP ORG
do
    output=$($PSQL "INSERT INTO patients(
        identifier,
        givenName,
        familyName,
        telecom,
        active,
        gender,
        birthDate,
        deceased,
        address,
        maritalStatus,
        contactGivenName,
        contactFamilyName,
        contactRelationship,
        contactTelecom,
        contactAddress,
        contactGender,
        communication,
        generalPractitioner,
        managingOrganisation
    ) VALUES (
        $ID,
        '$GIVENNAME',
        '$FAMNAME',
        '$TELECOM',
        $ACTIVE,
        '$GENDER',
        '$BIRTHDATE',
        $DECEASED,
        '$ADDRESS',
        '$MARITAL',
        '$CON_GIV_NAME',
        '$CON_FAM_NAME',
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
        echo "Added $GIVENNAME $FAMILYNAME: $ID to database"
    else
        echo "Adding $GIVENNAME $FAMILYNAME: $ID to database failed"
    fi
done