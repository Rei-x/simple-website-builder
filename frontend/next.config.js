/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};
