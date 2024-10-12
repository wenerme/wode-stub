import process from 'node:process';

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // typedRoutes: true
    swrDelta: 60,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kewpie.com.cn',
        port: '',
      },
      // {
      //   hostname: 'localhost',
      // },
    ],
  },
  async rewrites() {
    const { SERVER_URL } = process.env;
    let redir = [
      {
        source: '/api/:path*',
        destination: `${SERVER_URL}/api/:path*`,
      },
    ];
    return redir;
  },
};

export default nextConfig;
