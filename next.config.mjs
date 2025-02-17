/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.postimg.cc',
          port: '',
          pathname: '/**',
          search: '',
        },
      ],
    },
  }
  
  export default nextConfig;