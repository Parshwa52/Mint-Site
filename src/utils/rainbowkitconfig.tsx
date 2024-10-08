import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, lightTheme, Theme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, mainnet } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

export const { chains, provider } = configureChains(
  [polygon, mainnet],
  [alchemyProvider({ apiKey: "I3K5UoJriahPrauT3HRuT7FDdHdyE_Um" })]
);

export const { connectors } = getDefaultWallets({
  appName: "Mint-Site",
  projectId: "6ab6cf6581716e2d41493bbc9854436b",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const customTheme: Theme = {
  ...lightTheme({
    accentColor: "#fff",
    accentColorForeground: "black",
    borderRadius: "medium",
    overlayBlur: "small",
    fontStack: "system",
  }),
  //   colors: {
  //       connectButtonText: "#FFFFFF",
  //       accentColor: "",
  //       accentColorForeground: "",
  //       actionButtonBorder: "",
  //       actionButtonBorderMobile: "",
  //       actionButtonSecondaryBackground: "",
  //       closeButton: "",
  //       closeButtonBackground: "",
  //       connectButtonBackground: "",
  //       connectButtonBackgroundError: "",
  //       connectButtonInnerBackground: "",
  //       connectButtonTextError: "",
  //       connectionIndicator: "",
  //       downloadBottomCardBackground: "",
  //       downloadTopCardBackground: "",
  //       error: "",
  //       generalBorder: "",
  //       generalBorderDim: "",
  //       menuItemBackground: "",
  //       modalBackdrop: "",
  //       modalBackground: "",
  //       modalBorder: "",
  //       modalText: "",
  //       modalTextDim: "",
  //       modalTextSecondary: "",
  //       profileAction: "",
  //       profileActionHover: "",
  //       profileForeground: "",
  //       selectedOptionBorder: "",
  //       standby: ""
  //   },
  fonts: {
    body: "'Courier New', sans-serif",
  },
};
