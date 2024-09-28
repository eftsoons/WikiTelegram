import { motion } from "framer-motion";

import { type Navigator } from "react-router-dom";
import { Cell, InfoDiv, Banner } from "../components";
import { Chain, Pizza } from "../svg";

import { Whatis } from "../assets/img";

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  return (
    <motion.div
      className="main social"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Banner description="Горячий журнал о крипто-культуре">
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Pizza />
        </div>
        <span
          style={{
            fontFamily: "Kaushan Script",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "46px",
            lineHeight: "67px",
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          PIZZA!
        </span>
        <span
          style={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "18px",
            lineHeight: "22px",
            display: "flex",
            alignItems: "center",
            height: "70px",
          }}
        >
          MAGAZINE
        </span>
      </Banner>
      <InfoDiv text="Наши ресурсы" icon={<Chain />}>
        <Cell
          before={
            <img style={{ height: "64px", width: "64px" }} src={Whatis} />
          }
          header="XP Wiki"
          text="Ваш опыт в исследовании блокчейнов"
          after="OFCL"
          colorafter="#0098EA"
        />
      </InfoDiv>
      <InfoDiv text="Раффлы">
        <Cell
          before={
            <img style={{ height: "64px", width: "64px" }} src={Whatis} />
          }
          header="Розыгрыши партнёров"
          text="Совсем скоро..."
          disabled={true}
          onClick={() => reactNavigator.push("/settings")}
        />
      </InfoDiv>
    </motion.div>
  );
};
