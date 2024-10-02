import { type Navigator, Navigate, useParams } from "react-router-dom";
import { BackButton } from "../scripts";

import { motion } from "framer-motion";
import { ButtonGroupTile, ButtonTile, NormalBlock } from "../components";
import { Info } from "../type";
import { useState } from "react";

export default ({
  reactNavigator,
  infodiv,
  setinfodiv,
  editor,
}: {
  reactNavigator: Navigator;
  infodiv: Info;
  setinfodiv: Function;
  editor?: boolean;
}) => {
  const [edit, setedit] = useState(false);

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
        (datamain, index2) => {
          return datamain.type == "normal" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <NormalBlock
                contentmain={datamain.content}
                style={{ marginTop: index2 != 0 ? "10px" : "" }}
                editor={editor ? editor : false}
                setinfodiv={setinfodiv}
                indexmain={Number(indexmain)}
                indexmain2={Number(index)}
                indexmain3={index2}
              />
            </div>
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
            БЛОК
          </ButtonTile>
          <ButtonTile>I</ButtonTile>
          <ButtonTile>!!</ButtonTile>
          <ButtonTile>Цитата</ButtonTile>
          <ButtonTile>Автор</ButtonTile>
        </ButtonGroupTile>
      )}
    </motion.div>
  );
};
