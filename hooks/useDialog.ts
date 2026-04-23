import React from "react";

export function useDialog(isOpen = false) {
  const [open, setopen] = React.useState(isOpen);

  const openDialog = () => {
    setopen(true);
  };

  const closeDialog = () => {
    setopen(false);
  };
  return { open, openDialog, closeDialog };
}
