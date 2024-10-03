import { cloneElement, ReactElement, useEffect, useRef, useState } from "react";
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

import { GetIcons } from "../scripts";

import type { Icons } from "../type";

import { IconsAll } from "../scripts";

export default ({
  text,
  icon,
  children,
  setinfodiv,
  index,
  type,
  infodiv,
}: {
  text: string;
  icon: Icons;
  children: ReactElement[] | ReactElement;
  setinfodiv?: Function;
  index?: number;
  type: "normal" | "play" | "big" | "monet";
  infodiv?: Info;
  typemain: "explore" | "social" | "study";
}) => {
  const menusettings = useRef<HTMLDivElement | null>(null);
  const menusettingsicon = useRef<HTMLDivElement | null>(null);
  const buttonopensettings = useRef<HTMLDivElement | null>(null);
  const [settings, setsettings] = useState<boolean>(false);
  const [settngsicon, setsettngsicon] = useState<boolean>(false);

  const [edit, setedit] = useState<boolean>(false);
  const [valueheader, setvalueheader] = useState<string>(text);

  const handleicon = (element: IconsAll) => {
    if (setinfodiv && (index || index == 0)) {
      setinfodiv((infodiv: Info) => {
        const seticon = [...infodiv];

        seticon[index].icon = element;

        return seticon;
      });
    }
  };

  const handledeleted = () => {
    if (setinfodiv && (index || index == 0)) {
      setinfodiv((infodiv: Info) => {
        const seticon = [...infodiv];

        seticon.splice(index, 1);

        setsettings(false);

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

  const IconComponent = GetIcons(icon);

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
          <span>{text}</span>
        ) : (
          <input
            onChange={(e) => setvalueheader(e.target.value)}
            value={valueheader}
          />
        )}
        <div
          ref={buttonopensettings}
          onClick={() => {
            setsettings(!settings);

            if (settngsicon) {
              setsettings(false);
              setsettngsicon(false);
            }
          }}
        >
          <IconComponent />
        </div>
      </div>
      {setinfodiv && (index || index == 0) && (
        <>
          {settings && (
            <div ref={menusettings} className="settings-menu">
              {/*<Border type="center" />
              <div
                className="settings-items"
                onClick={() => {
                  setinfodiv((info: Info) => {
                    const data = [...info];

                    data[index].type = "play";

                    return data;
                  });
                }}
              >
                S App
              </div>
              <div
                className="settings-items"
                onClick={() => {
                  setinfodiv((info: Info) => {
                    const data = [...info];

                    data[index].type = "normal";

                    return data;
                  });
                }}
              >
                M App
              </div>
              <div
                className="settings-items"
                onClick={() => {
                  setinfodiv((info: Info) => {
                    const data = [...info];

                    data[index].type = "big";

                    return data;
                  });
                }}
              >
                L App
              </div>*/}

              <div className="settings-items">
                {Icon("info")}
                <span style={{ height: "100%", marginLeft: "10px" }}>info</span>
              </div>
              <div
                className="settings-items"
                onClick={() => {
                  setsettngsicon(true);
                  setsettings(false);
                }}
              >
                {Icon("icon")}
                <span style={{ height: "100%", marginLeft: "10px" }}>icon</span>
              </div>
              <Border type="center" />
              {!edit ? (
                <div className="settings-items" onClick={() => setedit(true)}>
                  {Icon("Edit")}
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
                      setinfodiv((info: Info) => {
                        const data = [...info];

                        data[index].name = valueheader;

                        return data;
                      });
                    }
                  }}
                >
                  {Icon("Done")}
                  <span style={{ height: "100%", marginLeft: "10px" }}>
                    Save
                  </span>
                </div>
              )}
              <Border type="center" />
              <div className="settings-items" onClick={handledeleted}>
                {Icon("Close")}
                <span style={{ height: "100%", marginLeft: "10px" }}>
                  Delete
                </span>
              </div>
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
          {Array.isArray(children)
            ? children.map((data, index2) => {
                return cloneElement(data, {
                  type: type,
                  setinfodiv: setinfodiv,
                  indexmain: index,
                  index: index2,
                  key: index2,
                });
              })
            : cloneElement(children, {
                type: type,
                setinfodiv: setinfodiv,
                indexmain: index,
                index: 0,
                key: 0,
              })}
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
