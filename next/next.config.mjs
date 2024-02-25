/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [{ source: '/', destination: '/todo', permanent: true }];
	},
};

export default nextConfig;
