import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        optimizePackageImports: [
            "@mantine/core",
            "@mantine/hooks",
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
