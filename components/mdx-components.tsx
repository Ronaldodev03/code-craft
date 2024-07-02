import Image from "next/image";
import * as runtime from "react/jsx-runtime"; // a?
import { Callout } from "./callout";

//idk what this is doing --> se usa en MDXContent down below
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

//esto es para poder usar images y el callout en el file .mdx
const components = {
  Image,
  Callout,
};

//type
type MdxProps = {
  code: string;
};

//a?
export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
