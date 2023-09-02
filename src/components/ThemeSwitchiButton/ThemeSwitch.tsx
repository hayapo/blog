import { useEffect, useState } from "preact/hooks";
import { css } from "../../../styled-system/css";
import { IconButton } from "./IconButton";

export default function ThemeSwitch() {
  // function initialThemeIsDark() {
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     return theme === "dark";
  //   } else {
  //     return window.matchMedia("(prefers-color-scheme: dark)").matches;
  //   }
  // }

  // let isDark = import.meta.env.SSR ? undefined : initialThemeIsDark();

  // function handleChange() {
  //   if (!isDark) {
  //     isDark = true;
  //     localStorage.setItem("theme", "dark");
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     isDark = false;
  //     localStorage.setItem("theme", "light");
  //     document.documentElement.classList.remove("dark");
  //   }
  // }

  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  function handleChange(buttonTheme: string) {
    const matchesDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (
      (matchesDarkTheme && buttonTheme === "dark") ||
      (!matchesDarkTheme && buttonTheme === "light")
    ) {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", buttonTheme);
    }
    setTheme(buttonTheme);
  }

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  return (
    <div
      class={css({
        display: "inline-flex",
        gap: "0.8rem",
        px: "1.0rem",
        py: "0.6rem",
        borderRadius: "999rem",
        backgroundColor: { base: "#CACACA", _dark: "#6c6c6c" },
      })}
    >
      <IconButton theme="light" handleClick={() => handleChange("light")} />
      <IconButton theme="dark" handleClick={() => handleChange("dark")} />
    </div>
  );
}
