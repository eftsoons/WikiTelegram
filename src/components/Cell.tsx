import { useContext, useEffect, useRef, useState } from "react";

import Border from "./Border";

import { type Info } from "../type";
import { Icon } from ".";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { InfoDivContext } from "../scripts";

const Cell = ({
  before,
  header,
  text,
  disabled,
  after,
  onClick,
  index,
  typemain,
  editor,
  notinternet,
  buttonactive,
  monetindex,
}: {
  before?: string | undefined;
  header?: string;
  text?: string;
  disabled?: boolean;
  after?: string;
  onClick?: () => void;
  index?: number;
  typemain: "explore" | "social" | "study" | "monet";
  editor: boolean;
  notinternet?: boolean;
  buttonactive?: number;
  monetindex?: number;
}) => {
  const menusettings = useRef<HTMLDivElement | null>(null);
  const menusettingsstatus = useRef<HTMLDivElement | null>(null);
  const buttonopensettings = useRef<HTMLDivElement | null>(null);

  const [settings, setsettings] = useState<boolean>(false);
  const [settingsstatus, setsettingsstatus] = useState<boolean>(false);
  const [edit, setedit] = useState<boolean>(false);
  const [valuetext, setvaluetext] = useState<string | undefined>(text);
  const [valueheader, setvalueheader] = useState<string | undefined>(header);
  const [valuephoto, setvaluephoto] = useState<string | undefined>(before);

  const launchParams = retrieveLaunchParams();

  const { type, setinfodiv, indexmain } = useContext(InfoDivContext);

  const handleonchaneimg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    indexmain: number | undefined,
    index: number | undefined
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (setinfodiv && indexmain !== undefined && index !== undefined) {
        const data: string = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target!.result as string);
          reader.readAsDataURL(file);
        });

        setvaluephoto(data);
      }
    }
  };

  const handledeletedimg = (
    e: React.MouseEvent<HTMLElement>,
    indexmain: number | undefined,
    index: number | undefined
  ) => {
    e.stopPropagation();

    if (setinfodiv && indexmain != undefined && index != undefined) {
      setvaluephoto(undefined);
    }
  };

  const handleClickSettings = (event: MouseEvent | TouchEvent) => {
    if (
      menusettings.current &&
      !menusettings.current.contains(event.target as Node) &&
      buttonopensettings.current &&
      !buttonopensettings.current.contains(event.target as Node)
    ) {
      setsettings(false);
    }
  };

  const handleClickSettingsIcon = (event: MouseEvent | TouchEvent) => {
    if (
      menusettingsstatus.current &&
      !menusettingsstatus.current.contains(event.target as Node)
    ) {
      setsettingsstatus(false);
    }
  };

  const handlesetafter = (newdata: undefined | "NEW" | "TOP" | "OFCL") => {
    if (setinfodiv) {
      setinfodiv((info: Info) => {
        const data = [...info];

        data[Number(indexmain)].content[Number(index)].after = newdata;

        if (typemain != "monet") {
          axios.post(`${import.meta.env.VITE_API_URL}/info/save`, {
            initData: launchParams.initDataRaw,
            type: typemain,
            data: data,
          });
        } else {
          axios.post(`${import.meta.env.VITE_API_URL}/monet/info/save`, {
            initData: launchParams.initDataRaw,
            data: data,
            indexmain: buttonactive,
            monetindex: monetindex,
          });
        }

        return data;
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickSettings);
    document.addEventListener("touchstart", handleClickSettings);
    document.addEventListener("mousedown", handleClickSettingsIcon);
    document.addEventListener("touchstart", handleClickSettingsIcon);

    return () => {
      document.removeEventListener("mousedown", handleClickSettings);
      document.removeEventListener("touchstart", handleClickSettings);
      document.removeEventListener("mousedown", handleClickSettingsIcon);
      document.removeEventListener("touchstart", handleClickSettingsIcon);
    };
  }, []);

  return type == "play" ? (
    <div
      onClick={() => {
        if (!edit && onClick) {
          onClick();
        }
      }}
      style={{ opacity: disabled ? "0.3" : "1" }}
      className="cell-main-play"
    >
      {before ? (
        <img
          style={{
            height: "84px",
            width: "100%",
            borderRadius: "8px",
          }}
          src={before}
        />
      ) : (
        <div
          style={{
            height: "84px",
            width: "100%",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: !notinternet ? `url("notimg.png")` : "",
            backgroundColor: notinternet ? "red" : "",
          }}
        />
      )}
      <div className="cell-span-play">{header}</div>
    </div>
  ) : (
    <div
      onClick={() => {
        if (!edit && onClick) {
          onClick();
        }
      }}
      className="cell"
      style={{ opacity: disabled ? "0.3" : "1" }}
    >
      <div className="cell-before">
        {!edit ? (
          before ? (
            <img
              style={{
                height: type == "big" ? "128px" : "64px",
                width: type == "big" ? "128px" : "64px",
                borderRadius: "32px",
              }}
              src={before}
            />
          ) : (
            <div
              style={{
                height: type == "big" ? "128px" : "64px",
                width: type == "big" ? "128px" : "64px",
                borderRadius: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: !notinternet ? `url("notimg.png")` : "",
                backgroundColor: notinternet ? "#343434" : "",
              }}
            />
          )
        ) : valuephoto ? (
          <img
            style={{
              height: type == "big" ? "128px" : "64px",
              width: type == "big" ? "128px" : "64px",
              borderRadius: "32px",
            }}
            src={valuephoto}
            onClick={(e) => handledeletedimg(e, indexmain, index)}
          />
        ) : (
          <div
            style={{
              height: type == "big" ? "128px" : "64px",
              width: type == "big" ? "128px" : "64px",
              borderRadius: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
              name="file"
              type="file"
              accept="image/*"
              style={{
                display: "none",
              }}
              onChange={(e) => handleonchaneimg(e, indexmain, index)}
            />
          </div>
        )}
      </div>
      <div
        className="cell-main"
        style={{
          height: type == "big" ? "128px" : "64px",
          width: "100%",
        }}
      >
        <div
          className="cell-header"
          style={{
            width:
              type == "big"
                ? "calc(var(--tg-viewport-width) - 178px)"
                : "calc(var(--tg-viewport-width) - 114px)",
          }}
        >
          <div
            className="cell-header-span"
            style={{
              width:
                type == "big"
                  ? "calc(var(--tg-viewport-width) - 235px)"
                  : "calc(var(--tg-viewport-width) - 170px)",
            }}
          >
            {!edit ? (
              header
            ) : (
              <input
                name="cell-input-header"
                className="cell-input-header"
                onChange={(e) => {
                  setvalueheader(e.target.value);
                }}
                value={valueheader}
              />
            )}
          </div>
        </div>
        {!edit ? (
          <div
            className="cell-span"
            style={{
              width:
                type == "big"
                  ? "calc(var(--tg-viewport-width) - 180px)"
                  : "calc(var(--tg-viewport-width) - 110px)",
            }}
          >
            {text}
          </div>
        ) : (
          <textarea
            name="cell-input-span-header"
            style={{
              width:
                type == "big"
                  ? "calc(var(--tg-viewport-width) - 180px)"
                  : "calc(var(--tg-viewport-width) - 110px)",
            }}
            className="cell-input-span"
            onChange={(e) => setvaluetext(e.target.value)}
            value={valuetext}
          />
        )}
        {after ? (
          <div
            className="call-header-after"
            style={{
              color:
                after == "TOP"
                  ? "#EA9A00"
                  : after == "OFCL"
                  ? "#0098EA"
                  : "#F75E25",
              borderColor:
                after == "TOP"
                  ? "#EA9A00"
                  : after == "OFCL"
                  ? "#0098EA"
                  : "#F75E25",
            }}
            ref={buttonopensettings}
            onClick={(e) => {
              setsettings(!settings);

              if (settingsstatus) {
                setsettings(false);
                setsettingsstatus(false);
              }
              e.stopPropagation();
            }}
          >
            {after}
          </div>
        ) : (
          editor && (
            <div
              style={{
                height: "15px",
                width: "15px",
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                right: "10px",
              }}
              ref={buttonopensettings}
              onClick={(e) => {
                setsettings(!settings);

                if (settingsstatus) {
                  setsettings(false);
                  setsettingsstatus(false);
                }
                e.stopPropagation();
              }}
            >
              {Icon("Menu", "1.5")}
            </div>
          )
        )}
        {editor && setinfodiv && (
          <>
            {settings && (
              <div
                className="cell-settings"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                ref={menusettings}
              >
                <div
                  className="cell-settings-items"
                  onClick={() => {
                    setsettings(false);
                    setsettingsstatus(true);
                  }}
                >
                  {Icon("icon", "1.5")}
                  <span style={{ height: "100%", marginLeft: "10px" }}>
                    Status
                  </span>
                </div>
                {!edit ? (
                  <div
                    className="cell-settings-items"
                    onClick={() => setedit(true)}
                  >
                    {Icon("Edit", "1.5")}
                    <span style={{ height: "100%", marginLeft: "10px" }}>
                      Edit
                    </span>
                  </div>
                ) : (
                  <div
                    className="cell-settings-items"
                    onClick={() => {
                      if (
                        setinfodiv &&
                        indexmain != undefined &&
                        index != undefined
                      ) {
                        setedit(false);
                        setinfodiv((info: Info) => {
                          if (valueheader && valuetext) {
                            const data = [...info];

                            data[indexmain].content[index].header = valueheader;
                            data[indexmain].content[index].text = valuetext;
                            data[indexmain].content[index].before = valuephoto;

                            if (typemain != "monet") {
                              axios.post(
                                `${import.meta.env.VITE_API_URL}/info/save`,
                                {
                                  initData: launchParams.initDataRaw,
                                  type: typemain,
                                  data: data,
                                }
                              );
                            } else {
                              axios.post(
                                `${
                                  import.meta.env.VITE_API_URL
                                }/monet/info/save`,
                                {
                                  initData: launchParams.initDataRaw,
                                  data: data,
                                  indexmain: buttonactive,
                                  monetindex: monetindex,
                                }
                              );
                            }

                            return data;
                          }
                        });
                      }
                    }}
                  >
                    {Icon("Done", "1.5")}
                    <span style={{ height: "100%", marginLeft: "10px" }}>
                      Save
                    </span>
                  </div>
                )}
                <Border type="center" />
                <div
                  className="cell-settings-items"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      setinfodiv &&
                      (index || index == 0) &&
                      (indexmain || indexmain == 0)
                    ) {
                      setsettings(false);
                      setinfodiv((info: Info) => {
                        const data = [...info];
                        data[indexmain].content.splice(index, 1);

                        if (typemain != "monet") {
                          axios.post(
                            `${import.meta.env.VITE_API_URL}/info/save`,
                            {
                              initData: launchParams.initDataRaw,
                              type: typemain,
                              data: data,
                            }
                          );
                        } else {
                          axios.post(
                            `${import.meta.env.VITE_API_URL}/monet/info/save`,
                            {
                              initData: launchParams.initDataRaw,
                              data: data,
                              indexmain: buttonactive,
                              monetindex: monetindex,
                            }
                          );
                        }

                        return data;
                      });
                    }
                  }}
                >
                  {Icon("Close", "1.5")}
                  <span style={{ height: "100%", marginLeft: "10px" }}>
                    Delete
                  </span>
                </div>
              </div>
            )}
            {settingsstatus && (
              <div
                ref={menusettingsstatus}
                className="cell-settings"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div
                  className="cell-settings-items"
                  onClick={() => handlesetafter("TOP")}
                >
                  TOP
                </div>
                <div
                  className="cell-settings-items"
                  onClick={() => handlesetafter("OFCL")}
                >
                  OFCL
                </div>
                <div
                  className="cell-settings-items"
                  onClick={() => handlesetafter("NEW")}
                >
                  NEW
                </div>
                <div
                  className="cell-settings-items"
                  onClick={() => handlesetafter(undefined)}
                >
                  None
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cell;
