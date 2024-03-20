/** @type {import('next').NextConfig} */
const nextConfig = {
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
