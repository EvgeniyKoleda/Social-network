export default {
	host: {
		hostName: 'localhost',
		protocol: 'http',
		port: 9000,
		getHost() {
			return `${this.protocol}://${this.hostName}:${this.port}`;
		},
	},
};
