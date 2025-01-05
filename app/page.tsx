import { LogoAnimated } from "@/components/Logo/LogoAnimated";

// TODO: Update packages
// TODO: Fix Speed Insights

const Home = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <LogoAnimated />
      <h1 className="text-slate-50 text-4xl mb-4 text-center select-none">
        Hello, I&apos;m Patryk
      </h1>
    </div>
  );
};

export default Home;
