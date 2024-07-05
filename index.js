import nodeserver from '@asymmetrik/node-fhir-server-core';
const { initialize, constants } = nodeserver
const { VERSIONS } = constants;

let config = {
    server: {},
    logging: {
        level: 'debug'
    },
    profiles: {
        patient: {
            service: './patient.service.cjs',
            versions: [ VERSIONS['3_0_1'] ]
        }
    }
};

let server = initialize(config);

server.listen(3000, () => {
    server.logger.info('Starting the FHIR Server at localhost:3000');
});