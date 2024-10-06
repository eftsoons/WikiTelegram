import { initBackButton, initNavigator } from "@telegram-apps/sdk";
import { useIntegration } from "@telegram-apps/react-router-integration";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { useEffect, useMemo } from "react";

import {
  Study,
  Explore,
  Social,
  Settings,
  Monet,
  StudyPage,
  StudyViem,
  XploreViem,
  SocialViem,
  HelloViem,
} from "../pages";

import { MainWindow, Next } from "../components";

const nextmenu = ["/", "/studyviem", "/xploreviem", "/socialviem", "/"];

export default ({
  root,
  admin,
  training,
  settraining,
}: {
  root: HTMLElement;
  admin: boolean;
  training: number;
  settraining: Function;
}) => {
  const navigator = useMemo(() => initNavigator("WikiTelegram"), []);
  const [backButton] = initBackButton();
  backButton.hide();

  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    reactNavigator.push(nextmenu[training]);

    if (training == 2) {
      document.body.className = "center";
      root.className = "center";
    } else if (training == 3) {
      document.body.className = "right";
      root.className = "left";
    }
  }, [reactNavigator, nextmenu, training]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes location={location}>
        {training >= 4 ? (
          <Route
            path="/"
            element={
              <MainWindow
                selected={location.pathname}
                reactNavigator={reactNavigator}
                root={root}
              />
            }
          >
            <Route
              index
              element={<Study reactNavigator={reactNavigator} editor={admin} />}
            />
            <Route
              path="/page/:typepage/:indexmain/:index/:buttonid/:idmonet"
              element={
                <StudyPage reactNavigator={reactNavigator} editor={admin} />
              }
            />
            <Route
              path="/explore"
              element={
                <Explore reactNavigator={reactNavigator} editor={admin} />
              }
            />
            <Route
              path="/social"
              element={
                <Social reactNavigator={reactNavigator} editor={admin} />
              }
            />
            <Route
              path="/settings"
              element={<Settings reactNavigator={reactNavigator} />}
            />
            <Route
              path="/explore/monet/:index"
              element={<Monet reactNavigator={reactNavigator} editor={admin} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <Route
            path="/"
            element={<Next training={training} settraining={settraining} />}
          >
            <Route index element={<HelloViem />} />
            <Route path="/studyviem" element={<StudyViem />} />
            <Route path="/xploreviem" element={<XploreViem />} />
            <Route path="/socialviem" element={<SocialViem />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};
