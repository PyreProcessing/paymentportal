/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL || 'https://api.pyreprocessing.com/api/v1',
    ENV: process.env.ENV,
    ENCRYPTION_KEY: 'asdf234as2342asdf2i;lk342342;$23423',
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
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-Requested-With, Content-Type, Accept, Origin, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
