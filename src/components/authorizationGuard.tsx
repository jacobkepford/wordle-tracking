import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./loadingSpinner";
import { useUser } from "@clerk/nextjs";

const AuthorizationGuard = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const createUserID = api.user.createUser.useMutation();
  const user = useUser();
  const emailAddress = user.user?.primaryEmailAddress?.toString();

  const hasVerifiedUserID = localStorage.getItem("hasVerifiedUserID");

  if (!hasVerifiedUserID) {
    createUserID.mutate({ email: emailAddress! });
    localStorage.setItem("hasVerifiedUserID", "true");
  }

  const { data: isAuthorized, isLoading } = api.user.getAuthorized.useQuery();

  useEffect(() => {
    if (!isLoading && router.pathname != "/notauthorized" && !isAuthorized) {
      void router.push("/notauthorized");
    }
  }, [isAuthorized, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthorized && router.pathname == "/notauthorized") {
    void router.push("/");
  }

  if (isAuthorized || (!isAuthorized && router.pathname == "/notauthorized")) {
    return <>{children}</>;
  }

  return null;
};

export default AuthorizationGuard;
