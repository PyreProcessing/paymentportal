/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL || 'https://api.pyreprocessing.com/api/v1',
    ENV: process.env.ENV,
  },
  // image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // wildcard whitelist for every domain
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
