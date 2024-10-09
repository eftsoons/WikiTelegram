import { CSSProperties, useState } from "react";
import { ButtonGroupTile, ButtonTile, Icon } from ".";
import { ContentPage } from "../type";

const iandatrBlock = ({
  children,
  title,
  editor,
  setinfodiv,
  indexmain,
  style,
}: {
  children: string;
  title: string;
  editor: boolean;
  setinfodiv: Function;
  indexmain: number;
  style?: CSSProperties;
}) => {
  const [edit, setedit] = useState(false);
  const [titleelement, settitleelement] = useState(title);
  const [text, settext] = useState(children);

  return (
    <div
      className="i-block"
      style={{ border: edit ? "1px solid rgba(255,255,255,1)" : "", ...style }}
    >
      {edit && editor ? (
        <>
          <div style={{ display: "flex", width: "95%", marginTop: "5px" }}>
            {style ? Icon("Attern", "1.5") : Icon("info", "1.5")}
            <input
              name="i-block-title-input"
              className="i-block-title-input"
              defaultValue={titleelement}
              onChange={(e) => {
                settitleelement(e.target.value);
              }}
            />
          </div>
          <textarea
            name="i-block-text-input"
            className="i-block-text-input"
            defaultValue={text}
            onChange={(e) => {
              e.target.style.height = e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;

              settext(e.target.value);
            }}
          />
        </>
      ) : (
        <>
          <div style={{ display: "flex", width: "95%", marginTop: "5px" }}>
            {style ? Icon("Attern", "1.5") : Icon("info", "1.5")}
            <div className="i-block-title">{title}</div>
          </div>
          <div className="i-block-text">{children}</div>
        </>
      )}
      {edit && editor ? (
        <ButtonGroupTile style={{ background: "none" }}>
          <ButtonTile
            onClick={() => {
              setedit(false);
              setinfodiv((info: ContentPage) => {
                const data = [...info];

                if (
                  data[indexmain].type == "i" ||
                  data[indexmain].type == "attetion"
                ) {
                  data[indexmain].title = titleelement;
                  data[indexmain].text = text;
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

export default iandatrBlock;
