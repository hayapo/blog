import { useEffect } from "preact/hooks";
import { MOBILE_DEVICES } from "../consts";

export function isMobileDevice() {
  return MOBILE_DEVICES.some((device) =>
    new RegExp(device, "i").test(navigator.userAgent)
  );
}

export function useMobile(callback: () => void) {
  useEffect(() => {
    const checkMobile = () => {
      callback();
    };
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [callback]);
}
