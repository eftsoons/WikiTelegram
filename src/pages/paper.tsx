import { type Navigator, Navigate, useParams } from "react-router-dom";
import { BackButton } from "../scripts";

import { motion } from "framer-motion";
import {
  AuthorBlock,
  ButtonGroupTile,
  ButtonTile,
  Citate,
  FireBlock,
  Icon,
  NormalBlock,
} from "../components";
import { Info } from "../type";
import IBlock from "../components/iandatrBlock";
import { Fire } from "../svg";
import { useEffect, useState } from "react";
import axios from "axios";

export default ({
  reactNavigator,
  editor,
}: {
  reactNavigator: Navigator;
  editor: boolean;
}) => {
  const { index, indexmain, typepage } = useParams();

  if (!index || !indexmain || !typepage) {
    return <Navigate to="/" />;
  }

  const [infodiv, setinfodiv] = useState<Info>([]);

  BackButton(reactNavigator);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("");

      //setinfodiv(response.data);
    }

    fetchData();
  }, []);

  console.log(infodiv[Number(indexmain)]);

  return (
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={index}
    >
      {infodiv[Number(indexmain)]
        ? infodiv[Number(indexmain)].content[Number(index)].content.map(
            (data, index2) => {
              return data.type == "normal" ? (
                <NormalBlock
                  contentmain={data.content}
                  editor={editor ? editor : false}
                  setinfodiv={setinfodiv}
                  indexmain={Number(indexmain)}
                  indexmain2={Number(index)}
                  indexmain3={index2}
                />
              ) : data.type == "i" || data.type == "attetion" ? (
                <IBlock
                  setinfodiv={setinfodiv}
                  indexmain={Number(indexmain)}
                  indexmain2={Number(index)}
                  indexmain3={index2}
                  editor={editor}
                  title={data.title}
                  style={
                    data.type == "attetion"
                      ? { backgroundColor: "rgba(247, 94, 37, 0.2)" }
                      : undefined
                  }
                >
                  {data.text}
                </IBlock>
              ) : data.type == "citate" ? (
                <Citate
                  setinfodiv={setinfodiv}
                  indexmain={Number(indexmain)}
                  indexmain2={Number(index)}
                  indexmain3={index2}
                  editor={editor}
                  author={data.author}
                >
                  {data.text}
                </Citate>
              ) : data.type == "author" ? (
                <AuthorBlock
                  setinfodiv={setinfodiv}
                  indexmain={Number(indexmain)}
                  indexmain2={Number(index)}
                  indexmain3={index2}
                  editor={editor}
                >
                  {data.author}
                </AuthorBlock>
              ) : (
                <FireBlock
                  editor={editor ? editor : false}
                  setinfodiv={setinfodiv}
                  indexmain={Number(indexmain)}
                  indexmain2={Number(index)}
                  indexmain3={index2}
                  content={data.content}
                >
                  {data.title}
                </FireBlock>
              );
            }
          )
        : "Ошибка"}
      {infodiv[Number(indexmain)] && editor && (
        <ButtonGroupTile style={{ marginTop: "20px" }}>
          <ButtonTile
            onClick={() =>
              setinfodiv((info: Info) => {
                const data = [...info];

                data[Number(indexmain)].content[Number(index)].content.push({
                  type: "normal",
                  content: [],
                });

                return data;
              })
            }
          >
            {Icon("Block")}
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setinfodiv((info: Info) => {
                const data = [...info];

                data[Number(indexmain)].content[Number(index)].content.push({
                  type: "i",
                  title: "???",
                  text: "???",
                });

                return data;
              })
            }
          >
            {Icon("info")}
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setinfodiv((info: Info) => {
                const data = [...info];

                data[Number(indexmain)].content[Number(index)].content.push({
                  type: "attetion",
                  title: "???",
                  text: "???",
                });

                return data;
              })
            }
          >
            {Icon("Attern")}
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setinfodiv((info: Info) => {
                const data = [...info];

                data[Number(indexmain)].content[Number(index)].content.push({
                  type: "fire",
                  title: "???",
                  content: [],
                });

                return data;
              })
            }
          >
            <Fire height="16px" width="16px" />
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setinfodiv((info: Info) => {
                const data = [...info];

                data[Number(indexmain)].content[Number(index)].content.push({
                  type: "citate",
                  author: "???",
                  text: "???",
                });

                return data;
              })
            }
          >
            {Icon("Citate")}
          </ButtonTile>
          <ButtonTile
            onClick={() =>
              setinfodiv((info: Info) => {
                const data = [...info];

                data[Number(indexmain)].content[Number(index)].content.push({
                  type: "author",
                  author: "@???",
                });

                return data;
              })
            }
          >
            {Icon("Email")}
          </ButtonTile>
        </ButtonGroupTile>
      )}
    </motion.div>
  );
};
