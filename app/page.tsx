import { LogoAnimated } from "@/components/Logo/LogoAnimated";
import ChatbotInput from "@/components/ChatbotInput";
import HomeClient from "./HomeClient";

// TODO: Update packages
// TODO: Fix Speed Insights

const Home = () => {
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <LogoAnimated />
      <HomeClient />
      <ChatbotInput />
    </div>
  );
};

export default Home;
