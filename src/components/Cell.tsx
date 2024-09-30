import { useEffect, useRef, useState } from "react";

import { Chain } from "../svg";
import Border from "./Border";

import { type Info } from "../type";

export default ({
  before,
  header,
  text,
  disabled,
  after,
  onClick,
  type,
  setinfodiv,
  indexmain,
  index,
}: {
  before: string | undefined;
  header: string;
  text: string;
  disabled?: boolean;
  after?: string;
  onClick?: () => void;
  type?: "normal" | "play" | "big";
  setinfodiv?: Function;
  indexmain?: number;
  index?: number;
}) => {
  const menusettings = useRef<HTMLDivElement | null>(null);
  const menusettingsstatus = useRef<HTMLDivElement | null>(null);
  const buttonopensettings = useRef<HTMLDivElement | null>(null);

  const [settings, setsettings] = useState<boolean>(false);
  const [settingsstatus, setsettingsstatus] = useState<boolean>(false);
  const [edit, setedit] = useState<boolean>(false);
  const [valuetext, setvaluetext] = useState<string>(text);
  const [valueheader, setvalueheader] = useState<string>(header);
  const [valuephoto, setvaluephoto] = useState<string | undefined>(before);

  const handleonchaneimg = (
    e: React.ChangeEvent<HTMLInputElement>,
    indexmain: number | undefined,
    index: number | undefined
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (setinfodiv && indexmain != undefined && index != undefined) {
        setvaluephoto(URL.createObjectURL(file));
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

  console.log(before);

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
      {!edit ? (
        before ? (
          <img
            style={{
              height: "84px",
              width: "100%",
              borderRadius: "8px",
            }}
            src={before}
            onClick={(e) => handledeletedimg(e, indexmain, index)}
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
              backgroundImage: `url("notimg.png")`,
            }}
          />
        )
      ) : valuephoto ? (
        <img
          style={{
            height: "84px",
            width: "100%",
            borderRadius: "8px",
          }}
          src={valuephoto}
          onClick={(e) => handledeletedimg(e, indexmain, index)}
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
            backgroundImage: `url("notimg.png")`,
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
                type="file"
                accept="image/*"
                style={{
                  display: "none",
                }}
                onChange={(e) => handleonchaneimg(e, indexmain, index)}
              />
            </div>
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
          justifyContent: type == "big" ? "" : "center",
        }}
      >
        <div className="cell-header">
          <div className="cell-header-span">
            {!edit ? (
              header
            ) : (
              <input
                onChange={(e) => {
                  setvalueheader(e.target.value);
                }}
                value={valueheader}
              />
            )}
            {setinfodiv && (
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
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          setinfodiv &&
                          (index || index == 0) &&
                          (indexmain || indexmain == 0)
                        ) {
                          setinfodiv((info: Info) => {
                            const data = [...info];
                            data[indexmain].content.splice(index, 1);

                            return data;
                          });
                        }
                      }}
                    >
                      Deleted
                    </div>
                    <Border type="center" />
                    <div
                      className="cell-settings-items"
                      onClick={() => setedit(!edit)}
                    >
                      Edit
                    </div>
                    <div
                      className="cell-settings-items"
                      onClick={() => {
                        setsettings(false);
                        setsettingsstatus(true);
                      }}
                    >
                      Status
                    </div>
                    <div
                      className="cell-settings-items"
                      onClick={() => {
                        if (
                          setinfodiv &&
                          indexmain != undefined &&
                          index != undefined
                        ) {
                          setinfodiv((info: Info) => {
                            const data = [...info];

                            data[indexmain].content[index].header = valueheader;
                            data[indexmain].content[index].text = valuetext;
                            data[indexmain].content[index].before = valuephoto;

                            return data;
                          });
                        }
                      }}
                    >
                      Save
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
                      onClick={() =>
                        setinfodiv((info: Info) => {
                          const data = [...info];
                          data[Number(indexmain)].content[Number(index)].after =
                            "TOP";
                          return data;
                        })
                      }
                    >
                      TOP
                    </div>
                    <div
                      className="cell-settings-items"
                      onClick={() =>
                        setinfodiv((info: Info) => {
                          const data = [...info];
                          data[Number(indexmain)].content[Number(index)].after =
                            "OFCL";
                          return data;
                        })
                      }
                    >
                      OFCL
                    </div>
                    <div
                      className="cell-settings-items"
                      onClick={() =>
                        setinfodiv((info: Info) => {
                          const data = [...info];
                          data[Number(indexmain)].content[Number(index)].after =
                            "NEW";
                          return data;
                        })
                      }
                    >
                      NEW
                    </div>
                    <div
                      className="cell-settings-items"
                      onClick={() =>
                        setinfodiv((info: Info) => {
                          const data = [...info];
                          data[Number(indexmain)].content[Number(index)].after =
                            undefined;
                          return data;
                        })
                      }
                    >
                      Deleted
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {after ? (
            <div
              className="call-header-after"
              style={{
                color: after == "TOP" ? "red" : "blue",
                borderColor: after == "TOP" ? "red" : "blue",
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
            <div
              style={{
                height: "15px",
                width: "15px",
                marginRight: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
              <Chain height="18" width="18" />
            </div>
          )}
        </div>
        {!edit ? (
          <div className="cell-span">{text}</div>
        ) : (
          <input
            onChange={(e) => setvaluetext(e.target.value)}
            value={valuetext}
          />
        )}
      </div>
    </div>
  );
};
