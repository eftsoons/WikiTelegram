import { type Navigator, Navigate, useParams } from "react-router-dom";
import { BackButton } from "../scripts";

import { motion } from "framer-motion";
import { Citate, IBlock, NormalBlock } from "../components";
import { Info } from "../type";

export default ({
  reactNavigator,
  infodiv,
}: {
  reactNavigator: Navigator;
  infodiv: Info;
}) => {
  const { index, type, indexmain } = useParams();

  if (!index || !type || !indexmain) {
    return <Navigate to="/" />;
  }

  BackButton(reactNavigator);

  return (
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {infodiv[Number(indexmain)].content[Number(index)].content.map(
        (data, index) => {
          switch (data.type) {
            case "normal":
              return (
                <NormalBlock
                  title={data.title ? data.title : "???"}
                  key={index}
                >
                  {data.text}
                </NormalBlock>
              );
            case "citate":
              return (
                <Citate key={index} author={data.author ? data.author : "???"}>
                  asd
                </Citate>
              );
            default:
              return (
                <IBlock key={index} title={data.title ? data.title : "???"}>
                  {data.text}
                </IBlock>
              );
          }
        }
      )}
    </motion.div>
  );
};
