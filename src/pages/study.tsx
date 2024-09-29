import { motion } from "framer-motion";

import { Border, Button, InfoDiv } from "../components";

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
  return (
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {infodiv.map((datamain, indexmain) => {
        switch (datamain.type) {
          case "big":
            return (
              <InfoDiv
                key={indexmain}
                index={indexmain}
                text={datamain.name}
                icon={datamain.icon ? datamain.icon : <Chain />}
                setinfodiv={setinfodiv}
              >
                {datamain.content.map((data, index) => (
                  <div key={index}>
                    <Cell
                      before={
                        data.before ? (
                          <img
                            style={{ height: "128px", width: "128px" }}
                            src={data.before}
                          />
                        ) : (
                          <div
                            style={{
                              height: "128px",
                              width: "128px",
                              backgroundColor: "red",
                            }}
                          >
                            ТУТИЗОБР
                          </div>
                        )
                      }
                      header={data.header}
                      text={data.text}
                      onClick={() => {
                        reactNavigator.push(
                          `/page/study/${indexmain}/${index}`
                        );
                      }}
                      type={"big"}
                    />
                    {index != datamain.content.length - 1 && <Border />}
                  </div>
                ))}
              </InfoDiv>
            );
          case "play":
          default:
            return (
              <InfoDiv
                key={indexmain}
                index={indexmain}
                text={datamain.name}
                icon={datamain.icon ? datamain.icon : <Chain />}
                setinfodiv={setinfodiv}
              >
                {datamain.content.map((data, index) => (
                  <div key={index}>
                    <Cell
                      before={
                        data.before ? (
                          <img
                            style={{ height: "64px", width: "64px" }}
                            src={data.before}
                          />
                        ) : (
                          <div
                            style={{
                              height: "64px",
                              width: "64px",
                              backgroundColor: "red",
                            }}
                          >
                            ТУТИЗОБР
                          </div>
                        )
                      }
                      header={data.header}
                      text={data.text}
                      onClick={() => {
                        reactNavigator.push(
                          `/page/study/${indexmain}/${index}`
                        );
                      }}
                    />
                    {index != datamain.content.length - 1 && <Border />}
                  </div>
                ))}
              </InfoDiv>
            );
        }
      })}
      <div style={{ width: "90%", marginTop: "20px" }}>
        <Button
          onClick={() => {
            const test = [...infodiv];
            test.push({
              name: "???",
              type: "big",
              icon: null,
              content: [
                {
                  header: "test",
                  text: "TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest",
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
