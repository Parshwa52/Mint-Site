import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface ModalData {
  title: string;
  text: string;
}

interface UIContextInterface {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;

  modalData: ModalData;
  setModalData: Dispatch<SetStateAction<ModalData>>;

  txnHash: string;
  setTxnHash: Dispatch<SetStateAction<string>>;
}

const defaultState: UIContextInterface = {
  modalOpen: false,
  setModalOpen: () => {},

  modalData: {
    title: "",
    text: "",
  },
  setModalData: () => {},

  txnHash: "",
  setTxnHash: () => {},
};

const uiContext = createContext<UIContextInterface>(defaultState);

const UIProvider = ({ children }: { children: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: "",
    text: "",
  });
  const [txnHash, setTxnHash] = useState("");

  return (
    <uiContext.Provider
      value={{
        modalOpen,
        setModalOpen,

        modalData,
        setModalData,

        txnHash,
        setTxnHash,
      }}
    >
      {children}
    </uiContext.Provider>
  );
};

export const useUIContext = () => useContext(uiContext);
export default UIProvider;
