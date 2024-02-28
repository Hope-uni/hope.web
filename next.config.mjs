import path from "path";


const bucketURL = process.env.NEXT_PUBLIC_HOSTNAME_AZURE_BUCKET;

const remotePatternsArray = bucketURL?.split(',').map((url) => {
  return {
    protocol: 'https',
    hostname: url + '/**',
  }
});

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

/*
 * @type {import('next').NextConfig} 
 */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "app.scss";`
  },
  images: {
    remotePatterns: remotePatternsArray,
  },
}

export default nextConfig;