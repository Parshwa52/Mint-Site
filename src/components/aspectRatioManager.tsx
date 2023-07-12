import { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/assets/monitor.png";

export const AspectRatioManager = () => {
  const [screenEnabled, setScreenStatus] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Allow on iPad
      const isMobile =
        /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
        /Android/i.test(navigator.userAgent) ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      console.log({ isMobile });
      if (window.innerHeight > window.innerWidth || isMobile)
        setScreenStatus(true);
      else setScreenStatus(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (screenEnabled)
    return (
      <div id="aspect-ratio-screen">
        <Image
          src={icon}
          alt="rotate your device icon"
          className="aspect-icon"
        />
        <p className="aspect-text heading-font">
          Q2 wants you to shift to Desktop for a good experience!
        </p>
      </div>
    );
  else return <></>;
};
