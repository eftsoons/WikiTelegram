import { useEffect } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import Navigator from "./navigation";

import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initMiniApp,
  postEvent,
  useLaunchParams,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";

import { MotionConfig } from "framer-motion";

function App() {
  const [miniApp] = initMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const lp = useLaunchParams();

  useEffect(() => {
    miniApp.ready();

    postEvent("web_app_expand");

    miniApp.setHeaderColor("bg_color");
  }, []);

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <MotionConfig transition={{ duration: 0.5 }}>
        <Navigator />
      </MotionConfig>
    </AppRoot>
  );
}

export default App;
