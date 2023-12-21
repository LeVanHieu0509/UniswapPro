module.exports = {
  basePath: "",
  env: {
    basePath: "",
  },
  publicRuntimeConfig: {
    site: {
      name: "Tap Hoa Jun Bf",
      url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://earvinpiamonte-nextjs-tailwindcss-template.vercel.app",
      title: "Next.js + Tailwind CSS template",
      description: "Next.js + Tailwind CSS template",
      socialPreview: "/images/preview.png",
    },
  },
  swcMinify: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },

  async rewrites() {
    return {
      fallback: [
        {
          source: "/backend/:path*",
          destination: `${process.env.API_ENDPOINT}/:path*`,
        },
      ],
    };
  },
};
