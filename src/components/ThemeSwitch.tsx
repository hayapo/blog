import { useEffect, useState } from "preact/hooks";
import { css } from "../../styled-system/css";
import { set } from "astro/zod";

const themes = ["light", "dark"] as const;

const icons = {
  light: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
        <path
          fill="currentColor"
          d="M12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-12.728 0a1 1 0 0 1 1.497 1.32l-.083.094l-.707.707a1 1 0 0 1-1.497-1.32l.083-.094l.707-.707ZM12 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12Zm-8 5a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11h1Zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM4.929 4.929a1 1 0 0 1 1.32-.083l.094.083l.707.707a1 1 0 0 1-1.32 1.497l-.094-.083l-.707-.707a1 1 0 0 1 0-1.414Zm14.142 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z"
        />
      </g>
    </svg>
  ),
  dark: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="none" fill-rule="evenodd">
        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
        <path
          fill="currentColor"
          d="M13.574 3.138a1.01 1.01 0 0 0-1.097 1.408a6 6 0 0 1-7.931 7.931a1.01 1.01 0 0 0-1.409 1.097A9 9 0 0 0 21 12a9.001 9.001 0 0 0-7.426-8.862Z"
        />
      </g>
    </svg>
  ),
};

const ICON_SIZE = "1.3rem";

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
        gap: "1.0rem",
        px: "1.0rem",
        py: "0.7rem",
        borderRadius: "999rem",
        backgroundColor: { base: "#CACACA", _dark: "#6c6c6c" },
      })}
    >
      {themes.map((t) => {
        const icon = icons[t];
        const checked = t === theme;
        const themelabel = t === "light" ? "Light" : "Dark";
        const toggleColor = t === theme ? "#FF7A00" : "#FFF";
        return (
          <label
            key={themelabel}
            title={themelabel}
            className={checked ? "checked" : ""}
          >
            <div
              class={css({
                color: toggleColor,
                w: ICON_SIZE,
                h: ICON_SIZE,
              })}
            >
              {icon}
            </div>
            <input
              class={css({ display: "none" })}
              type="radio"
              name="theme-toggle"
              value={t}
              checked={checked}
              aria-label={`Switch to ${themelabel} mode`}
              onChange={() => handleChange(t)}
            />
          </label>
        );
      })}
    </div>
  );
}
