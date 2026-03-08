import { LogoAnimated } from "@/components/Logo/LogoAnimated";
import { GreetingAnimation } from "@/components/GreetingAnimation/GreetingAnimation";

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
