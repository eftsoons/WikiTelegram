import { initBackButton, initNavigator } from "@telegram-apps/sdk";
import { useIntegration } from "@telegram-apps/react-router-integration";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { useMemo } from "react";

import { Study, Explore, Social, Settings, Monet, StudyPage } from "../pages";

import { MainWindow } from "../components";

export default ({ root }: { root: HTMLElement }) => {
  const navigator = useMemo(() => initNavigator("WikiTelegram"), []);
  const [backButton] = initBackButton();
  backButton.hide();

  const [location, reactNavigator] = useIntegration(navigator);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes location={location}>
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
          <Route index element={<Study reactNavigator={reactNavigator} />} />
          <Route
            path="/page/:typepage/:indexmain/:index"
            element={
              <StudyPage reactNavigator={reactNavigator} editor={true} />
            }
          />
          <Route
            path="/explore"
            element={<Explore reactNavigator={reactNavigator} />}
          />
          <Route
            path="/social"
            element={<Social reactNavigator={reactNavigator} />}
          />
          <Route
            path="/settings"
            element={<Settings reactNavigator={reactNavigator} />}
          />
          <Route
            path="/explore/monet/ton"
            element={<Monet reactNavigator={reactNavigator} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};
