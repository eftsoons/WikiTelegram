import { useState } from "react";
import { ButtonGroupTile, ButtonTile } from ".";
import { Info } from "../type";

export default ({
  children,
  title,
  editor,
  setinfodiv,
  indexmain,
  indexmain2,
  indexmain3,
}: {
  children: string;
  title: string;
  editor: boolean;
  setinfodiv: Function;
  indexmain: number;
  indexmain2: number;
  indexmain3: number;
}) => {
  const [edit, setedit] = useState(false);
  const [titleelement, settitleelement] = useState(title);
  const [text, settext] = useState(children);

  return (
    <div className="i-block">
      {edit && editor ? (
        <>
          <div style={{ display: "flex", width: "95%" }}>
            {"Симвл"}
            <input
              className="i-block-title-input"
              defaultValue={titleelement}
              onChange={(e) => {
                settitleelement(e.target.value);
              }}
            />
          </div>
          <textarea
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
          <div style={{ display: "flex", width: "95%" }}>
            {"Симвл"}
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
              setinfodiv((info: Info) => {
                const data = [...info];

                if (
                  data[indexmain].content[indexmain2].content[indexmain3]
                    .type == "i"
                ) {
                  data[indexmain].content[indexmain2].content[
                    indexmain3
                  ].title = titleelement;
                  data[indexmain].content[indexmain2].content[indexmain3].text =
                    text;
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
