import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Limite de la taille de fichiers
      bodySizeLimit: "11mb",
    },
  },

  // Sources d'images autorisées pour next/image
  images: {
    remotePatterns: [
      new URL("https://s3-eu-west-1.amazonaws.com/**"),
      new URL("http://localhost:3000/uploads/**"),
    ],
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
