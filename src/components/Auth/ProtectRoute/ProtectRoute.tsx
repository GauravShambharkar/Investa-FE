import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import type { PropsWithChildren } from "react";


export default function ProtectedRoute({ children }: PropsWithChildren) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
