import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        BASE_SERVER: process.env.BASE_SERVER
    }
};

export default nextConfig;
