import path from 'path';

// const bucketURL = process.env.NEXT_PUBLIC_HOSTNAME_AZURE_BUCKET;
const bucketURL =
  'api.dicebear.com,static.arasaac.org,img.freepik.com,plus.unsplash.com,encrypted-tbn0.gstatic.com,image.api.playstation.com,static.wikia.nocookie.net';

const remotePatternsArray = bucketURL?.split(',').map((url) => {
  return {
    protocol: 'https',
    hostname: url + '/**',
  };
});

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

/*
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "@/styles/app.scss";`,
  },
  images: {
    remotePatterns: remotePatternsArray,
  },
};

export default nextConfig;
