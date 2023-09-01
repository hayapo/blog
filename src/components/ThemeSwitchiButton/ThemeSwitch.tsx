import { useEffect, useState } from "preact/hooks";
import { css } from "../../../styled-system/css";
import { IconButton } from "./IconButton";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  function handleChange(currentTheme: string) {
    const matchesDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (
      (matchesDarkTheme && currentTheme === "dark") ||
      (!matchesDarkTheme && currentTheme === "light")
    ) {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", currentTheme);
    }

    setTheme(currentTheme);
  }

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.remove("light");
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
      <IconButton theme="light" handleClick={handleChange} />
      <IconButton theme="dark" handleClick={handleChange} />
    </div>
  );
}
