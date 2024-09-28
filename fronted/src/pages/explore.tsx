import { motion } from "framer-motion";

import { type Navigator } from "react-router-dom";
import { Border, Cell, InfoDiv } from "../components";
import { Chain } from "../svg";

import { Xp } from "../assets/img";
import Explore from "../svg/explore";

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  return (
    <motion.div
      className="main explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <InfoDiv text="Иследовать" icon={<Explore />}>
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="TON"
          text="Исследовать продукты и сервисы блокчейна"
          onClick={() => reactNavigator.push("/explore/monet/ton")}
        />
        <Border />
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="NEAR"
          text="Совсем скоро..."
          disabled={true}
        />
        <Border />
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="TRON"
          text="Совсем скоро..."
          disabled={true}
        />
      </InfoDiv>
      <InfoDiv text="Приложения" icon={<Chain />}>
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="P2E Игры"
          text="Игры с финансовыми механиками, фармингом и заработком монет"
          after="NEW"
          colorafter="#F75E25"
        />
        <Border />
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="DeFi"
          text="Награды за выполнение заданий в различных сетях"
        />
        <Border />
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="Развлечения"
          text="Развлекательные сервисы, которые не дадут заскучать"
        />
      </InfoDiv>
    </motion.div>
  );
};
