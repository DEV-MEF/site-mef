import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        BASE_SERVER: process.env.BASE_SERVER
    },
    images:{
        remotePatterns: [
            {
                protocol:"http",
                hostname: "217.76.55.123",
                port:"8091"
            }
        ]
    }
};

export default nextConfig;
