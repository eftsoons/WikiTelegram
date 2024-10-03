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

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

function App({ root }: { root: HTMLElement }) {
  const [miniApp] = initMiniApp();
  const themeParams = useThemeParams();
  //const launchParams = retrieveLaunchParams();
  const viewport = useViewport();
  const lp = useLaunchParams();

  //const [admin, setadmin] = useState(false);

  useEffect(() => {
    miniApp.ready();

    postEvent("web_app_expand");

    miniApp.setHeaderColor("#232323");
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

  useEffect(() => {}, []);

  useEffect(() => {
    async function CheckAdmin() {
      /* const checkadmin = (await axios.post(
        `${import.meta.env.VITE_API_URL}/admincheck`,
        {
          initData: launchParams.initDataRaw,
        }
      )) as {
        data: boolean;
      };

      setadmin(checkadmin.data);*/
    }

    CheckAdmin();
  }, []);

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <MotionConfig transition={{ duration: 0.5 }}>
        <Navigator root={root} />
      </MotionConfig>
    </AppRoot>
  );
}

export default App;
