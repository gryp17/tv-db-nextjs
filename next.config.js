const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'static.tvmaze.com'
			}
		]
	},
	// custom hack used to disable CSS modules...
	webpack(config) {
		const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
		if (!oneOfRule) return console.log('Unable to find css module rule to disabled it');
		oneOfRule.oneOf.forEach((one) => {
			if (!(one.issuer && one.issuer.and && `${one.issuer.and}`.includes('_app'))) return;
			one.issuer.and = [path.resolve(__dirname)];
		});
		return config;
	}
};

module.exports = nextConfig;
