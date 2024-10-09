import { motion } from "framer-motion";

import { type Navigator } from "react-router-dom";
import { Banner, Border, Button, Cell, Icon, InfoDiv } from "../components";
import { Pizza } from "../svg";
import { Info } from "../type";
import { useCallback, useEffect, useState } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import axios from "axios";
import { Wait } from ".";

const Social = ({
  reactNavigator,
  editor,
}: {
  reactNavigator: Navigator;
  editor: boolean;
}) => {
  const [infodiv, setinfodiv] = useState<Info>();

  const launchParams = retrieveLaunchParams();

  useEffect(() => {
    async function fetchData() {
      const response = (await axios.post(
        `${import.meta.env.VITE_API_URL}/info`,
        {
          initData: launchParams.initDataRaw,
          type: "social",
        }
      )) as {
        data: Info;
      };

      setinfodiv(response.data);
    }

    fetchData();
  }, []);

  const handleaddblock = useCallback((type: "big" | "play" | "normal") => {
    setinfodiv((info) => {
      if (info) {
        const data = [...info];
        data.push({
          name: "???",
          type: type,
          icon: null,
          info: "",
          content: [
            {
              header: "???",
              text: "???",
              content: [],
            },
          ],
        });

        axios.post(`${import.meta.env.VITE_API_URL}/info/save`, {
          initData: launchParams.initDataRaw,
          type: "social",
          data: data,
        });

        return data;
      }
    });
  }, []);

  return infodiv ? (
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Banner description="Горячий журнал о крипто-культуре">
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Pizza />
        </div>
        <span
          style={{
            fontFamily: "Kaushan Script",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "46px",
            lineHeight: "67px",
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          PIZZA!
        </span>
        <span
          style={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "18px",
            lineHeight: "22px",
            display: "flex",
            alignItems: "center",
            height: "70px",
          }}
        >
          MAGAZINE
        </span>
      </Banner>
      {infodiv.map((datamain, indexmain) => {
        return (
          <InfoDiv
            key={indexmain}
            index={indexmain}
            text={datamain.name}
            icon={datamain.icon ? datamain.icon : "Chain"}
            setinfodiv={setinfodiv}
            infodiv={infodiv}
            type={datamain.type}
            typemain={"social"}
            editor={editor}
            info={datamain.info}
          >
            {datamain.content.map((data, index) => (
              <div key={index}>
                <Cell
                  key={index}
                  index={index}
                  after={data.after}
                  before={data.before}
                  header={data.header}
                  text={data.text}
                  onClick={() => {
                    reactNavigator.push(
                      `/page/social/${indexmain}/${index}/0/0`
                    );
                  }}
                  typemain={"social"}
                  editor={editor}
                />
                {index != datamain.content.length - 1 &&
                  !(datamain.type == "play") && <Border />}
              </div>
            ))}
          </InfoDiv>
        );
      })}
      {editor && (
        <div className="addblock">
          <Button onClick={() => handleaddblock("play")}>
            {Icon("Sapp", "1.5")}
          </Button>
          <Button onClick={() => handleaddblock("normal")}>
            {Icon("Mapp", "1.5")}
          </Button>
          <Button onClick={() => handleaddblock("big")}>
            {Icon("Lapp", "1.5")}
          </Button>
        </div>
      )}
    </motion.div>
  ) : (
    <Wait />
  );
};

export default Social;
