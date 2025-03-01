const FHIRServer = require('@asymmetrik/node-fhir-server-core');
const path = require('path');

const { VERSIONS } = FHIRServer.constants;

let config = {
    server: {},
	auth: {
		strategy: {
			name: 'basic',
			service: './src/basic.service.js'
		}
	},
    logging: {
        level: 'debug'
    },
    profiles: {
		patient: {
			service: path.posix.resolve('./src/patient.service.js'),
			versions: [ VERSIONS['3_0_1'] ]
		}
    }
};

let server = FHIRServer.initialize(config);

server.listen(3000, () => {
    server.logger.info('Starting the FHIR Server at localhost:3000');
});