import { motion } from "framer-motion";

import { Button, InfoDiv } from "../components";

import { type Navigator } from "react-router-dom";
import { Chain } from "../svg";
import { Cell } from "../components/";

import { type Info } from "../type";

export default ({
  reactNavigator,
  infodiv,
  setinfodiv,
}: {
  reactNavigator: Navigator;
  infodiv: Info;
  setinfodiv: Function;
}) => {
  //{index != datamain.content.length - 1 && <Border />}
  return (
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
            const test = [...infodiv];
            test.push({
              name: "???",
              type: "play",
              icon: null,
              content: [
                {
                  after: "TOP",
                  header: "test",
                  text: "asd",
                  content: [],
                },
              ],
            });

            setinfodiv(test);
          }}
        >
          S
        </Button>
        <Button
          onClick={() => {
            const test = [...infodiv];
            test.push({
              name: "???",
              type: "normal",
              icon: null,
              content: [
                {
                  after: "TOP",
                  header: "test",
                  text: "asd",
                  content: [],
                },
              ],
            });

            setinfodiv(test);
          }}
        >
          M
        </Button>
        <Button
          onClick={() => {
            const test = [...infodiv];
            test.push({
              name: "???",
              type: "big",
              icon: null,
              content: [
                {
                  after: "TOP",
                  header: "test",
                  text: "asd",
                  content: [],
                },
              ],
            });

            setinfodiv(test);
          }}
        >
          L
        </Button>
      </div>
    </motion.div>
  );
};
