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
}

const defaultState: UIContextInterface = {
  modalOpen: false,
  setModalOpen: () => {},

  modalData: {
    title: "",
    text: "",
  },
  setModalData: () => {},
};

const uiContext = createContext<UIContextInterface>(defaultState);

const UIProvider = ({ children }: { children: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: "",
    text: "",
  });

  return (
    <uiContext.Provider
      value={{
        modalOpen,
        setModalOpen,

        modalData,
        setModalData,
      }}
    >
      {children}
    </uiContext.Provider>
  );
};

export const useUIContext = () => useContext(uiContext);
export default UIProvider;
