import type { AppProps } from "next/app";
import "@/styles/globals.sass";
import { useCallback, useEffect } from "react";

// Gsap register plugins
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

//RainbowKit intitialisation
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

//RainbowKit customisation
import { chains, customTheme, wagmiClient } from "@/utils/rainbowkitconfig";
import GlobalProvider from "@/provider/globalProvider";
import UIProvider from "@/provider/uiProvider";
import { AudioManager } from "@/components/audioManager";

gsap.registerPlugin(Flip); // remove if not needed
gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }: AppProps) {
  const resetWindowScrollPosition = useCallback(
    () => window.scrollTo(0, 0),
    []
  );

  useEffect(() => {
    window.onbeforeunload = function () {
      resetWindowScrollPosition();
    };
  }, [resetWindowScrollPosition]);

  return (
    <GlobalProvider>
      <UIProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={customTheme}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </UIProvider>
    </GlobalProvider>
  );
}
