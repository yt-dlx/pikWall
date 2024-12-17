/* eslint-disable @typescript-eslint/no-require-imports */
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: "./global.css" });
