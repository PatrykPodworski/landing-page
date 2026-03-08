import dynamic from "next/dynamic";

const LogoAnimated = dynamic(
  () => import("@/components/Logo/LogoAnimated"),
  { ssr: false }
);

const GreetingAnimation = dynamic(
  () => import("@/components/GreetingAnimation/GreetingAnimation"),
  { ssr: false }
);

// TODO: Update packages
// TODO: Fix Speed Insights

const Home = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <LogoAnimated />
      <GreetingAnimation />
    </div>
  );
};

export default Home;
