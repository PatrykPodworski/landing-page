"use client";

import { TypeAnimation } from "react-type-animation";

const GreetingAnimation = () => {
  return (
    <h1 className="text-slate-50 text-4xl mb-4 text-center select-none min-h-[3rem]">
      <TypeAnimation
        sequence={[
          "Hello, I'm Patryk!",
          1500,
          "",
          500,
          "Cześć, jestem Patryk!",
          1500,
          "",
          500,
          "Hola, soy Patryk!",
          1500,
          "",
          500,
        ]}
        speed={{ type: "keyStrokeDelayInMs", value: 60 }}
        deletionSpeed={{ type: "keyStrokeDelayInMs", value: 40 }}
        repeat={Infinity}
        cursor={true}
      />
    </h1>
  );
};

export default GreetingAnimation;
