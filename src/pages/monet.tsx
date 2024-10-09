import { motion } from "framer-motion";
import { Navigate, useParams, type Navigator } from "react-router-dom";
import {
  Banner,
  Border,
  Button,
  ButtonGroup,
  Cell,
  Icon,
  InfoDiv,
} from "../components";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { initUtils, retrieveLaunchParams } from "@telegram-apps/sdk";
import type { MonetType } from "../type";
import { Wait } from ".";
import { BackButton } from "../scripts";

const Monet = ({
  reactNavigator,
  editor,
}: {
  reactNavigator: Navigator;
  editor: boolean;
}) => {
  const { index } = useParams();

  if (!index) {
    return <Navigate to="/" />;
  }

  const [infomonet, setinfomonet] = useState<MonetType>();
  const [buttonactive, setbuttonactive] = useState(0);
  const [settingsbanner, setsettingsbanner] = useState(false);

  const utils = initUtils();

  const launchParams = retrieveLaunchParams();

  BackButton(reactNavigator);

  useEffect(() => {
    async function fetchData() {
      const response = (await axios.post(
        `${import.meta.env.VITE_API_URL}/monet`,
        {
          initData: launchParams.initDataRaw,
          index: index,
        }
      )) as { data: MonetType | "" };

      if (response.data != "") {
        setinfomonet(response.data);
      } else {
        setinfomonet({ website: "", img: null, button: [] });
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

    return () => {
      backButton.off("click", hanldebackbutton);

      if (editor) {
        popup
          .open({
            title: "Telegram",
            message: "«Сохранить изменения»",
            buttons: [
              { id: "yes", type: "default", text: "Да" },
              { id: "no", type: "destructive", text: "Нет" },
            ],
          })
          .then((buttonId) => {
            if (buttonId == "yes") {
              console.log(infomonet);
              axios.post(`${import.meta.env.VITE_API_URL}/monet/save`, {
                initData: launchParams.initDataRaw,
                data: infomonet,
                index: index,
              });
            }
          });
      }
    };
  }, []);*/

  useEffect(() => {
    if (editor && infomonet) {
      axios.post(`${import.meta.env.VITE_API_URL}/monet/save`, {
        initData: launchParams.initDataRaw,
        data: infomonet,
        index: index,
      });
    }
  }, [infomonet]);

  const handleaddblock = (type: "big" | "play" | "normal") => {
    setinfomonet((info) => {
      if (info) {
        const data = [...info.button];
        data[buttonactive].content.push({
          name: "???",
          type: type,
          icon: null,
          info: "",
          content: [
            {
              header: "???",
              text: "???",
              content: [],
            },
          ],
        });

        return { ...info, button: data };
      }
    });
  };

  const handleonchaneimg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && launchParams.initDataRaw) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("photo", file);
      formData.append("initData", launchParams.initDataRaw);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setinfomonet((info) => {
        if (info) {
          return {
            ...info,
            img: `${import.meta.env.VITE_API_URL}/img?filename=${
              response.data
            }`,
          };
        }
      });
    }
  };

  const handleInputButton = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setinfomonet((info) => {
      if (info) {
        const data = [...info.button];

        if (e.target.value != "") {
          data[index].title = e.target.value;
        } else {
          data.splice(index, 1);
        }

        return { ...info, button: data };
      }
    });
  };

  return infomonet ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="main"
    >
      <Banner
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
        backgroundImage={!infomonet.img ? "notimg.png" : infomonet.img}
        style={{
          cursor: "pointer",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
          backgroundSize: "100%",
        }}
        onClick={() => {
          if (editor) {
            setsettingsbanner(!settingsbanner);
          } else {
            utils.openTelegramLink(infomonet.website);
          }
        }}
      />
      {settingsbanner && editor && (
        <div className="banner-settings">
          <div>
            <span>Ссылка: </span>
            <input
              name="banner-settings-input"
              className="banner-settings-input"
              defaultValue={infomonet.website}
              onChange={(e) => {
                setinfomonet((info) => {
                  if (info) {
                    return { ...info, website: e.target.value };
                  }
                });
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                const target = e.currentTarget;
                if (target.children.length > 0) {
                  const child = target.children[0];
                  if (child instanceof HTMLElement) {
                    child.click();
                  }
                }
              }}
            >
              Загрузить
              <input
                className="banner-settings-file"
                onChange={handleonchaneimg}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
              />
            </Button>
            <Button
              onClick={() =>
                setinfomonet((info) => {
                  if (info) {
                    return { ...info, img: null };
                  }
                })
              }
            >
              Удалить
            </Button>
          </div>
        </div>
      )}
      <ButtonGroup
        editor={editor}
        active={buttonactive}
        setbuttonactive={setbuttonactive}
        editoronClick={() => {
          setinfomonet((info) => {
            if (info) {
              const data = [...info.button];

              data.push({ title: "button", content: [] });

              return { ...info, button: data };
            }
          });
        }}
      >
        {infomonet.button.map((data, index) => {
          return (
            <Button key={index}>
              {editor ? (
                <input
                  name={`${index}`}
                  key={index}
                  className="button-input"
                  defaultValue={data.title}
                  onChange={(e) => handleInputButton(e, index)}
                />
              ) : (
                data.title
              )}
            </Button>
          );
        })}
      </ButtonGroup>
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
        {infomonet.button[buttonactive] &&
          infomonet.button[buttonactive].content.map((datamain, index2) => {
            return (
              <InfoDiv
                key={index2}
                text={datamain.name}
                icon={datamain.icon ? datamain.icon : "Chain"}
                type={datamain.type}
                typemain={"monet"}
                editor={editor}
                infodiv={infomonet.button[buttonactive].content}
                setinfodiv={(e: Function) => {
                  setinfomonet((info) => {
                    if (info) {
                      const data = [...info.button];
                      data[buttonactive].content = e(
                        infomonet.button[buttonactive].content
                      );

                      return { ...info, button: data };
                    }
                  });
                }}
                index={index2}
                buttonactive={buttonactive}
                monetindex={Number(index)}
                info={datamain.info}
              >
                {datamain.content.map((data, index3) => {
                  return (
                    <div key={index3}>
                      <Cell
                        index={index3}
                        key={index3}
                        after={data.after}
                        before={data.before}
                        header={data.header}
                        text={data.text}
                        onClick={async () => {
                          /*if (editor && response != infomonet) {
                            await popup
                              .open({
                                message: "«Сохранить изменения»",
                                buttons: [
                                  { id: "yes", type: "default", text: "Да" },
                                  {
                                    id: "no",
                                    type: "destructive",
                                    text: "Нет",
                                  },
                                ],
                              })
                              .then((buttonId) => {
                                if (buttonId == "yes") {
                                  axios.post(
                                    `${
                                      import.meta.env.VITE_API_URL
                                    }/monet/save`,
                                    {
                                      initData: launchParams.initDataRaw,
                                      data: infomonet,
                                      index: index,
                                    }
                                  );
                                }
                              });
                          }*/

                          reactNavigator.push(
                            `/page/monet/${index2}/${index3}/${buttonactive}/${index}`
                          );
                        }}
                        typemain={"monet"}
                        editor={editor}
                        buttonactive={buttonactive}
                        monetindex={Number(index)}
                      />
                      {index3 != datamain.content.length - 1 &&
                        !(datamain.type == "play") && <Border />}
                    </div>
                  );
                })}
              </InfoDiv>
            );
          })}
        {editor && infomonet.button.length > 0 && (
          <div className="addblock">
            <Button onClick={() => handleaddblock("play")}>
              {Icon("Sapp", "1.5")}
            </Button>
            <Button onClick={() => handleaddblock("normal")}>
              {Icon("Mapp", "1.5")}
            </Button>
            <Button onClick={() => handleaddblock("big")}>
              {Icon("Lapp", "1.5")}
            </Button>
          </div>
        )}
      </motion.div>
      {/*{buttonactive == 0 ? (
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
      )}*/}
    </motion.div>
  ) : (
    <Wait />
  );
};

export default Monet;
