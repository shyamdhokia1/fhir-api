import nodeserver from '@asymmetrik/node-fhir-server-core';
const { initialize, constants } = nodeserver
const { VERSIONS } = constants;

let config = {
    server: {},
    logging: {
        level: 'debug'
    },
    profiles: {
        //dynamic import as commonjs
        patient: {
            service: async () => {
                const module = await import('./patient.service.js');
                return module.default || module;
              },
            versions: [ VERSIONS['3_0_1'] ]
        }
    }
};

let server = initialize(config);

server.listen(3000, () => {
    server.logger.info('Starting the FHIR Server at localhost:3000');
});