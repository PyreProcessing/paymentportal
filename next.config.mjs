/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL || 'https://api.pyreprocessing.com/api/v1',
    ENV: process.env.ENV,
    ENCRYPTION_KEY: 34235252345,
  },
  // image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // wildcard whitelist for every domain
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;
