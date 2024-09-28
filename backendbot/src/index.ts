import "./server";

import dotenv from "dotenv";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";

const token = process.env.TOKENBOT!;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatid = msg.chat.id;

  bot.sendMessage(chatid, "Стартуем! Wiki-telegram", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Запускаем", web_app: { url: "https://google.com" } }],
      ],
    },
  });
});
