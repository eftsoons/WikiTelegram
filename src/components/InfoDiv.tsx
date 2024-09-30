import {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Border from "./Border";
import { Chain, Champ, Course, Explore } from "../svg";
import { Info } from "../type";
import { Button } from ".";

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
  icon?: ReactNode;
  children: ReactElement[] | ReactElement;
  setinfodiv?: Function;
  index?: number;
  type?: "normal" | "play" | "big" | "monet";
  infodiv?: Info;
}) => {
  const menusettings = useRef<HTMLDivElement | null>(null);
  const menusettingsicon = useRef<HTMLDivElement | null>(null);
  const buttonopensettings = useRef<HTMLDivElement | null>(null);
  const [settings, setsettings] = useState<boolean>(false);
  const [settngsicon, setsettngsicon] = useState<boolean>(false);

  const [edit, setedit] = useState<boolean>(false);
  const [valueheader, setvalueheader] = useState<string>(text);

  const handleicon = (element: ReactNode) => {
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
      setinfodiv(
        (
          infodiv: Array<{
            name: string;
            icon: ReactNode | null;
            content: Array<{
              before: string;
              header: string;
              text: string;
              nextclick: string;
            }>;
          }>
        ) => {
          const seticon = [...infodiv];

          seticon.splice(index, 1);

          setsettings(false);

          return seticon;
        }
      );
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
          {icon ? icon : <Course />}
        </div>
      </div>
      {setinfodiv && (index || index == 0) && (
        <>
          {settings && (
            <div ref={menusettings} className="settings-menu">
              <div className="settings-items" onClick={handledeleted}>
                Delete
              </div>
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
              <Border type="center" />
              <div className="settings-items">info</div>
              <div
                className="settings-items"
                onClick={() => {
                  setsettngsicon(true);
                  setsettings(false);
                }}
              >
                icon
              </div>
              <Border type="center" />
              {!edit ? (
                <div className="settings-items" onClick={() => setedit(true)}>
                  Edit
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
                  Save
                </div>
              )}
            </div>
          )}
          {settngsicon && (
            <div ref={menusettingsicon} className="settings-menu-icon">
              <Chain
                height="24"
                width="24"
                onClick={() => handleicon(<Chain />)}
              />
              <Champ
                height="24"
                width="24"
                onClick={() => handleicon(<Champ />)}
              />
              <Course
                height="24"
                width="24"
                onClick={() => handleicon(<Course />)}
              />
              <Explore
                height="24"
                width="24"
                onClick={() => handleicon(<Explore />)}
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

                info[index].content.push({
                  header: "123",
                  text: "123",
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
