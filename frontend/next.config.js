/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['merxdev.nyc3.digitaloceanspaces.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.digitaloceanspaces.com',
            },
        ],
    },
};

module.exports = nextConfig;
