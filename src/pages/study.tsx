import { motion } from "framer-motion";

import { Border, InfoDiv } from "../components";

import { type Navigator } from "react-router-dom";
import { Chain } from "../svg";
import { Cell } from "../components/";

import { Nitro, Whatis, Xp } from "../assets/img";

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  const infodiv = [
    {
      name: "Курс. Блокчейн основы",
      icon: <Chain />,
      content: [
        {
          before: Nitro,
          header: "Что такое блокчейн",
          text: "Что из себя представляет блокчейн и для чего он нужен",
          nextclick: "settings",
        },
        {
          before: Nitro,
          header: "Что такое блокчейн",
          text: "Что из себя представляет блокчейн и для чего он нужен",
          nextclick: "settings123",
        },
      ],
    },
  ];

  return (
    <motion.div
      className="main study"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {infodiv.map((datamain, index) => (
        <InfoDiv key={index} text={datamain.name} icon={datamain.icon}>
          {datamain.content.map((data, index) => (
            <div key={index}>
              <Cell
                before={
                  <img
                    style={{ height: "64px", width: "64px" }}
                    src={data.before}
                  />
                }
                header={data.header}
                text={data.text}
                onClick={() => {
                  reactNavigator.push(`/study/${data.nextclick}`);
                }}
              />
              {index != datamain.content.length - 1 && <Border />}
            </div>
          ))}
        </InfoDiv>
      ))}
    </motion.div>
  );
};

/*<InfoDiv text="Курс. Блокчейн основы" icon={<Chain />}>
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
</InfoDiv>*/
