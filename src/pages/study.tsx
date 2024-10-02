import { motion } from "framer-motion";

import { Button, Icon, InfoDiv } from "../components";

import { type Navigator } from "react-router-dom";
import { Cell } from "../components/";

import { type Info } from "../type";
import { useEffect, useState } from "react";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  const [infodiv, setinfodiv] = useState<Info>([]);

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
            icon={datamain.icon ? datamain.icon : "Chain"}
            setinfodiv={setinfodiv}
            infodiv={infodiv}
            type={datamain.type}
            typemain={"study"}
          >
            {datamain.content.map((data, index) => (
              <Cell
                key={index}
                after={data.after}
                before={data.before}
                header={data.header}
                text={data.text}
                onClick={() => {
                  reactNavigator.push(`/page/study/${indexmain}/${index}`);
                }}
                typemain={"study"}
              />
            ))}
          </InfoDiv>
        );
      })}
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
        <Button
          onClick={() => {
            setinfodiv((info: Info) => {
              const data = [...info];
              data.push({
                name: "???",
                type: "play",
                icon: null,
                content: [
                  {
                    after: "TOP",
                    header: "???",
                    text: "???",
                    content: [],
                  },
                ],
              });

              return data;
            });
          }}
        >
          {Icon("Sapp")}
        </Button>
        <Button
          onClick={() => {
            setinfodiv((info: Info) => {
              const data = [...info];
              data.push({
                name: "???",
                type: "normal",
                icon: null,
                content: [
                  {
                    after: "TOP",
                    header: "???",
                    text: "???",
                    content: [],
                  },
                ],
              });

              return data;
            });
          }}
        >
          {Icon("Mapp")}
        </Button>
        <Button
          onClick={() => {
            setinfodiv((info: Info) => {
              const data = [...info];
              data.push({
                name: "???",
                type: "big",
                icon: null,
                content: [
                  {
                    after: "TOP",
                    header: "???",
                    text: "???",
                    content: [],
                  },
                ],
              });

              return data;
            });
          }}
        >
          {Icon("Lapp")}
        </Button>
      </div>
    </motion.div>
  ) : (
    "Ошибка"
  );
};
