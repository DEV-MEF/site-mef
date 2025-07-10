import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        BASE_SERVER: process.env.BASE_SERVER,
        WEB_BASE_SERVER: process.env.WEB_BASE_SERVER
    },
    images:{
        remotePatterns: [
            {
                protocol: "http",
                hostname: "217.76.55.123",
                port: "8091"
            },
            {
                protocol: "https",
                hostname: "bemef.financas.st",
                port: ""
            }
        ]
    }
};

export default nextConfig;
