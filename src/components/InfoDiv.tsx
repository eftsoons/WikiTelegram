import { ReactElement, useEffect, useRef, useState } from "react";
import Border from "./Border";
import {
  Chain,
  Champ,
  Course,
  Explore,
  Fire,
  Game,
  Hearth,
  Idea,
  Joystick,
  NFT,
  Nitro,
  Reload,
  Search,
  Web,
} from "../svg";
import { Info } from "../type";
import { Button, Icon } from ".";

import { GetIcons, InfoDivContext } from "../scripts";

import type { Icons } from "../type";

import { IconsAll } from "../scripts";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { motion } from "framer-motion";

/*
return cloneElement(data, {
                  type: type,
                  setinfodiv: setinfodiv,
                  indexmain: index,
                  index: index2,
                  key: index2,
                });*/

const InfoDiv = ({
  text,
  icon,
  children,
  setinfodiv,
  index,
  type,
  infodiv,
  typemain,
  nodeleted,
  editor,
  buttonactive,
  monetindex,
  info,
}: {
  text?: string;
  icon?: Icons | "infowindow";
  children: ReactElement[] | ReactElement;
  setinfodiv?: Function;
  index?: number;
  type: "normal" | "play" | "big" | "monet";
  infodiv?: Info;
  typemain: "explore" | "social" | "study" | "monet";
  nodeleted?: boolean;
  editor: boolean;
  buttonactive?: number;
  monetindex?: number;
  info: string;
}) => {
  const menusettings = useRef<HTMLDivElement | null>(null);
  const menusettingsicon = useRef<HTMLDivElement | null>(null);
  const buttonopensettings = useRef<HTMLDivElement | null>(null);
  const [settings, setsettings] = useState<boolean>(false);
  const [settngsicon, setsettngsicon] = useState<boolean>(false);
  const [infoopen, setinfoopen] = useState<boolean>(false);

  const [edit, setedit] = useState<boolean>(false);
  const [valueheader, setvalueheader] = useState<string | undefined>(text);
  const [infoheader, setinfoheader] = useState<string | undefined>(info);

  const launchParams = retrieveLaunchParams();

  const handleicon = (element: IconsAll) => {
    if (setinfodiv && (index || index == 0)) {
      setsettngsicon(false);
      setinfodiv((infodiv: Info) => {
        const seticon = [...infodiv];

        seticon[index].icon = element;

        if (typemain != "monet") {
          axios.post(`${import.meta.env.VITE_API_URL}/info/save`, {
            initData: launchParams.initDataRaw,
            type: typemain,
            data: seticon,
          });
        } else {
          axios.post(`${import.meta.env.VITE_API_URL}/monet/info/save`, {
            initData: launchParams.initDataRaw,
            data: seticon,
            indexmain: buttonactive,
            monetindex: monetindex,
          });
        }

        return seticon;
      });
    }
  };

  const handledeleted = () => {
    if (setinfodiv && (index || index == 0) && !nodeleted) {
      setinfodiv((infodiv: Info) => {
        const seticon = [...infodiv];

        seticon.splice(index, 1);

        setsettings(false);

        if (typemain != "monet") {
          axios.post(`${import.meta.env.VITE_API_URL}/info/save`, {
            initData: launchParams.initDataRaw,
            type: typemain,
            data: seticon,
          });
        } else {
          axios.post(`${import.meta.env.VITE_API_URL}/monet/info/save`, {
            initData: launchParams.initDataRaw,
            data: seticon,
            indexmain: buttonactive,
            monetindex: monetindex,
          });
        }

        return seticon;
      });
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
      menusettingsicon.current &&
      !menusettingsicon.current.contains(event.target as Node)
    ) {
      setsettngsicon(false);
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

  const IconComponent = GetIcons(icon != "infowindow" ? icon : undefined);

  return (
    <div
      className="info"
      style={{
        borderRadius: type == "play" ? "8px" : "8px 8px 8px 42px",
        zIndex: infodiv && (index || index == 0) ? infodiv.length - index : "0",
      }}
    >
      <div className="info-headerinfo">
        {!edit ? (
          <span style={{ marginTop: "4px" }}>{text}</span>
        ) : (
          <input
            name="info-headerinfo-input"
            onChange={(e) => setvalueheader(e.target.value)}
            value={valueheader}
          />
        )}
        <div
          ref={buttonopensettings}
          onClick={() => {
            if (info == "" || editor) {
              setsettings(!settings);

              if (settngsicon) {
                setsettings(false);
                setsettngsicon(false);
              }
            } else {
              setinfoopen(!infoopen);
            }
          }}
        >
          {info == "" ? (
            <IconComponent />
          ) : (
            Icon("infowindow", "1.5", {
              marginRight: "10px",
              transform: infoopen ? "rotate(180deg)" : "",
              alignItems: "end",
            })
          )}
        </div>
      </div>
      {infoopen && (
        <motion.div
          className="infodiv-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {editor ? (
            <textarea
              name="infodiv-info-input"
              defaultValue={infoheader}
              onChange={(e) => {
                e.target.style.height = e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
                setinfoheader(e.target.value);
              }}
              className="infodiv-info-input"
            />
          ) : (
            <div className="infodiv-info-div">
              <span className="infodiv-info-span">{info}</span>
            </div>
          )}
        </motion.div>
      )}
      {editor && setinfodiv && (index || index == 0) && (
        <>
          {settings && (
            <div ref={menusettings} className="settings-menu">
              <div
                className="settings-items"
                onClick={() => {
                  setinfodiv((info: Info) => {
                    const data = [...info];

                    data[index].type = "play";

                    if (typemain != "monet") {
                      axios.post(`${import.meta.env.VITE_API_URL}/info/save`, {
                        initData: launchParams.initDataRaw,
                        type: typemain,
                        data: data,
                      });
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
                }}
              >
                {Icon("Sapp", "1.5")}
                <span style={{ height: "100%", marginLeft: "10px" }}>
                  S app
                </span>
              </div>
              <div
                className="settings-items"
                onClick={() => {
                  setinfodiv((info: Info) => {
                    const data = [...info];

                    data[index].type = "normal";

                    if (typemain != "monet") {
                      axios.post(`${import.meta.env.VITE_API_URL}/info/save`, {
                        initData: launchParams.initDataRaw,
                        type: typemain,
                        data: data,
                      });
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
                }}
              >
                {Icon("Mapp", "1.5")}
                <span style={{ height: "100%", marginLeft: "10px" }}>
                  M app
                </span>
              </div>
              <div
                className="settings-items"
                onClick={() => {
                  setinfodiv((info: Info) => {
                    const data = [...info];

                    data[index].type = "big";

                    if (typemain != "monet") {
                      axios.post(`${import.meta.env.VITE_API_URL}/info/save`, {
                        initData: launchParams.initDataRaw,
                        type: typemain,
                        data: data,
                      });
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
                }}
              >
                {Icon("Lapp", "1.5")}
                <span style={{ height: "100%", marginLeft: "10px" }}>
                  L app
                </span>
              </div>
              <Border type="center" />
              {edit && (
                <div
                  className="settings-items"
                  onClick={() => setinfoopen(!infoopen)}
                >
                  {Icon("info", "1.5")}
                  <span style={{ height: "100%", marginLeft: "10px" }}>
                    info
                  </span>
                </div>
              )}
              <div
                className="settings-items"
                onClick={() => {
                  setsettngsicon(true);
                  setsettings(false);
                }}
              >
                {Icon("icon", "1.5")}
                <span style={{ height: "100%", marginLeft: "10px" }}>icon</span>
              </div>
              <Border type="center" />
              {!edit ? (
                <div className="settings-items" onClick={() => setedit(true)}>
                  {Icon("Edit", "1.5")}
                  <span style={{ height: "100%", marginLeft: "10px" }}>
                    Edit
                  </span>
                </div>
              ) : (
                <div
                  className="settings-items"
                  onClick={() => {
                    if (setinfodiv && index != undefined) {
                      setedit(false);
                      setinfoopen(false);
                      setinfodiv((info: Info) => {
                        if (valueheader && (infoheader || infoheader == "")) {
                          const data = [...info];

                          data[index].name = valueheader;
                          data[index].info = infoheader;

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
              {!nodeleted && (
                <>
                  <Border type="center" />
                  <div className="settings-items" onClick={handledeleted}>
                    {Icon("Close", "1.5")}
                    <span style={{ height: "100%", marginLeft: "10px" }}>
                      Delete
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
          {settngsicon && (
            <div ref={menusettingsicon} className="settings-menu-icon">
              {/*я знаю, что можно сделать табличку и т.д., мне лень*/}
              <Explore
                height="24"
                width="24"
                onClick={() => handleicon("Explore")}
              />
              <Web height="24" width="24" onClick={() => handleicon("Web")} />
              <Course
                height="24"
                width="24"
                onClick={() => handleicon("Course")}
              />
              <Chain
                height="24"
                width="24"
                onClick={() => handleicon("Chain")}
              />
              <Champ
                height="24"
                width="24"
                onClick={() => handleicon("Champ")}
              />
              <Hearth
                height="24"
                width="24"
                onClick={() => handleicon("Hearth")}
              />
              <Fire height="24" width="24" onClick={() => handleicon("Fire")} />
              <Idea height="24" width="24" onClick={() => handleicon("Idea")} />
              <Game height="24" width="24" onClick={() => handleicon("Game")} />
              <Nitro
                height="24"
                width="24"
                onClick={() => handleicon("Nitro")}
              />
              <Joystick
                height="24"
                width="24"
                onClick={() => handleicon("Joystick")}
              />
              <NFT height="24" width="24" onClick={() => handleicon("NFT")} />
              <Reload
                height="24"
                width="24"
                onClick={() => handleicon("Reload")}
              />
              <Search
                height="24"
                width="24"
                onClick={() => handleicon("Search")}
              />
            </div>
          )}
        </>
      )}
      <div className="info-content">
        <div className={type == "play" ? "cell-play" : ""}>
          {/*
return cloneElement(data, {
                  type: type,
                  setinfodiv: setinfodiv,
                  indexmain: index,
                  index: index2,
                  key: index2,
                });*/}
          <InfoDivContext.Provider
            value={{
              type,
              setinfodiv: setinfodiv ? setinfodiv : () => {},
              indexmain: index,
            }}
          >
            {children}
          </InfoDivContext.Provider>
        </div>
      </div>
      {edit && (
        <Button
          style={{ marginTop: "20px", marginBottom: "20px", width: "95%" }}
          onClick={() => {
            if (setinfodiv && index != undefined) {
              setinfodiv((info: Info) => {
                const data = [...info];

                data[index].content.push({
                  header: "???",
                  text: "???",
                  content: [],
                });

                if (typemain != "monet") {
                  axios.post(`${import.meta.env.VITE_API_URL}/info/save`, {
                    initData: launchParams.initDataRaw,
                    type: typemain,
                    data: data,
                  });
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
          ADD
        </Button>
      )}
    </div>
  );
};

export default InfoDiv;
