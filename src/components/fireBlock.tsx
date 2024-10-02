import { useState } from "react";
import { ButtonGroupTile, ButtonTile } from ".";
import { Info } from "../type";
import Fire from "../svg/fire";
import { initUtils } from "@telegram-apps/sdk";

const FireBlock = ({
  children,
  content,
  editor,
  setinfodiv,
  indexmain,
  indexmain2,
  indexmain3,
}: {
  children: string;
  content: Array<{ text: string }>;
  editor: boolean;
  setinfodiv: Function;
  indexmain: number;
  indexmain2: number;
  indexmain3: number;
}) => {
  const [edit, setedit] = useState(false);
  const [titleelement, settitleelement] = useState(children);
  const [contentelement, setcontentelement] = useState(content);

  const utils = initUtils();

  // экономлю стили, из-за этого они одинаковые

  return (
    <div
      className="fire-block"
      style={{ border: edit ? "1px solid rgba(255,255,255,1)" : "" }}
    >
      {edit && editor ? (
        <>
          <div
            style={{
              display: "flex",
              width: "95%",
              marginTop: "5px",
              alignItems: "center",
            }}
          >
            <Fire height="22px" width="16px" />
            <input
              className="i-block-title-input"
              defaultValue={titleelement}
              onChange={(e) => {
                settitleelement(e.target.value);
              }}
            />
          </div>
          {contentelement.map((data, index) => {
            return (
              <div className="fire-block-link">
                <div
                  style={{
                    borderRadius: "999px",
                    backgroundColor: "#ffffff",
                    opacity: "0.6",
                    height: "8px",
                    width: "8px",
                    marginRight: "5px",
                  }}
                />
                <input
                  defaultValue={data.text}
                  onChange={(e) => {
                    setcontentelement((info) => {
                      const data = [...info];

                      if (e.target.value != "") {
                        data[index].text = e.target.value;
                      } else {
                        data.splice(index, 1);
                      }

                      return data;
                    });
                  }}
                  className="fire-block-link-input"
                />
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              width: "95%",
              marginTop: "5px",
              alignItems: "center",
            }}
          >
            <Fire height="22px" width="16px" />
            <div className="i-block-title">{children}</div>
          </div>
          {content.map((data) => {
            return (
              <div className="fire-block-link">
                <div
                  style={{
                    borderRadius: "999px",
                    backgroundColor: "#ffffff",
                    opacity: "0.6",
                    height: "8px",
                    width: "8px",
                    marginRight: "5px",
                  }}
                />
                <span
                  className="fire-block-link-text"
                  onClick={() => utils.openLink(data.text)}
                >
                  {data.text}
                </span>
              </div>
            );
          })}
        </>
      )}
      {edit && editor ? (
        <ButtonGroupTile style={{ background: "none" }}>
          <ButtonTile
            onClick={() => {
              setcontentelement((info) => {
                const data = [...info];

                data.push({ text: "???" });

                return data;
              });
            }}
          >
            Add Link
          </ButtonTile>
          <ButtonTile
            onClick={() => {
              setedit(false);
              setinfodiv((info: Info) => {
                const data = [...info];

                if (
                  data[indexmain].content[indexmain2].content[indexmain3]
                    .type == "fire"
                ) {
                  data[indexmain].content[indexmain2].content[
                    indexmain3
                  ].content = contentelement;
                  data[indexmain].content[indexmain2].content[
                    indexmain3
                  ].title = titleelement;
                }

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

export default FireBlock;
