import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@Controller": path.resolve(__dirname, "Controller"),
      "@Model": path.resolve(__dirname, "Model"),
      "@Viuw": path.resolve(__dirname, "Viuw"),  // Asegúrate de usar "Viuw" en mayúscula si así está en tu estructura de carpetas.
    };
    return config;
  },
  images: {
    domains: ['cdn-icons-png.flaticon.com'],  // Agrega aquí el dominio que quieres permitir
  },
};

export default nextConfig;
