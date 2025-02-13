module.exports = function (api) {
<<<<<<< HEAD
  api.cache(true);

  return {
    presets: ["module:metro-react-native-babel-preset", "babel-preset-expo"],
    plugins: [["module:react-native-dotenv"]],
=======
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "react-native-dotenv",
          verbose: false,
        },
      ],
    ],
>>>>>>> main_current
  };
};
