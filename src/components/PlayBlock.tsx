import { useEffect, useRef, useState } from "react";
import { ButtonGroupTile, ButtonTile, Icon } from ".";
import { ContentPage } from "../type";
import { initUtils } from "@telegram-apps/sdk";

const PlayBlock = ({
  children,
  title,
  text,
  website,
  websitetelegram,
  website2,
  setinfodiv,
  indexmain,
  editor,
}: {
  children: Array<{ photo: string | undefined; click: number }>;
  title: string;
  text: string;
  website: string;
  websitetelegram: string;
  website2: string;
  setinfodiv: Function;
  indexmain: number;
  editor: boolean;
}) => {
  const [edit, setedit] = useState(false);
  const [content, setcontent] = useState(children);
  const [titleelement, settitleelement] = useState(title);
  const [textelement, settextelement] = useState(text);
  const [websiteelement, setwebsiteelement] = useState(website);
  const [websitetelegramelement, setwebsitetelegramelement] =
    useState(websitetelegram);
  const [website2element, setwebsite2element] = useState(website2);

  const utils = initUtils();

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current as Element;

      if (scrollContainer) {
        const handlescroll: EventListener = (e) => {
          const wheelEvent = e as WheelEvent;

          wheelEvent.preventDefault();
          scrollContainer.scrollLeft += wheelEvent.deltaY > 0 ? 50 : -50;
        };

        let startX: number;

        const handleTouchStart: EventListener = (e) => {
          const touchEvent = e as TouchEvent;
          startX = touchEvent.touches[0].clientX;
        };

        const handleTouchMove: EventListener = (e) => {
          const touchEvent = e as TouchEvent;
          const moveX = touchEvent.touches[0].clientX - startX;

          scrollContainer.scrollLeft -= moveX;

          startX = touchEvent.touches[0].clientX;
        };

        scrollContainer.addEventListener("wheel", handlescroll);

        scrollContainer.addEventListener("touchstart", handleTouchStart);

        scrollContainer.addEventListener("touchmove", handleTouchMove);

        return () => {
          scrollContainer.removeEventListener("wheel", handlescroll);
          scrollContainer.removeEventListener("touchstart", handleTouchStart);
          scrollContainer.removeEventListener("touchmove", handlescroll);
        };
      }
    }
  }, [scrollContainerRef]);

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

      setcontent((info) => {
        const data = [...info];
        data[index].photo = dataimg;

        return data;
      });
    }
  };

  return (
    <div
      className="play-block"
      style={{
        border: edit
          ? "1px solid rgba(255,255,255,1)"
          : "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {edit && editor ? (
        <input
          name="play-block-title-input"
          className="play-block-title-input"
          defaultValue={titleelement}
          onChange={(e) => {
            settitleelement(e.target.value);
          }}
        />
      ) : (
        <div className="play-block-title">{title}</div>
      )}
      <div className="play-block-photo" ref={scrollContainerRef}>
        {edit
          ? content.map((data, index) => {
              return !data.photo ? (
                <div
                  key={index}
                  className="play-block-photo-no"
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
              ) : (
                <img
                  key={index}
                  style={{
                    height: "334px",
                    width: "170px",
                    borderRadius: "8px",
                  }}
                  src={data.photo}
                  onClick={() => {
                    if (edit) {
                      setcontent((info) => {
                        const data = [...info];

                        data[index].photo = undefined;
                        return data;
                      });
                    }
                  }}
                />
              );
            })
          : children.map((data, index) => {
              return !data.photo ? (
                <div key={index} className="play-block-photo-no" />
              ) : (
                <img
                  key={index}
                  style={{
                    height: "334px",
                    width: "170px",
                    borderRadius: "8px",
                  }}
                  src={data.photo}
                />
              );
            })}
      </div>
      {edit && editor ? (
        <textarea
          name="i-block-text-input"
          className="i-block-text-input"
          defaultValue={textelement}
          onChange={(e) => {
            e.target.style.height = e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;

            settextelement(e.target.value);
          }}
        />
      ) : (
        <div className="play-block-text">{text}</div>
      )}
      {edit && editor ? (
        <div style={{ width: "100%" }}>
          <input
            name="play-block-button-input"
            className="play-block-button-input"
            defaultValue={websiteelement}
            onChange={(e) => {
              setwebsiteelement(e.target.value);
            }}
          />
          <input
            name="play-block-button-input"
            className="play-block-button-input"
            defaultValue={websitetelegramelement}
            onChange={(e) => {
              setwebsitetelegramelement(e.target.value);
            }}
          />
          <input
            name="play-block-button-input"
            className="play-block-button-input"
            defaultValue={website2element}
            onChange={(e) => {
              setwebsite2element(e.target.value);
            }}
          />
        </div>
      ) : (
        <div className="play-block-button">
          <button
            className="play-block-button-play"
            onClick={() => {
              utils.openTelegramLink(website);
            }}
          >
            Играть
            {Icon("Play")}
          </button>
          <button
            className="play-block-button-telegram"
            onClick={() => {
              utils.openTelegramLink(websitetelegram);
            }}
          >
            {Icon("Telegram")}
          </button>
          <button
            className="play-block-button-telegram"
            onClick={() => {
              utils.openTelegramLink(website2);
            }}
          >
            {Icon("Share")}
          </button>
        </div>
      )}
      {edit && editor ? (
        <ButtonGroupTile style={{ background: "none" }}>
          <ButtonTile
            onClick={() =>
              setcontent((info) => {
                const data = [...info];

                data.push({
                  photo: undefined,
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
                  data.click = 0;
                });

                data[indexmain] = {
                  type: "play",
                  photo: content,
                  title: titleelement,
                  text: textelement,
                  website: websiteelement,
                  website2: website2element,
                  websitetelegram: websitetelegramelement,
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

export default PlayBlock;
