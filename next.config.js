/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //add something like a proxy to the socket server
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/socket",
  //       destination: process.env.SOCKET_SERVER_URL,
  //     },
  //   ];
  // },
}
module.exports = nextConfig
