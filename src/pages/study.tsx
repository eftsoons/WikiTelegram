import { motion } from "framer-motion";

import { Border, InfoDiv } from "../components";

import { type Navigator } from "react-router-dom";
import { Chain } from "../svg";
import { Cell } from "../components/";

import { Nitro, Whatis, Xp } from "../assets/img";

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  return (
    <motion.div
      className="main study"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <InfoDiv text="Курс. Блокчейн основы" icon={<Chain />}>
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Nitro} />}
          header="Что такое блокчейн"
          text="Что из себя представляет блокчейн и для чего он нужен"
          onClick={() => reactNavigator.push("/settings")}
        />
        <Border />
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="Proof of Work"
          text="Какую работу доказывают майнеры и как работает блокчейн"
        />
        <Border />
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="Proof of Stake"
          text="Разберёмся в принципе работы PoS (валидация, стейкинг)"
        />
        <Border />
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="CEX, DEX, P2P и мосты"
          text="Где можно безопасно купить и обменять криптовалюту"
        />
      </InfoDiv>
      <InfoDiv text="Курс. Безопасность" icon={<Chain />}>
        <Cell
          before={
            <img style={{ height: "64px", width: "64px" }} src={Whatis} />
          }
          header="Основы"
          text="Важные правила блокчейн безопасности"
        />
        <Border />
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Nitro} />}
          header="Что такое блокчейн"
          text="Что из себя представляет блокчейн и для чего он нужен"
        />
        <Border />
        <Cell
          before={<img style={{ height: "64px", width: "64px" }} src={Xp} />}
          header="Виды скама"
          text="Популярные методы обмана и как на них не попасться"
        />
      </InfoDiv>
    </motion.div>
  );
};
