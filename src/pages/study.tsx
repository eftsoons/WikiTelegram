import { motion } from "framer-motion";

import { Border, Button, Icon, InfoDiv } from "../components";

import { type Navigator } from "react-router-dom";
import { Cell } from "../components/";

import { type Info } from "../type";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { Wait } from ".";

const Study = ({
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
          type: "study",
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
          type: "study",
          data: data,
        });

        return data;
      }
    });
  }, []);

  //{index != datamain.content.length - 1 && <Border />}
  return infodiv ? (
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {infodiv.map((datamain, indexmain) => {
        return (
          <InfoDiv
            key={indexmain}
            index={indexmain}
            text={datamain.name}
            icon={
              datamain.info == ""
                ? datamain.icon
                  ? datamain.icon
                  : "Chain"
                : "infowindow"
            }
            setinfodiv={setinfodiv}
            infodiv={infodiv}
            type={datamain.type}
            typemain={"study"}
            editor={editor}
            info={datamain.info}
          >
            {datamain.content.map((data, index) => (
              <div key={index}>
                <Cell
                  index={index}
                  after={data.after}
                  before={data.before}
                  header={data.header}
                  text={data.text}
                  onClick={() => {
                    reactNavigator.push(
                      `/page/study/${indexmain}/${index}/0/0`
                    );
                  }}
                  typemain={"study"}
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
        <div
          style={{
            width: "90%",
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            borderRadius: "8px",
            backgroundColor: "rgba(37, 37, 37, 0.6)",
            backdropFilter: "blur(15px)",
            padding: "10px",
          }}
        >
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

export default Study;
