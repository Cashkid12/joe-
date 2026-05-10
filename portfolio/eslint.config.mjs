import nextConfig from "@eslint/js";

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ...nextConfig.configs.recommended,
    ...nextConfig.configs["flat/type-checked"]
  }
];