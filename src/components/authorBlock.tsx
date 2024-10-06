import { useState } from "react";
import { ButtonTile, ButtonGroupTile } from ".";
import { ContentPage } from "../type";
import { initUtils } from "@telegram-apps/sdk";

const authorBlock = ({
  editor,
  setinfodiv,
  indexmain,
  children,
}: {
  editor: boolean;
  setinfodiv: Function;
  indexmain: number;
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
            name="author-block-username-input"
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
              setinfodiv((info: ContentPage) => {
                const data = [...info];

                if (data[indexmain].type == "author") {
                  data[indexmain].author = author;
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

export default authorBlock;
