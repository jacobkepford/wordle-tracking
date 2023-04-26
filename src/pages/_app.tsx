import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Header } from "~/components/header";
import AuthorizationGuard from "~/components/authorizationGuard";
import { Footer } from "~/components/footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      {...pageProps}
    >
      <SignedIn>
        <Header />
        <AuthorizationGuard>
          <Component {...pageProps} />
        </AuthorizationGuard>
        <Footer />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
