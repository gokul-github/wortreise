import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.wortreise.learn",
  appName: "Wortreise",
  webDir: "dist/android",
  android: {
    allowMixedContent: false,
  },
  server: {
    androidScheme: "https",
  },
  plugins: {
    SystemBars: {
      insetsHandling: "css",
      style: "LIGHT",
      initialViewportFitValueHint: "cover",
    },
  },
};

export default config;
