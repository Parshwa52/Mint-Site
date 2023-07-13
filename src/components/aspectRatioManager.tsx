import { useEffect, useState } from "react";
import Image from "next/image";

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
        <img
          src="https://res.cloudinary.com/dyplx2t1x/image/upload/v1689200558/q2_reveal_reveal-modified_utgn9q.png"
          alt="Switch to desktop icon"
          className="aspect-icon"
        />
        <p className="aspect-text heading-font">
          Q2 wants you to shift to Desktop for a good experience!
        </p>
      </div>
    );
  else return <></>;
};
