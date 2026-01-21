import withPWAInit from "@ducanh2912/next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;

const withPWA = withPWAInit({
  dest: "public", // where the service worker will be generated
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in local dev
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your existing config here
};

export default withPWA(nextConfig);