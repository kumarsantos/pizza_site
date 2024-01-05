/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "media.istockphoto.com"], //this is mandatory to add any third party urls in this demoain sections
  },
};

module.exports = nextConfig;
