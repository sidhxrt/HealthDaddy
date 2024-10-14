/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                permanent: true,
                source: "/localhost/:path*",
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
            }
        ]
    }
};

export default nextConfig;
