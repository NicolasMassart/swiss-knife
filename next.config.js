/** @type {import('next').NextConfig} */
const subdomains = require("./subdomains.js");

const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return {
      beforeFiles: [
        // Rewrite for static assets in the public folder
        {
          source: "/chainIcons/:asset*",
          destination: "/chainIcons/:asset*",
        },
        // set up subdomains
        ...Object.values(subdomains).map((subdomain) => ({
          source: "/:path((?!_next|chainIcons).*)", // Exclude chainIcons from subdomain rewrites
          has: [
            {
              type: "host",
              value: `${subdomain}.swiss-knife.xyz`,
            },
          ],
          destination: `/${subdomain}/:path*`,
        })),
      ],
    };
  },
};

module.exports = nextConfig;
