/** @type {import('next').NextConfig} */
const nextConfig = {
  // image domains
  images: {
    remotePatterns: [
      {
        // setup th.bing.com as a remote image host and allow for all images
        protocol: "https",
        hostname: "globalhealthandhome.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      }
    ],
  },
};

export default nextConfig;
