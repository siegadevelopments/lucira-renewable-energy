import fs from "fs";
import path from "path";
import pngToIco from "png-to-ico";
import Jimp from "jimp";

const input = "./public/logo.png";
const output = "./public/favicon.ico";
const tmp = path.resolve("./.tmp_favicon_256.png");

async function run() {
  if (!fs.existsSync(input)) {
    console.error(
      `Input not found: ${input}.\nPlace your logo image at ${input} (PNG with transparent background recommended).`,
    );
    process.exit(2);
  }

  try {
    // Load and resize to 256x256 (png-to-ico expects a 256px image)
    const img = await Jimp.read(input);
    img.contain(
      256,
      256,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
    );
    await img.writeAsync(tmp);

    const buf = await pngToIco(tmp);
    fs.writeFileSync(output, buf);
    fs.unlinkSync(tmp);
    console.log(`Wrote ${output}`);
  } catch (err) {
    console.error("Failed to generate favicon.ico:", err);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    process.exit(1);
  }
}

run();
