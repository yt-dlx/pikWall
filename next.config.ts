import withPWAInit from "@ducanh2912/next-pwa";
const withPWA = withPWAInit({
  dest: "public"
});
export default withPWA({
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] }
});
