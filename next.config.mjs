/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Ensure static export works properly
  trailingSlash: false,
  // Optimize for deployment
  compress: true,
  poweredByHeader: false,
  // Handle middleware properly
  async rewrites() {
    return [
      {
        source: '/((?!api|_next|_static|favicon.ico).*)',
        destination: '/',
        has: [
          {
            type: 'header',
            key: 'x-pathname',
            value: '(?<pathname>.*)',
          },
        ],
      },
    ]
  },
}

export default nextConfig