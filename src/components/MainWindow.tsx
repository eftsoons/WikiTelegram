import { Outlet } from "react-router-dom";
import { useLaunchParams } from "@telegram-apps/sdk-react";

import { type Navigator } from "react-router-dom";

import Header from "./Header";
import { motion } from "framer-motion";

const MainWindow = ({
  selected,
  reactNavigator,
  root,
}: {
  selected: string;
  reactNavigator: Navigator;
  root: HTMLElement;
}) => {
  const lp = useLaunchParams();

  return (
    <div>
      {/*<Header selected={selected} reactNavigator={reactNavigator} />*/}
      <Outlet />
      <div
        className="tabbar"
        style={{
          paddingBottom: ["macos", "ios"].includes(lp.platform) ? "1rem" : "0",
        }}
      >
        {(selected == "/" ||
          selected == "/explore" ||
          selected == "/social") && (
          <motion.div
            initial={{
              left:
                selected == "/"
                  ? "16%"
                  : selected == "/explore"
                  ? "49.5%"
                  : "83.5%",
            }}
            animate={{
              left:
                selected == "/"
                  ? "16%"
                  : selected == "/social"
                  ? "83.5%"
                  : "49.5%",
            }}
            transition={{ duration: 0.25 }}
            style={{
              borderRadius: "18px",
              backgroundColor: "rgba(247, 94, 37, 0.1)",
              height: "32px",
              width: "85px",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0)",
              zIndex: -1,
            }}
          />
        )}
        <div
          className={`tabbar-element ${selected == "/" ? "active" : ""}`}
          onClick={() => {
            reactNavigator.push("/");

            document.body.className = "left";
            document.body.style.backgroundPositionX = "0%";
            root.className = "right";
          }}
        >
          STUDY
        </div>
        <div
          className={`tabbar-element ${selected == "/explore" ? "active" : ""}`}
          onClick={() => {
            reactNavigator.push("/explore");
            document.body.className = "center";
            root.className = "center";
          }}
        >
          XPLORE
        </div>
        <div
          className={`tabbar-element ${selected == "/social" ? "active" : ""}`}
          onClick={() => {
            reactNavigator.push("/social");

            document.body.className = "right";
            root.className = "left";
          }}
        >
          SOCIAL
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
