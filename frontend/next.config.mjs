/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    VITE_HOST_BACKEND_V1: process.env.HOST_BACKEND_V1,
  },
};

export default nextConfig;
