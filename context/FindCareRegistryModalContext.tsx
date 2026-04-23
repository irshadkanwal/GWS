import React from "react";
import { useDialog } from "@/hooks/useDialog";

const FindCareRegistryModalContext = React.createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const FindCareRegistryModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    open: isOpen,
    openDialog: openModal,
    closeDialog: closeModal,
  } = useDialog(false);

  return (
    <FindCareRegistryModalContext.Provider
      value={{ isOpen, openModal, closeModal }}
    >
      {children}
    </FindCareRegistryModalContext.Provider>
  );
};

export const useFindCareRegistryModal = () =>
  React.useContext(FindCareRegistryModalContext);
