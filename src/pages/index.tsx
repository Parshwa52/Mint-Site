import { ThreeJSBackground } from "@/components/threeJSBackground";
import { PageLayout } from "@/layout/pageLayout";
import { HomepageCity } from "@/sections/city";
import { UI } from "@/components/scene1/ui";
// custom components
import { HomepageHero } from "@/sections/hero";
import { AudioManager } from "@/components/audioManager";
import { useUIContext } from "@/provider/uiProvider";
import MintModal from "@/components/ui/MintModal";

export default function Home() {
  const { setModalOpen } = useUIContext();

  return (
    <PageLayout
      pageTitle="Pluto Mint Website"
      pageDesc="Pluto Misfits Minting by Plutoverse"
    >
      <ThreeJSBackground />
      <HomepageHero />
      <HomepageCity />
      <UI />
      <AudioManager />
      {/* <Mouse /> */}
      {/* <SoundButton /> */}

      <MintModal />

      {/* Testing */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed top-5 right-0 z-50"
      >
        Open Mint Modal
      </button>
    </PageLayout>
  );
}
