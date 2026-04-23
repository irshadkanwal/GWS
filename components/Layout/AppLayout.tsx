import React from "react";
import dynamic from "next/dynamic";
import { NON_PROTECTED_ROUTES } from "@/constants/nonProtectedRoutes";
import { useUserStore } from "../../store";
import type { AppProps } from "next/app";
import { useSession } from "next-auth/react";
import { FindCareRegistryModalProvider } from "@/context/FindCareRegistryModalContext";
import { ROUTES } from "@/constants/routes";
import GwsLoaderLogo from "../shared/gws-loader-logo";

function AppLayout({ Component, pageProps, router }: AppProps) {
  const isNonProtectedRoute = NON_PROTECTED_ROUTES.includes(router.pathname);
  const { data: session, status } = useSession();
  const [hasCheckedRedirect, setHasCheckedRedirect] = React.useState(false);

  const setUser = useUserStore(React.useCallback((state) => state.setUser, []));
  const resetUser = useUserStore(
    React.useCallback((state) => state.resetUser, [])
  );
  const routePermissions = useUserStore(
    React.useCallback((state) => state.meta.permissions.routePermissions, [])
  );

  const userID = session?.user.id;

  React.useEffect(() => {
    if (status === "loading") return;

    if (userID && status === "authenticated") {
      setUser(session?.user);

      if (
        isNonProtectedRoute ||
        (routePermissions && !routePermissions?.[router.pathname])
      ) {
        router.replace(ROUTES.DASHBOARD.pathName);
      }

      return;
    }

    resetUser();

    if (!isNonProtectedRoute) {
      router.replace("/");
    }
  }, [
    router,
    session?.user,
    setUser,
    userID,
    status,
    resetUser,
    routePermissions,
  ]);

  if (!status || status === "loading") {
    return <GwsLoaderLogo />;
  }

  if (!userID) {
    const PreAuthScreenLayout = dynamic(() => import("./PreAuthScreenLayout"), {
      ssr: false,
    });

    if (isNonProtectedRoute) {
      return (
        <FindCareRegistryModalProvider>
          <PreAuthScreenLayout>
            <Component {...pageProps} />
          </PreAuthScreenLayout>
        </FindCareRegistryModalProvider>
      );
    }
    return <></>;
  }

  const PostAuthScreenLayout = dynamic(() => import("./PostAuthScreenLayout"), {
    ssr: false,
  });

  return (
    <PostAuthScreenLayout>
      <Component {...pageProps} />
    </PostAuthScreenLayout>
  );
}

export default AppLayout;
