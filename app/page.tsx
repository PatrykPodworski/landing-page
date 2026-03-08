import { LogoAnimated } from "@/components/Logo/LogoAnimated";
import ChatbotInput from "@/components/ChatbotInput";

// TODO: Update packages
// TODO: Fix Speed Insights

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
};

const Home = () => {
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <LogoAnimated />
      <h1 className="text-4xl text-center select-none">
        <span className="text-amber-200/80">❊</span>{" "}
        <span className="text-zinc-200 font-serif italic">
          {getGreeting()}, Patryk
        </span>
      </h1>
      <ChatbotInput />
    </div>
  );
};

export default Home;
