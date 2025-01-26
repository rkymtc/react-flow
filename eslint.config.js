export default [
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      languageOptions: {
        parser: "@typescript-eslint/parser",
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        react: require("eslint-plugin-react"),
      },
      extends: ["eslint:recommended", "plugin:react/recommended"],
      rules: {
        "react/react-in-jsx-scope": "off", // React 17+ için gerekli
        "no-unused-vars": "warn",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
  ];
  