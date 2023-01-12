module.exports = {
  root: true,
  env: {
      node: true
  },
  extends: ["@nuxtjs", "prettier"],
  rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
      parser: "babel-eslint",
      rules: {
          "indent": [4, "tab"]
      }
  }
};
