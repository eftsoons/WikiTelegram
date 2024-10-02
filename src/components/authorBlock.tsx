import { useState } from "react";
import { ButtonTile, ButtonGroupTile } from ".";
import { Info } from "../type";
import { initUtils } from "@telegram-apps/sdk";

export default ({
  editor,
  setinfodiv,
  indexmain,
  indexmain2,
  indexmain3,
  children,
}: {
  editor: boolean;
  setinfodiv: Function;
  indexmain: number;
  indexmain2: number;
  indexmain3: number;
  children: string;
}) => {
  const [edit, setedit] = useState(false);
  const [author, setauthor] = useState(children);

  const utils = initUtils();

  return (
    <div
      className="author-block"
      style={{ border: edit ? "1px solid rgba(255,255,255,1)" : "" }}
    >
      <div className="author-block-text">
        <span className="author-block-author">Автор:&nbsp;</span>
        {edit ? (
          <input
            className="author-block-username-input"
            defaultValue={author}
            onChange={(e) => {
              setauthor(e.target.value);
            }}
          />
        ) : (
          <span
            onClick={() => {
              utils.openTelegramLink(
                `https://t.me/${children.replace("@", "")}`
              );
            }}
            className="author-block-username"
          >
            {children}
          </span>
        )}
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
                    .type == "author"
                ) {
                  data[indexmain].content[indexmain2].content[
                    indexmain3
                  ].author = author;
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
