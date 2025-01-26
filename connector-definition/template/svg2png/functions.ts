import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'fs';

const svg2png_buffer = function (svg: string): Buffer {
    // initWasm();
    const opts = {
        fitTo: {
            mode: 'width' as const,
            value: 1200,
        },
    };
    const resvg = new Resvg(svg, opts);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    // console.info('Original SVG Size:', `${resvg.width} x ${resvg.height}`)
    // console.info('Output PNG Size  :', `${pngData.width} x ${pngData.height}`)
    return pngBuffer;
}

const svg2png = function (svg: string, filename: string): void {
    // initWasm();
    const pngBuffer = svg2png_buffer(svg);
    writeFileSync(filename, pngBuffer);
    // const pngBuffer = await ky.get("https://sfo3.digitaloceanspaces.com/dgt/botchat_01j1ryskf8errs7a34g299xb51/thumbnails/6690b66aF0.png").arrayBuffer();
    // return new File([pngBuffer],filename)
};

export { svg2png, svg2png_buffer };