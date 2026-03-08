import { LogoAnimated } from "@/components/Logo/LogoAnimated";
import ChatbotInput from "@/components/ChatbotInput";

// TODO: Update packages
// TODO: Fix Speed Insights

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const Home = () => {
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <LogoAnimated />
      <h1 className="text-zinc-200 text-4xl text-center select-none font-serif italic">
        {getGreeting()}, I&apos;m Patryk
      </h1>
      <ChatbotInput />
    </div>
  );
};

export default Home;
