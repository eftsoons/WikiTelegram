import { CSSProperties, useState } from "react";
import { ButtonGroupTile, ButtonTile, Icon } from ".";
import { ContentPage } from "../type";

const NormalBlock = ({
  style,
  contentmain,
  editor,
  setinfodiv,
  indexmain,
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
        click: number;
      }
  >;
  editor: boolean;
  setinfodiv: Function;
  indexmain: number;
}) => {
  /*<div className="normal-block-title">{title}</div>
  <div className="normal-block-img"></div>
  <div className="normal-block-text">{children}</div>*/

  const [edit, setedit] = useState(false);

  const [content, setcontent] = useState(contentmain);

  const handleonchaneimg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const dataimg: string = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event!.target!.result as string);
        reader.readAsDataURL(file);
      });

      const cropHeight = (
        imgSrc: string,
        cropHeight: number
      ): Promise<string> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;

            canvas.width = img.width;
            canvas.height = cropHeight;

            ctx.drawImage(
              img,
              0,
              0,
              img.width,
              cropHeight,
              0,
              0,
              img.width,
              cropHeight
            );

            resolve(canvas.toDataURL());
          };
        });
      };

      const croppedImage = await cropHeight(dataimg, 140);

      setcontent((info) => {
        const data = [...info];
        if (data[index].type === "image") {
          data[index].content = croppedImage;
        }

        return data;
      });
    }
  };

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
                name="normal-block-text-input"
                key={index}
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
                name="normal-block-title-input"
                key={index}
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
              key={index}
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
            key={index}
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
            key={index}
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
                  if (data.click < 2) {
                    child.click();
                    data.click += 1;
                  } else {
                    setcontent((info) => {
                      const data = [...info];

                      data.splice(index, 1);

                      return data;
                    });
                  }
                }
              }
            }}
          >
            <input
              name="file"
              key={index}
              type="file"
              accept="image/*"
              style={{
                display: "none",
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleonchaneimg(e, index)
              }
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
                  click: 0,
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
              setinfodiv((info: ContentPage) => {
                const data = [...info];

                //гавнокод, но ладно
                content.map((data) => {
                  if (data.type == "image") {
                    data.click = 0;
                  }
                });

                data[indexmain] = {
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
              onClick={() => {
                setinfodiv((info: ContentPage) => {
                  const data = [...info];

                  const element = data.splice(indexmain, 1)[0];

                  data.splice(indexmain - 1, 0, element);

                  return data;
                });
              }}
            >
              Up
            </ButtonTile>
            <ButtonTile
              onClick={() => {
                setinfodiv((info: ContentPage) => {
                  const data = [...info];

                  const element = data.splice(indexmain, 1)[0];
                  data.splice(indexmain + 1, 0, element);

                  return data;
                });
              }}
            >
              Down
            </ButtonTile>
            <ButtonTile
              onClick={() =>
                setinfodiv((info: ContentPage) => {
                  const data = [...info];

                  data.splice(indexmain, 1);

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

export default NormalBlock;
