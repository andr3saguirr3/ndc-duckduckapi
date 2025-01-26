import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
// import { $typst } from 'npm:@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';
// import { $typst } from 'npm:@@myriaddreamin/typst.node';
import { svg2png, svg2png_buffer } from "./svg2png";
import _ from "lodash";
import { Buffer } from "node:buffer";
import { writeFileSync } from 'fs';

interface TypstOptions {
    format: "svg" | "png" | "pdf";
    content: string;
    filename: string;
    return_type: "file" | "buffer";
}

const typst_compile = async function (options: object | TypstOptions) {
    // const imageData: string = _.get(options, "images[0]"); // todo CHECKS
    // const jsonData: string = _.get(options, "json"); // todo CHECKS >> as JSON.stringify....
    const format: string = _.get(options, "format", "").toLocaleLowerCase();
    const content: string = _.get(options, "content", ""); // todo nunjucks templating

    console.log(`typst_compile:`);
    console.log(options);
    const compiler = NodeCompiler.create({ //todo test fonts
        fontArgs: [
          { fontPaths: ['assets/fonts'] },
        ]
    });
    let result;
    const filename = (options as TypstOptions).filename;  // todo check if format is not provided then use options.filename
    if (options) {
        if (format == "pdf") {
            result = await compiler.pdf({
                mainFileContent: content,
                // mainContent: content,
            });
        } else {
            result = await compiler.svg({
                mainFileContent: content,
                // mainContent: content,
            });
            /* png version */
            if (format == "png") {
                result = svg2png_buffer(result);
            }
        }
        switch ((options as TypstOptions).return_type) {
            case "file":
                writeFileSync(filename, result);
                return filename;
            case "buffer":
                return Buffer.from(result);
        } 

    } else {
        return null;
    }
};

export { typst_compile };
