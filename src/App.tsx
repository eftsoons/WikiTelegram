import { useEffect, useState } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import Navigator from "./navigation";

import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initMiniApp,
  postEvent,
  retrieveLaunchParams,
  useLaunchParams,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";

import { MotionConfig } from "framer-motion";

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

function App({ root }: { root: HTMLElement }) {
  const [miniApp] = initMiniApp();
  const themeParams = useThemeParams();
  const launchParams = retrieveLaunchParams();
  const viewport = useViewport();
  const lp = useLaunchParams();

  //const cloudStorage = initCloudStorage();

  const [admin, setadmin] = useState(false);
  const [training, settraining] = useState(
    Number(localStorage.getItem("training"))
  );

  useEffect(() => {
    miniApp.ready();

    postEvent("web_app_expand");

    miniApp.setHeaderColor("#101010");
    miniApp.setBgColor("#101010");
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

  useEffect(() => {
    async function CheckAdmin() {
      const checkadmin = (await axios.post(
        `${import.meta.env.VITE_API_URL}/admincheck`,
        {
          initData: launchParams.initDataRaw,
        }
      )) as {
        data: "error" | boolean;
      };

      setadmin(checkadmin.data != "error" ? checkadmin.data : false);
    }

    CheckAdmin();
  }, []);

  /* cloudStorage.get("training").then((test) => {
    console.log(test);
  });*/

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <MotionConfig transition={{ duration: 0.25 }}>
        <Navigator
          training={training}
          settraining={settraining}
          root={root}
          admin={admin}
        />
      </MotionConfig>
    </AppRoot>
  );
}

export default App;
