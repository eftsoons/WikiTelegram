import { useState } from "react";
import { ButtonGroupTile, ButtonTile, Icon } from ".";
import { Info } from "../type";

export default ({
  setinfodiv,
  indexmain,
  indexmain2,
  indexmain3,
  editor,
  children,
  author,
}: {
  setinfodiv: Function;
  indexmain: number;
  indexmain2: number;
  indexmain3: number;
  editor: boolean;
  children: string;
  author: string;
}) => {
  const [authorelement, setauthorelement] = useState(author);
  const [edit, setedit] = useState(false);
  const [text, settext] = useState(children);

  return (
    <div
      className="citate-block"
      style={{ border: edit ? "1px solid rgba(255,255,255,1)" : "" }}
    >
      {Icon("Citate", "1", {
        opacity: "0.6",
        marginTop: "10px",
        alignItems: "start !important",
        marginBottom: "5px",
        width: "95%",
        display: "flex",
        justifyContent: "start",
      })}
      {edit ? (
        <textarea
          className="citate-block-text-input"
          defaultValue={text}
          onChange={(e) => {
            e.target.style.height = e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;

            settext(e.target.value);
          }}
        />
      ) : (
        <div className="citate-block-text">{children}</div>
      )}
      <div className="citate-block-author">
        {edit ? (
          <input
            className="citate-block-author-input"
            defaultValue={authorelement}
            onChange={(e) => {
              setauthorelement(e.target.value);
            }}
          />
        ) : (
          <span className="citate-block-author-text">{author}</span>
        )}
        {Icon("Citate", "1", {
          transform: "rotate(180deg)",
          opacity: "0.6",
          marginRight: "10px",
          marginBottom: "5px",
        })}
      </div>
      {edit && editor ? (
        <ButtonGroupTile style={{ background: "none" }}>
          <ButtonTile
            onClick={() => {
              setedit(false);
              setinfodiv((info: Info) => {
                const data = [...info];

                if (
                  data[indexmain].content[indexmain2].content[indexmain3]
                    .type == "citate"
                ) {
                  data[indexmain].content[indexmain2].content[
                    indexmain3
                  ].author = authorelement;
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
