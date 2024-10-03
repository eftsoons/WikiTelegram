import { motion } from "framer-motion";

import { type Navigator } from "react-router-dom";
import { Info } from "../type";
import { Button, Cell, Icon, InfoDiv } from "../components";
import { useState } from "react";
/*import { Border, Cell, InfoDiv } from "../components";
import { Chain } from "../svg";

import { Xp } from "../assets/img";
import { Explore } from "../svg";*/

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  const [infodiv, setinfodiv] = useState<Info>([
    { type: "normal", name: "test", content: [], icon: null },
  ]);

  return (
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
      >
        {infodiv[0].content.map((data, index) => (
          <Cell
            key={index}
            after={data.after}
            before={data.before}
            header={data.header}
            text={data.text}
            onClick={() => {
              reactNavigator.push(`/monet/${index}`);
            }}
            typemain={"explore"}
          />
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
            >
              {datamain.content.map((data, index) => (
                <Cell
                  key={index}
                  after={data.after}
                  before={data.before}
                  header={data.header}
                  text={data.text}
                  onClick={() => {
                    reactNavigator.push(`/monet/${indexmain}/${index}`);
                  }}
                  typemain={"explore"}
                />
              ))}
            </InfoDiv>
          )
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
  );
};
