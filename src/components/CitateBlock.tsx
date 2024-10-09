import { useState } from "react";
import { ButtonGroupTile, ButtonTile, Icon } from ".";
import { ContentPage } from "../type";

const CitateBlock = ({
  setinfodiv,
  indexmain,
  editor,
  children,
  author,
}: {
  setinfodiv: Function;
  indexmain: number;
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
      {Icon("Citate", "1.5", {
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
          name="citate-block-text-input"
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
            name="citate-block-author-input"
            className="citate-block-author-input"
            defaultValue={authorelement}
            onChange={(e) => {
              setauthorelement(e.target.value);
            }}
          />
        ) : (
          <span className="citate-block-author-text">{author}</span>
        )}
        {Icon("Citate", "1.5", {
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
              setinfodiv((info: ContentPage) => {
                const data = [...info];

                if (data[indexmain].type == "citate") {
                  data[indexmain].author = authorelement;
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

export default CitateBlock;
