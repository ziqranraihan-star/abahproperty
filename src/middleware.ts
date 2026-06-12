import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/real-estate/:path*",
    "/admin/broker/:path*",
    "/admin/renovasi/:path*",
    "/admin/karir/:path*",
    "/admin/csr/:path*",
  ],
};
