import { motion } from "framer-motion";
import { type Navigator } from "react-router-dom";
import { BackButton } from "../scripts";
import {
  Banner,
  Border,
  Button,
  ButtonGroup,
  Cell,
  InfoDiv,
} from "../components";
import { useState } from "react";
import { Whatis } from "../assets/img";

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  const [buttonactive, setbuttonactive] = useState(0);

  BackButton(reactNavigator);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="main"
    >
      <Banner
        backgroundColor="#0098EA"
        description={
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              Подробнее о блокчейне
            </span>
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            height: "100%",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Montserrat",
              fontWeight: "700",
              lineHeight: "37px",
              letterSpacing: "0.02rem",
              flexDirection: "column",
              fontSize: "30px",
            }}
          >
            <span style={{}}>THE OPEN</span>
            <span>NETWORK</span>
          </span>
        </div>
      </Banner>
      <ButtonGroup active={buttonactive} setbuttonactive={setbuttonactive}>
        <Button>Купить</Button>
        <Button>Кошельки</Button>
        <Button>DeFi</Button>
        <Button>NFT</Button>
        <Button>Стейкинг</Button>
        <Button>Обозреватель</Button>
      </ButtonGroup>
      {buttonactive == 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InfoDiv text="P2P торговля">
            <Cell
              before={Whatis}
              header="CryptoBot"
              text="Telegram бот с P2P для покупки криптовалюты без KYC"
              after="TOP"
            />
            <Border />
            <Cell
              before={Whatis}
              header="Розыгрыши партнёров"
              text="Совсем скоро..."
            />
            <Border />
            <Cell
              before={Whatis}
              header="Розыгрыши партнёров"
              text="Совсем скоро..."
            />
            <Border />
            <Cell
              before={Whatis}
              header="Розыгрыши партнёров"
              text="Совсем скоро..."
            />
          </InfoDiv>
          <InfoDiv text="CEX Биржи">
            <Cell
              before={Whatis}
              header="Розыгрыши партнёров"
              text="Совсем скоро..."
            />
            <Border />
            <Cell
              before={Whatis}
              header="Розыгрыши партнёров"
              text="Совсем скоро..."
            />
            <Border />
            <Cell
              before={Whatis}
              header="Розыгрыши партнёров"
              text="Совсем скоро..."
            />
            <Border />
            <Cell
              before={Whatis}
              header="Розыгрыши партнёров"
              text="Совсем скоро..."
            />
          </InfoDiv>
        </motion.div>
      ) : (
        ""
      )}
    </motion.div>
  );
};
