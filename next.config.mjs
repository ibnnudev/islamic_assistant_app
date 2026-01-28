/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable source maps in development to avoid 404s for third-party libs like Framer Motion
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Suppress source map warnings for node_modules
      config.ignoreWarnings = [
        { module: /node_modules/ },
        { message: /Failed to parse source map/ },
      ];
    }
    return config;
  },
};

export default nextConfig;
