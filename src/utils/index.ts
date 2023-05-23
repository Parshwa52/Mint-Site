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
export function showCustomText(paragraphId: string = "custom-p-1") {
  const target = document.getElementById(paragraphId) as HTMLParagraphElement;

  console.log("Got target", target);
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

export function hideCustomText(paragraphId: string = "custom-p-1") {
  const target = document.getElementById(paragraphId) as HTMLParagraphElement;
  gsap
    .timeline()
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
}
