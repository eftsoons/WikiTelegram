import { motion } from "framer-motion";

import { type Navigator } from "react-router-dom";
import { Banner, Button, Cell, Icon, InfoDiv } from "../components";
import { Pizza } from "../svg";
import { Info } from "../type";
import { useState } from "react";

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  const [infodiv, setinfodiv] = useState<Info>([]);

  return (
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
          >
            {datamain.content.map((data, index) => (
              <Cell
                key={index}
                after={data.after}
                before={data.before}
                header={data.header}
                text={data.text}
                onClick={() => {
                  reactNavigator.push(`/page/${indexmain}/${index}`);
                }}
                typemain={"social"}
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
  );
};
