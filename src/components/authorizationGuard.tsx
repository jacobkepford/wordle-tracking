import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./loadingSpinner";

const AuthorizationGuard = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const user = useUser();
  const userEmailAddress = user.user?.primaryEmailAddress?.toString();
  const { data: isAuthorized, isLoading } =
    api.authorizedUser.getAuthorized.useQuery({
      text: userEmailAddress!,
    });

  useEffect(() => {
    if (!isLoading && router.pathname != "/notauthorized") {
      if (!isAuthorized) {
        void router.push("/notauthorized");
      }
    }
  }, [user, isAuthorized, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthorized || (!isAuthorized && router.pathname == "/notauthorized")) {
    return <>{children}</>;
  }

  return null;
};

export default AuthorizationGuard;
