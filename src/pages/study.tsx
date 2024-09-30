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
            icon={datamain.icon ? datamain.icon : <Chain />}
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
                  reactNavigator.push(
                    datamain.type != "monet"
                      ? `/page/study/${indexmain}/${index}`
                      : "/explore/monet/ton"
                  );
                }}
              />
            ))}
          </InfoDiv>
        );
      })}
      <div style={{ width: "90%", marginTop: "20px" }}>
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
                {
                  after: "TOP",
                  header: "test",
                  text: "asd",
                  content: [],
                },
                {
                  after: "TOP",
                  header: "test",
                  text: "asd",
                  content: [],
                },
                {
                  after: "TOP",
                  header: "test",
                  text: "asd",
                  content: [],
                },
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
          ADD
        </Button>
      </div>
    </motion.div>
  );
};
