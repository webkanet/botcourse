const TelegramApi = require("node-telegram-bot-api")

const token = '5502742671:AAHDn4YhRNe31uIpFYVARt9WHt47YoPYJPg'

const bot = new TelegramApi(token, {polling:true})

const {gameOptions, againOptions} = require('./options')
const chats = {};

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOption);
}



const start = () => {
    bot.on('message', async msg => {

        bot.setMyCommands([
            {command: '/start', description: 'Старт'},
            {command: '/info', description: 'Описание бота'},
            {command: '/game', description: 'Угадай Цифру'}
        ])
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text == '/start') {

           return  bot.sendMessage(chatId, 'Все, кто был со мной на дне, пристегните ремни, мы взлетаем')
        }

        if (text == '/info') {

            return  bot.sendMessage(chatId, 'Данный бот предоставляет прогнозы');
        }

        if (text == '/game') {
        return startGame(chatId);

        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
    })

    bot.on('callback_query', async msg=> {
        const data = msg.data;
        const chatId= msg.message.chat.id;

        if(data == '/again') {
            return startGame(chatId);
        }

        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, 'Поздравляю, ты отгадал цифру' + chats[chatId], againOption);
        }
        else {
            return bot.sendMessage(chatId, 'К сожалению, ты не отгадал, бот загадал ' + chats[chatId], againOption)
        }
    })
}

start()