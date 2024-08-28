import { Redirect } from "expo-router";

const Index = () => {
  return <Redirect href={`/(auth)/Welcome`} />;
};

export default Index;
