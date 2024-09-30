import { type Navigator, Navigate, useParams } from "react-router-dom";
import { BackButton } from "../scripts";

import { motion } from "framer-motion";
import { NormalBlock } from "../components";
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
              <NormalBlock style={{ marginTop: index2 != 0 ? "10px" : "" }}>
                {datamain.content.map((data, index3) => {
                  return data.type != "image" ? (
                    <div style={{ display: "flex" }}>
                      {editor && edit ? (
                        data.type == "text" ? (
                          <textarea
                            className="normal-block-text-input"
                            defaultValue={data.text}
                            onChange={(e) => {
                              e.target.style.height = e.target.style.height =
                                "auto";
                              e.target.style.height = `${e.target.scrollHeight}px`;

                              setinfodiv((info: Info) => {
                                const data = [...info];
                                const item =
                                  data[Number(indexmain)].content[Number(index)]
                                    .content[Number(index2)];

                                if (item.type == "normal") {
                                  if (item.content[index3].type != "image") {
                                    item.content[index3].text = e.target.value;
                                  }
                                }

                                return data;
                              });
                              e.target.value;
                            }}
                          />
                        ) : (
                          <input
                            className={
                              data.type == "h1"
                                ? "normal-block-title-input h1"
                                : data.type == "h2"
                                ? "normal-block-title-input h2"
                                : "normal-block-title-input h3"
                            }
                            defaultValue={data.text}
                            onChange={(e) => {
                              e.target.style.height = e.target.style.height =
                                "auto";
                              e.target.style.height = `${e.target.scrollHeight}px`;

                              setinfodiv((info: Info) => {
                                const data = [...info];
                                const item =
                                  data[Number(indexmain)].content[Number(index)]
                                    .content[Number(index2)];

                                if (item.type == "normal") {
                                  if (item.content[index3].type != "image") {
                                    item.content[index3].text = e.target.value;
                                  }
                                }

                                return data;
                              });
                              e.target.value;
                            }}
                          />
                        )
                      ) : (
                        <div
                          className={
                            data.type == "text"
                              ? "normal-block-text"
                              : data.type == "h1"
                              ? "normal-block-title h1"
                              : data.type == "h2"
                              ? "normal-block-title h2"
                              : "normal-block-title h3"
                          }
                        >
                          {data.text}
                        </div>
                      )}
                      {/*edit && (
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
                      )*/}
                    </div>
                  ) : data.content ? (
                    <img
                      style={{
                        height: "150px",
                        width: "100%",
                      }}
                      className="block-image"
                      src={data.content}
                      onClick={() => {
                        if (edit) {
                          setinfodiv((info: Info) => {
                            const data = [...info];

                            const item =
                              data[Number(indexmain)].content[Number(index)]
                                .content[Number(index2)];

                            if (item.type == "normal") {
                              if (item.content[index3].type == "image") {
                                item.content[index3].content = undefined;
                              }
                            }

                            return data;
                          });
                        }
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "150px",
                        backgroundImage: `url("notimg.png")`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const target = e.currentTarget;
                        if (target.children.length > 0 && edit) {
                          const child = target.children[0];
                          if (child instanceof HTMLElement) {
                            child.click();
                          }
                        }
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        style={{
                          display: "none",
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files) {
                            const file = e.target.files[0];

                            setinfodiv((info: Info) => {
                              const data = [...info];

                              const item =
                                data[Number(indexmain)].content[Number(index)]
                                  .content[Number(index2)];

                              if (item.type == "normal") {
                                if (item.content[index3].type == "image") {
                                  item.content[index3].content =
                                    URL.createObjectURL(file);
                                }
                              }

                              return data;
                            });
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </NormalBlock>
              <div style={{ display: "flex" }}>
                {edit && editor && datamain.type == "normal" ? (
                  <>
                    <button
                      onClick={() =>
                        setinfodiv((info: Info) => {
                          const data = [...info];
                          const item =
                            data[Number(indexmain)].content[Number(index)]
                              .content[index2];

                          if (item.type == "normal") {
                            item.content.push({
                              type: "h1",
                              text: "asd",
                            });
                          }

                          return data;
                        })
                      }
                    >
                      h1
                    </button>
                    <button
                      onClick={() =>
                        setinfodiv((info: Info) => {
                          const data = [...info];
                          const item =
                            data[Number(indexmain)].content[Number(index)]
                              .content[index2];

                          if (item.type == "normal") {
                            item.content.push({
                              type: "h2",
                              text: "asd",
                            });
                          }

                          return data;
                        })
                      }
                    >
                      h2
                    </button>
                    <button
                      onClick={() =>
                        setinfodiv((info: Info) => {
                          const data = [...info];
                          const item =
                            data[Number(indexmain)].content[Number(index)]
                              .content[index2];

                          if (item.type == "normal") {
                            item.content.push({
                              type: "h3",
                              text: "asd",
                            });
                          }

                          return data;
                        })
                      }
                    >
                      h3
                    </button>
                    <button
                      onClick={() =>
                        setinfodiv((info: Info) => {
                          const data = [...info];
                          const item =
                            data[Number(indexmain)].content[Number(index)]
                              .content[index2];

                          if (item.type == "normal") {
                            item.content.push({
                              type: "text",
                              text: "asd",
                            });
                          }

                          return data;
                        })
                      }
                    >
                      text
                    </button>
                    <button
                      onClick={() =>
                        setinfodiv((info: Info) => {
                          const data = [...info];
                          const item =
                            data[Number(indexmain)].content[Number(index)]
                              .content[index2];

                          if (item.type == "normal") {
                            item.content.push({
                              type: "image",
                              content: undefined,
                            });
                          }

                          return data;
                        })
                      }
                    >
                      image
                    </button>
                    <button onClick={() => setedit(false)}>Save</button>
                  </>
                ) : (
                  editor && (
                    <>
                      <button
                        onClick={() =>
                          setinfodiv((info: Info) => {
                            const data = [...info];

                            data[Number(indexmain)].content[
                              Number(index)
                            ].content.splice(index2, 1);

                            return data;
                          })
                        }
                      >
                        Deleted
                      </button>
                      <button onClick={() => setedit(true)}>Edit</button>
                    </>
                  )
                )}
              </div>
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
        <div style={{ marginTop: "20px" }}>
          <div>
            <button
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
            </button>
            <button>I</button>
            <button>!!</button>
            <button>Цитата</button>
            <button>Автор</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
