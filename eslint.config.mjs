import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Apaga errores por variables no usadas
      "@typescript-eslint/no-unused-vars": "off",

      // Apaga errores por uso de 'any'
      "@typescript-eslint/no-explicit-any": "off",

      // Apaga advertencias de <img> (Next sugiere usar <Image />)
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;

