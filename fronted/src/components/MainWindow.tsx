import { Outlet } from "react-router-dom";
import { useLaunchParams } from "@telegram-apps/sdk-react";

import { type Navigator } from "react-router-dom";

import Header from "./Header";
import { motion } from "framer-motion";

export default ({
  selected,
  reactNavigator,
}: {
  selected: string;
  reactNavigator: Navigator;
}) => {
  const lp = useLaunchParams();

  return (
    <div>
      <Header selected={selected} reactNavigator={reactNavigator} />
      <Outlet />
      <div
        className="tabbar"
        style={{
          paddingBottom: ["macos", "ios"].includes(lp.platform) ? "1rem" : "0",
        }}
      >
        {(selected == "/" ||
          selected.split("/")[1] == "explore" ||
          selected == "/social") && (
          <motion.div
            initial={{
              left:
                selected == "/"
                  ? "16%"
                  : selected.split("/")[1] == "explore"
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
              backgroundColor: "#161616",
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
            document.body.style.backgroundPositionX = "0%";
          }}
        >
          STUDY
        </div>
        <div
          className={`tabbar-element ${
            selected.split("/")[1] == "explore" ? "active" : ""
          }`}
          onClick={() => {
            reactNavigator.push("/explore");
            document.body.style.backgroundPositionX = "50%";
          }}
        >
          EXPLORE
        </div>
        <div
          className={`tabbar-element ${selected == "/social" ? "active" : ""}`}
          onClick={() => {
            reactNavigator.push("/social");
            document.body.style.backgroundPositionX = "100%";
          }}
        >
          SOCIAL
        </div>
      </div>
    </div>
  );
};
