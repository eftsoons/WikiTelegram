import { motion } from "framer-motion";

import { type Navigator } from "react-router-dom";
import { Info } from "../type";
import { Border, Button, Cell, Icon, InfoDiv } from "../components";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { Wait } from ".";

const Explore = ({
  reactNavigator,
  editor,
}: {
  reactNavigator: Navigator;
  editor: boolean;
}) => {
  const [infodiv, setinfodiv] = useState<Info>([
    { type: "normal", name: "???", content: [], info: "", icon: null },
  ]);

  const launchParams = retrieveLaunchParams();

  useEffect(() => {
    async function fetchData() {
      const response = (await axios.post(
        `${import.meta.env.VITE_API_URL}/info`,
        {
          initData: launchParams.initDataRaw,
          type: "explore",
        }
      )) as {
        data: Info;
      };

      if (response.data.length > 0) {
        setinfodiv(response.data);
      }
    }

    fetchData();
  }, []);

  const handleaddblock = useCallback((type: "big" | "play" | "normal") => {
    setinfodiv((info) => {
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
        type: "explore",
        data: data,
      });

      return data;
    });
  }, []);

  return infodiv ? (
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <InfoDiv
        index={0}
        text={infodiv[0].name}
        icon={infodiv[0].icon ? infodiv[0].icon : "Chain"}
        setinfodiv={setinfodiv}
        infodiv={infodiv}
        type={infodiv[0].type}
        typemain={"explore"}
        nodeleted={true}
        editor={editor}
        info={infodiv[0].info}
      >
        {infodiv[0].content.map((data, index) => (
          <div key={index}>
            <Cell
              key={index}
              index={index}
              after={data.after}
              before={data.before}
              header={data.header}
              text={data.text}
              onClick={() => {
                reactNavigator.push(`/explore/monet/${index}`);
                axios
                  .post(`${import.meta.env.VITE_API_URL}/monet`, {
                    initData: launchParams.initDataRaw,
                    index: index,
                  })
                  .then((response) => {
                    if (response.data == "") {
                      axios.post(`${import.meta.env.VITE_API_URL}/monet/save`, {
                        initData: launchParams.initDataRaw,
                        data: {
                          website: "https://google.com",
                          img: null,
                          button: [],
                        },
                        index: index,
                      });
                    }
                  });
              }}
              typemain={"explore"}
              editor={editor}
            />
            {index != infodiv[0].content.length - 1 && <Border />}
          </div>
        ))}
      </InfoDiv>
      {infodiv.map((datamain, indexmain) => {
        return (
          indexmain != 0 && (
            <InfoDiv
              key={indexmain}
              index={indexmain}
              text={datamain.name}
              icon={datamain.icon ? datamain.icon : "Chain"}
              setinfodiv={setinfodiv}
              infodiv={infodiv}
              type={datamain.type}
              typemain={"explore"}
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
                        `/page/explore/${indexmain}/${index}/0/0`
                      );
                    }}
                    typemain={"explore"}
                    editor={editor}
                  />
                  {index != datamain.content.length - 1 &&
                    !(datamain.type == "play") && <Border />}
                </div>
              ))}
            </InfoDiv>
          )
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

export default Explore;
