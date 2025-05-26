import { AuthProvider, useAuth } from "@/context/authContext";
import "../global.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from 'next/head';

function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until loading is false

    const pathname = router.pathname;

    // Not logged in
    if (!user) {
      if (pathname.startsWith("/admin")) {
        router.replace("/login");
      }
      return;
    }

    // Logged in as user
    if (user.role === "user") {
      if (pathname.startsWith("/admin") || pathname === "/signup") {
        router.replace("/");
      } else if (pathname === "/login") {
        router.replace("/");
      }
      return;
    }

    // Logged in as admin
    if (user.role === "admin") {
      if (pathname === "/login" || pathname === "/"||pathname === "/signup" || pathname === "/bestDeals" || pathname === "/product"|| !pathname.startsWith("/admin")) {
        router.replace("/admin");
      }
      // Don't redirect if already on /admin or a valid admin subpage
      return;
    }
  }, [user, loading, router.pathname]);

  if (loading) return null;

  return <>{children}</>;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ORU Phones</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
    <AuthProvider>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </AuthProvider>
    </>
  );
}
