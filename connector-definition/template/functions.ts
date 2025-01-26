import { JSONValue } from "@hasura/ndc-lambda-sdk";
import { Resvg } from '@resvg/resvg-js'
import {typst_compile} from "./typst/functions";
import {svg2png, svg2png_buffer } from "./svg2png/functions";
// import { GMail, GoogleCalendar } from "@hasura/ndc-duckduckapi/services";
// import { getOAuthCredentialsFromHeader, getDB, transaction } from "@hasura/ndc-duckduckapi";
import {echartToFile} from "./echart/actions_echart";


type HttpStatusResponse = {
  code: number;
  description: string;
};



/** @readonly */
export function add(x: number, y: number): number {
    return x + y;
  }

/** @readonly */
export async function test(): Promise<JSONValue> {
  const result = await fetch("https://eor2fxa6oc3wv0p.m.pipedream.net/hola");
  const responseBody = (await result.json());
  if(responseBody){
    return responseBody as JSONValue;
  }else{
    return {} as JSONValue;
  }
}

/** @readonly */
export async function getPDF(url: string): Promise<JSONValue> {
  const result = await fetch(url);
  const blob = await result.blob();
  const buffer = await blob.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return { base64: base64, url: url } as unknown as JSONValue;
}

/** @readonly */
export async function typstTest(url: string ): Promise<JSONValue> {
  const result = await fetch(url);
  const svg = (await result.text());
  const pngBuffer = svg2png_buffer(svg);
  const base64 = Buffer.from(pngBuffer).toString('base64');
  return { base64: base64, svg: svg, url: url } as unknown as JSONValue;
}

interface TypstOptions {
  format: string;
  content: string;
  filename: string;
  return_type: "file" | "buffer";
}

/** @readonly */
export async function typstCompile(format: string, content: string, filename: string): Promise<JSONValue> {
  const options: TypstOptions = {
    format: format,
    content: content,
    filename: filename,
    return_type: "buffer"
  }
  const result = await typst_compile(options)
  let base64: string;
  if (result) {
    base64 = Buffer.from(result).toString('base64');
  } else {
    throw new Error("Result is null");
  }
  return { result: base64, type: options.format } as unknown as JSONValue;
}

/** @readonly */
export async function echartsToImage(): Promise<JSONValue> {
  const options = {}; // Add appropriate options here
  const base64 = echartToFile(options);
  return { base64: base64 } as unknown as JSONValue;
}


