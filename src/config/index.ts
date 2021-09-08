export default {
	host: {
		hostName: 'localhost',
		protocol: 'http',
		port: 9000,
		getHost() {
			return `${this.protocol}://${this.hostName}:${this.port}`;
		},
	},
	security: {
		saltOrRounds: 10,
		secretKey: '1d2d37dd-1956-4ccc-8cba-6983bed74228',
		expiresIn: {
			time: '1',
			unit: 'd',
		},
	},
	webApp: {
		hostName: 'localhost',
		protocol: 'http',
		port: 3000,
		getHost() {
			return `${this.protocol}://${this.hostName}:${this.port}`;
		},
	},
	mailer: {
		originAdress: 'evsx.inc@gmail.com',
	},
	filesDir: 'uploads',
};
