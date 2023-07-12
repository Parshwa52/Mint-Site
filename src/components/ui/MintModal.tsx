import { useUIContext } from "@/provider/uiProvider";
import { mint } from "@/utils/mint";
import { Dialog, Transition } from "@headlessui/react";
import { Signer } from "ethers";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useChainId, useSigner } from "wagmi";
import gsap from "gsap";

type Props = {};

export default function MintModal({}: Props) {
  const { modalOpen, setModalOpen, modalData, setModalData, waitFunc } =
    useUIContext();

  const router = useRouter();
  const signer = useSigner();
  const chainId = useChainId();

  const [loading, setLoading] = useState(false);

  async function mintAndClose() {
    setLoading(true);
    const result = await mint(
      signer.data as Signer,
      chainId,
      modalData.tokensToMint
    );
    setLoading(true);
    waitFunc.current = result.wait;
    
    // Transition to loading screen now
    setTimeout(() => {
      setModalOpen(false);
      gsap.to("body", {
        autoAlpha: 0,
        duration: 1.25,
        delay: 5,
        onComplete: () => {
          router.push("/mint");
        },
      });
    }, 1000);

    // setModalData({
    //   tokensToMint: 0,
    // });
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="cursor-default w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 relative"
                  >
                    <div className="flex justify-between ">
                      <p>Mint</p>
                      <p
                        onClick={() => setModalOpen(false)}
                        className="absolute top-0 right-0 cursor-pointer"
                      >
                        &#x2715;
                      </p>
                    </div>
                  </Dialog.Title>
                  <div className="mt-1">
                    <p className="text-sm text-gray-400">
                      Choose how many tokens to mint
                    </p>
                  </div>

                  <div className="mt-4">
                    <input
                      type="number"
                      placeholder="No. of tokens"
                      min={0}
                      max={modalData.max || 10000}
                      onChange={(e) =>
                        setModalData({
                          ...modalData,
                          tokensToMint: +e.target.value,
                        })
                      }
                      className="w-3/4 bg-neutral-700 px-3 py-1.5 rounded text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                    />
                    <br />
                    <button
                      type="button"
                      className="mt-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-blue-50 text-blue-500"
                      onClick={mintAndClose}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Let's go!"}
                    </button>
                    {/* {modalData.max} |
                    {modalData.tokensToMint} */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
