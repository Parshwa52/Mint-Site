import { ThreeJSBackground } from "@/components/threeJSBackground";
import { PageLayout } from "@/layout/pageLayout";
import { HomepageCity } from "@/sections/city";
import { UI } from "@/components/scene1/ui";
// custom components
import { HomepageHero } from "@/sections/hero";
import { AudioManager } from "@/components/audioManager";
import Modal from "@/components/ui/Modal";

export default function Home() {
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
      <Modal />
      {/* <Mouse /> */}
      {/* <SoundButton /> */}
    </PageLayout>
  );
}
