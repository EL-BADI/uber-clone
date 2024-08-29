import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Index = () => {
  return (
    <>
      <SignedIn>
        <Redirect href={"/(root)/(tabs)/Home"} />
      </SignedIn>
      <SignedOut>
        <Redirect href={"/(auth)/Welcome"} />
      </SignedOut>
    </>
  );
};

export default Index;
