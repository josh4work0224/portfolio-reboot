/** @type {import('next').NextConfig} */
const nextConfig = {
  // No experimental flags needed for this feature in newer Next.js versions
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
