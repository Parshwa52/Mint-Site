import { PHASE } from "@/constants";
import { gsap } from "gsap";

export function compactAddress(address: string) {
  if (address.length < 18) return address;
  return (
    address.slice(0, 5) +
    "..." +
    address.slice(address.length - 5, address.length)
  );
}

// ui.tsx paragraph animations
export async function showCustomText(paragraphId: string = "custom-p-1") {
  const target = document.getElementById(paragraphId) as HTMLParagraphElement;

  // Add a small delay while the text is set
  await new Promise((resolve, _) => setTimeout(resolve, 800));

  gsap
    .timeline()
    // hide previous text
    .set("#ui .ui-text", { display: "block" })
    .to("#text-1 > *", { autoAlpha: 0, ease: "expo" })
    .set("#text-1 > *", { display: "none" })
    // show selected text
    .set(target, {
      display: "block",
    })
    .from(target.querySelectorAll("span span"), {
      display: "none",
      duration: 0.1,
      stagger: 0.1,
      ease: "none",
    });
}

export async function hideCustomText(
  paragraphId: string = "custom-p-1"
): Promise<void> {
  return new Promise((resolve, _) => {
    const target = document.getElementById(paragraphId) as HTMLParagraphElement;
    gsap
      .timeline({
        onComplete() {
          resolve();
        },
      })
      .to(
        target.querySelectorAll("span span"),
        {
          display: "none",
          duration: 0.1,
          stagger: -0.05,
          ease: "none",
        },
        ">+=.5"
      )
      .set(
        "#ui .ui-text",
        {
          display: "none",
        },
        ">-=.25"
      );
  });
}

// export function getCurrentPhase() {
//   const currentTime = new Date().getTime() / 1000; //  Current Time in Seconds

//   for (const [key, value] of Object.entries(PHASE)) {
//     if (currentTime > value.startTime && currentTime < value.endTime)
//       return +key;
//   }

//   return null;
// }
