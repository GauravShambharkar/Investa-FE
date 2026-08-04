import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Suspense, type PropsWithChildren } from "react";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  return (
    <>
      <SignedIn>
        <Suspense
          fallback={
            <div className="w-full h-40 bg-white flex items-center justify-center text-white">
              <h1>Loading...</h1>
            </div>
          }
        >
          {children}
        </Suspense>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
