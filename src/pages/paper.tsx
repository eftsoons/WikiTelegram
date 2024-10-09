import { type Navigator, Navigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import {
  AuthorBlock,
  ButtonGroupTile,
  ButtonTile,
  Citate,
  FireBlock,
  Icon,
  NormalBlock,
  PlayBlock,
} from "../components";
import { ContentPage } from "../type";
import IBlock from "../components/iandatrBlock";
import { Fire, Game } from "../svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { Wait } from ".";
import { BackButton } from "../scripts";

const Paper = ({
  reactNavigator,
  editor,
}: {
  reactNavigator: Navigator;
  editor: boolean;
}) => {
  const { index, indexmain, typepage, buttonid, idmonet } = useParams();

  if (!index || !indexmain || !typepage) {
    return <Navigate to="/" />;
  }

  const [infodiv, setinfodiv] = useState<ContentPage>();

  const launchParams = retrieveLaunchParams();

  BackButton(reactNavigator);

  useEffect(() => {
    async function fetchData() {
      if (typepage != "monet") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/paper`,
          {
            initData: launchParams.initDataRaw,
            type: typepage,
            index: indexmain,
            index2: index,
            buttonid: buttonid,
          }
        );

        setinfodiv(response.data);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/monet`,
          {
            initData: launchParams.initDataRaw,
            type: typepage,
            index: idmonet,
          }
        );

        if (buttonid && indexmain && index) {
          setinfodiv(
            response.data.button[buttonid].content[indexmain].content[index]
              .content
          );
        }
      }
    }

    fetchData();
  }, []);

  /*useEffect(() => {
    const hanldebackbutton = async () => {
      reactNavigator.go(-1);
    };

    backButton.show();
    backButton.on("click", hanldebackbutton);

    return () => backButton.off("click", hanldebackbutton);
  }, []);*/

  useEffect(() => {
    if (editor && infodiv) {
      if (typepage != "monet") {
        axios.post(`${import.meta.env.VITE_API_URL}/paper/save`, {
          initData: launchParams.initDataRaw,
          type: typepage,
          index: indexmain,
          index2: index,
          data: infodiv,
        });
      } else {
        axios.post(`${import.meta.env.VITE_API_URL}/monet/info/page/save`, {
          initData: launchParams.initDataRaw,
          indexmain: indexmain,
          monetindex: idmonet,
          buttonid: buttonid,
          data: infodiv,
          index: index,
        });
      }
    }
  }, [infodiv]);

  const handleaddblock = (
    type: "normal" | "citate" | "author" | "i" | "attetion" | "fire" | "play"
  ) => {
    setinfodiv((info) => {
      if (info) {
        const data = [...info];

        switch (type) {
          case "normal":
            data.push({
              type: "normal",
              content: [],
            });

            break;
          case "citate":
            data.push({
              type: "citate",
              author: "???",
              text: "???",
            });
            break;
          case "author":
            data.push({
              type: "author",
              author: "@???",
            });
            break;
          case "i":
            data.push({
              type: "i",
              title: "???",
              text: "???",
            });

            break;
          case "attetion":
            data.push({
              type: "attetion",
              title: "???",
              text: "???",
            });
            break;
          case "fire":
            data.push({
              type: "fire",
              title: "???",
              content: [],
            });
            break;
          case "play":
            data.push({
              type: "play",
              title: "???",
              text: "???",
              website: "???",
              website2: "???",
              websitetelegram: "???",
              photo: [{ photo: undefined, click: 0 }],
            });
            break;
        }

        return data;
      }
    });
  };

  return infodiv ? (
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={index}
    >
      {infodiv.map((data, index2) => {
        return data.type == "normal" ? (
          <NormalBlock
            key={index2}
            contentmain={data.content}
            editor={editor ? editor : false}
            setinfodiv={setinfodiv}
            indexmain={index2}
          />
        ) : data.type == "i" || data.type == "attetion" ? (
          <IBlock
            key={index2}
            setinfodiv={setinfodiv}
            indexmain={index2}
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
            key={index2}
            setinfodiv={setinfodiv}
            indexmain={index2}
            editor={editor}
            author={data.author}
          >
            {data.text}
          </Citate>
        ) : data.type == "author" ? (
          <AuthorBlock
            key={index2}
            setinfodiv={setinfodiv}
            indexmain={index2}
            editor={editor}
          >
            {data.author}
          </AuthorBlock>
        ) : data.type == "fire" ? (
          <FireBlock
            key={index2}
            editor={editor}
            setinfodiv={setinfodiv}
            indexmain={index2}
            content={data.content}
          >
            {data.title}
          </FireBlock>
        ) : (
          <PlayBlock
            key={index2}
            title={data.title}
            text={data.text}
            website={data.website}
            website2={data.website2}
            websitetelegram={data.websitetelegram}
            setinfodiv={setinfodiv}
            indexmain={index2}
            editor={editor}
          >
            {data.photo}
          </PlayBlock>
        );
      })}
      {editor && (
        <ButtonGroupTile style={{ marginTop: "20px" }}>
          <ButtonTile onClick={() => handleaddblock("normal")}>
            {Icon("Block", "1.5")}
          </ButtonTile>
          <ButtonTile onClick={() => handleaddblock("i")}>
            {Icon("info", "1.5")}
          </ButtonTile>
          <ButtonTile onClick={() => handleaddblock("attetion")}>
            {Icon("Attern", "1.5")}
          </ButtonTile>
          <ButtonTile onClick={() => handleaddblock("fire")}>
            <Fire height="16px" width="16px" />
          </ButtonTile>
          <ButtonTile onClick={() => handleaddblock("citate")}>
            {Icon("Citate", "1.5")}
          </ButtonTile>
          <ButtonTile onClick={() => handleaddblock("author")}>
            {Icon("Email", "1.5")}
          </ButtonTile>
          <ButtonTile onClick={() => handleaddblock("play")}>
            <Game height="16px" width="16px" />
          </ButtonTile>
        </ButtonGroupTile>
      )}
    </motion.div>
  ) : (
    <Wait />
  );
};

export default Paper;
