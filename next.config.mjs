/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },
  // Remove output: 'export' for Vercel deployment
  // output: 'export',
  trailingSlash: false,
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
