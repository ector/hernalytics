/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  distDir: './bin/tools/website/dist',
  eslint: {
      ignoreDuringBuilds: true
  },
  // Remember to change the image optimiser
  images: { unoptimized: true }
};

export default nextConfig;
