import { CSSProperties, useState } from "react";
import { ButtonGroupTile, ButtonTile, Icon } from ".";
import { Info } from "../type";

export default ({
  style,
  contentmain,
  editor,
  setinfodiv,
  indexmain,
  indexmain2,
  indexmain3,
}: {
  style?: CSSProperties;
  contentmain: Array<
    | {
        type: "h1" | "h2" | "h3" | "text";
        text: string;
      }
    | {
        type: "image";
        content: string | undefined;
      }
  >;
  editor: boolean;
  setinfodiv: Function;
  indexmain: number;
  indexmain2: number;
  indexmain3: number;
}) => {
  /*<div className="normal-block-title">{title}</div>
  <div className="normal-block-img"></div>
  <div className="normal-block-text">{children}</div>*/

  const [edit, setedit] = useState(false);

  const [content, setcontent] = useState(contentmain);

  return (
    <div
      style={{
        border: edit
          ? "1px solid rgba(255,255,255,1)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        ...style,
      }}
      className="normal-block"
    >
      {content.map((data, index) => {
        return data.type != "image" ? (
          editor && edit ? (
            data.type == "text" ? (
              <textarea
                className="normal-block-text-input"
                defaultValue={data.text}
                onChange={(e) => {
                  e.target.style.height = e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;

                  setcontent((info) => {
                    const data = [...info];

                    if (data[index].type != "image") {
                      if (e.target.value != "") {
                        data[index].text = e.target.value;
                      } else {
                        data.splice(index, 1);
                      }
                    }

                    return data;
                  });
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
                  setcontent((info) => {
                    const data = [...info];

                    if (data[index].type != "image") {
                      if (e.target.value != "") {
                        data[index].text = e.target.value;
                      } else {
                        data.splice(index, 1);
                      }
                    }

                    return data;
                  });
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
          )
        ) : data.content ? (
          <img
            style={{
              height: "150px",
              width: "100%",
              marginTop: "5px",
            }}
            className="block-image"
            src={data.content}
            onClick={() => {
              if (edit) {
                setcontent((info) => {
                  const data = [...info];

                  if (data[index].type == "image") {
                    data[index].content = undefined;
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
              width: "100%",
              marginTop: "5px",
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

                  setcontent((info) => {
                    const data = [...info];
                    if (data[index].type == "image") {
                      data[index].content = URL.createObjectURL(file);
                    }

                    return data;
                  });
                }
              }}
            />
          </div>
        );
      })}
      {edit && editor ? (
        <ButtonGroupTile style={{ background: "none" }}>
          <ButtonTile
            onClick={() =>
              setcontent((info) => {
                const data = [...info];

                data.push({
                  type: "h1",
                  text: "???",
                });

                return data;
              })
            }
          >
            H1
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setcontent((info) => {
                const data = [...info];

                data.push({
                  type: "h2",
                  text: "???",
                });

                return data;
              })
            }
          >
            H2
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setcontent((info) => {
                const data = [...info];

                data.push({
                  type: "h3",
                  text: "???",
                });

                return data;
              })
            }
          >
            H3
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setcontent((info) => {
                const data = [...info];

                data.push({
                  type: "text",
                  text: "???",
                });

                return data;
              })
            }
          >
            {Icon("Text")}
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setcontent((info) => {
                const data = [...info];

                data.push({
                  type: "image",
                  content: undefined,
                });

                return data;
              })
            }
          >
            {Icon("image")}
          </ButtonTile>
          <ButtonTile
            onClick={() => {
              setedit(false);
              setinfodiv((info: Info) => {
                const data = [...info];

                data[indexmain].content[indexmain2].content[indexmain3] = {
                  type: "normal",
                  content: content,
                };

                return data;
              });
            }}
          >
            Save
          </ButtonTile>
        </ButtonGroupTile>
      ) : (
        editor && (
          <ButtonGroupTile style={{ background: "none" }}>
            <ButtonTile
              onClick={() =>
                setinfodiv((info: Info) => {
                  const data = [...info];

                  data[indexmain].content[indexmain2].content.splice(
                    indexmain3,
                    1
                  );

                  return data;
                })
              }
            >
              Deleted
            </ButtonTile>
            <ButtonTile onClick={() => setedit(true)}>Edit</ButtonTile>
          </ButtonGroupTile>
        )
      )}
    </div>
  );
};
