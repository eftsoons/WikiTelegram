import { type Navigator, Navigate, useParams } from "react-router-dom";
import { BackButton } from "../scripts";

import { motion } from "framer-motion";
import { ButtonGroupTile, ButtonTile, Icon, NormalBlock } from "../components";
import { Info } from "../type";
import IBlock from "../components/iBlock";

export default ({
  reactNavigator,
  infodiv,
  setinfodiv,
  editor,
}: {
  reactNavigator: Navigator;
  infodiv: Info;
  setinfodiv: Function;
  editor: boolean;
}) => {
  const { index, indexmain } = useParams();

  if (!index || !indexmain) {
    return <Navigate to="/" />;
  }

  BackButton(reactNavigator);

  {
    /*edit && (
                        <button
                          onClick={() =>
                            setinfodiv((info: Info) => {
                              const data = [...info];

                              const item =
                                data[Number(indexmain)].content[Number(index)]
                                  .content[index2];

                              if (item.type == "normal") {
                                item.content.splice(index3, 1);
                              }

                              return data;
                            })
                          }
                        >
                          deleted
                        </button>
                      )*/
  }

  {
    /*<span
                        onClick={() =>
                          setinfodiv((info: Info) => {
                            const data4 = [...info];
                            console.log(data4[Number(indexmain)].content);
                            data4[Number(indexmain)].content[
                              Number(index)
                            ].content[Number(index2)].content.splice(index3, 1);
                            return data4;
                          })
                        }
                        style={{ position: "absolute" }}
                      >
                        X
                      </span>*/
  }

  return (
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {infodiv[Number(indexmain)].content[Number(index)].content.map(
        (data, index2) => {
          return data.type == "normal" ? (
            <NormalBlock
              contentmain={data.content}
              editor={editor ? editor : false}
              setinfodiv={setinfodiv}
              indexmain={Number(indexmain)}
              indexmain2={Number(index)}
              indexmain3={index2}
            />
          ) : data.type == "i" ? (
            <IBlock
              setinfodiv={setinfodiv}
              indexmain={Number(indexmain)}
              indexmain2={Number(index)}
              indexmain3={index2}
              editor={editor}
              title={data.title}
            >
              {data.text}
            </IBlock>
          ) : (
            ""
          );

          {
            /*switch (data.type) {
            case "normal":
              return (
                <NormalBlock
                  title={data.title ? data.title : "???"}
                  key={index}
                >
                  {data.text}
                </NormalBlock>
              );
            case "citate":
              return (
                <Citate key={index} author={data.title ? data.title : "???"}>
                  {data.text}
                </Citate>
              );
            default:
              return (
                <IBlock key={index} title={data.title ? data.title : "???"}>
                  {data.text}
                </IBlock>
              );
          }*/
          }
        }
      )}
      {editor && (
        <ButtonGroupTile style={{ marginTop: "20px" }}>
          <ButtonTile
            onClick={() =>
              setinfodiv((info: Info) => {
                const data = [...info];

                data[Number(indexmain)].content[Number(index)].content.push({
                  type: "normal",
                  content: [],
                });

                return data;
              })
            }
          >
            {Icon("Block")}
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setinfodiv((info: Info) => {
                const data = [...info];

                data[Number(indexmain)].content[Number(index)].content.push({
                  type: "i",
                  title: "???",
                  text: "???",
                });

                return data;
              })
            }
          >
            {Icon("info")}
          </ButtonTile>
          <ButtonTile>{Icon("Attern")}</ButtonTile>
          <ButtonTile>{Icon("Citate")}</ButtonTile>
          <ButtonTile>{Icon("Email")}</ButtonTile>
        </ButtonGroupTile>
      )}
    </motion.div>
  );
};
