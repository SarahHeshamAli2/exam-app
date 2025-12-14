/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exam.elevateegy.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/account-settings",
        destination: "/account-settings/profile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
