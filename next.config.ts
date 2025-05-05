import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // appDir:true, // Removed as it is not a valid property
    swcPlugins: [
      ["next-superjson-plugin", {}]
    ]
  },
  images: {
    domains: [
      'res.cloudinary.com',
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com"

    ]
  }
};

module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  }
}

export default nextConfig;
