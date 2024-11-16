import { LogoAnimated } from "@/components/Logo/LogoAnimated";

// TODO: Update packages
const Home = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <LogoAnimated />
      <h1 className="text-slate-50 text-5xl mb-4">Hello, I&apos;m Patryk</h1>
    </div>
  );
};

export default Home;
