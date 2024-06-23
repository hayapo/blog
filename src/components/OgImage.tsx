import satori from "satori";
import { readFileSync } from "fs";
import { Resvg } from "@resvg/resvg-js";
import ogBackground from "../assets/og_background.png";

const width = 1200;
const height = 630;
const fontFamily = "IBM Plex Sans JP";

export async function OgImage(text: string) {
  const fontData = await getSubsetFontData(text, fontFamily, 700);
  const ogBackgroundImage = readFileSync(
    import.meta.env.DEV
      ? new URL(`../assets/og_background.png`, import.meta.url)
      : `./dist/${ogBackground.src}`,
    { encoding: "base64" },
  );
  const ogBackgroundImageUrl = `data:image/png;base64,${ogBackgroundImage}`;

  const satoriSvg = await satori(
    <main
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fontFamily,
      }}
    >
      <section>
        <img
          src={ogBackgroundImageUrl}
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
          }}
        >
          <h1
            style={{
              fontSize: "55px",
              margin: "auto",
              color: "black",
              textAlign: "center",
            }}
          >
            {text}
          </h1>
        </img>
      </section>
    </main>,
    {
      width: width,
      height: height,
      fonts: [
        {
          name: fontFamily,
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
  const resvg = new Resvg(satoriSvg, {
    font: {
      loadSystemFonts: false,
    },
    fitTo: {
      mode: "width",
      value: width,
    },
  });

  return resvg.render().asPng();
}

// Font fetching
async function getSubsetFontData(
  text: string,
  font: string,
  fontWeight: number,
) {
  const GOOGLE_FONT_ENDPOINT = `https://fonts.googleapis.com/css2?family=${font}:wght@${fontWeight}&text=${encodeURIComponent(text)}`;

  const css = await fetch(GOOGLE_FONT_ENDPOINT).then((res) => res.text());

  // fontのurlを正規表現で取得する
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  )?.[1];

  if (!resource) {
    throw new Error("font url is not found");
  }

  const arrayBuffer = await fetch(resource).then((res) => res.arrayBuffer());

  return arrayBuffer;
}
