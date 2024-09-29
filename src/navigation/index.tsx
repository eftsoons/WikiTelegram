import { initBackButton, initNavigator } from "@telegram-apps/sdk";
import { useIntegration } from "@telegram-apps/react-router-integration";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { useMemo } from "react";

import { Study, Explore, Social, Settings, Monet, StudyPage } from "../pages";

import { MainWindow } from "../components";

import { Nitro } from "../assets/img";
import { useState } from "react";
import { Chain } from "../svg";
import { Info } from "../type";

export default ({ root }: { root: HTMLElement }) => {
  const navigator = useMemo(() => initNavigator("WikiTelegram"), []);
  const [backButton] = initBackButton();
  backButton.hide();

  const [location, reactNavigator] = useIntegration(navigator);

  const [infodiv, setinfodiv] = useState<Info>([
    {
      name: "Курс. Блокчейн основы",
      icon: <Chain />,
      type: "normal",
      content: [
        {
          before: Nitro,
          header: "Что такое блокчейн",
          text: "Что из себя представляет блокчейн и для чего он нужен",
          content: [
            {
              type: "normal",
              text: "прарапрпрарапрпрарапрпрарапрпрарапрпрарапрпрарапрпрарапр",
              title:
                "Доказательства работыДоказательства работыДоказательства работы",
            },
            {
              type: "i",
              text: "прарапрпрарапрпрарапрпрарапрпрарапрпрарапрпрарапрпрарапр",
              title:
                "Доказательства работыДоказательства работыДоказательства работы",
            },
            {
              type: "citate",
              text: "прарапрпрарапрпрарапрпрарапрпрарапрпрарапрпрарапрпрарапр",
            },
          ],
        },
        {
          before: Nitro,
          header: "Что такое блокчейн",
          text: "Что из себя представляет блокчейн и для чего он нужен",
          content: [{ type: "i", text: "asd" }],
        },
      ],
    },
  ]);

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
          <Route
            index
            element={
              <Study
                infodiv={infodiv}
                setinfodiv={setinfodiv}
                reactNavigator={reactNavigator}
              />
            }
          />
          <Route
            path="/page/:type/:indexmain/:index"
            element={
              <StudyPage infodiv={infodiv} reactNavigator={reactNavigator} />
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
