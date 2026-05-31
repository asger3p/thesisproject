import { useEffect } from "react";
import toast from "react-hot-toast";

export function useBlockBrowserBack(
  message = "Going back is not allowed here",
) {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      toast(message);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
}
