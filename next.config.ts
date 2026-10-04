import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `standalone` hanya untuk self-host/sandbox.
  // Di Vercel, pipeline build miliknya sendiri yang dipakai.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  allowedDevOrigins: ["*.space-z.ai"],
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
