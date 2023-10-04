/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api/socket",
        destination: "http://localhost:3000/api/socket",
      },
    ];
  },
}

module.exports = nextConfig
