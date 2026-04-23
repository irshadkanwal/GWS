import { toast } from "sonner";

export const copyTextToClipboard = async (
  textToCopy: string,
  successMessage?: string,
  errorMessage?: string
) => {
  try {
    if (window.isSecureContext && navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy);
      toast.info(successMessage);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (successful) {
        toast.info(successMessage);
      } else {
        throw new Error("Fallback copy command failed");
      }
    }
  } catch (err) {
    toast.error(errorMessage);
  }
};
