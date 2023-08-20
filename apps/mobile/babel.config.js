module.exports = function(api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@/components": "./components",
            "@/assets": "./assets",
            "@/library": "./library"
          },
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
          ]
        }
      ],
      "nativewind/babel"
    ]
  };
};
