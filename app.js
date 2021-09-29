process.env["NTBA_FIX_319"] = 1;
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const sequelize = require('./models/database');
const helper = require('./helper.js');

const User = require('./models/user');
const Admin = require('./models/admin');

const bot = new TelegramBot(process.env.TOKEN, {
});

bot.setWebHook(process.env.URL, {
  certificate: process.env.CRT, // Path to your crt.pem
});

sequelize.sync();



bot.on('message', async msg => {
  if(helper.getCmd(msg) === '/start') {
    const user = await User.findByPk(helper.getChatId(msg))

    if(!user) {
      User.create({
        id: helper.getChatId(msg),
        name: helper.getFirstName(msg),
        surname: helper.getLastName(msg)
      })
    }
    
    const caption = `Привет ${helper.getFirstName(msg)}. Добро пожаловать в Solid Academy`;

    bot.sendMessage(helper.getChatId(msg), caption);
  }
  else if (helper.getCmd(msg) === '/admin') {
    const admin = await Admin.findByPk(helper.getChatId(msg));

    if(!admin) {
      Admin.create({
        id: helper.getChatId(msg),
        name: helper.getFirstName(msg),
        surname: helper.getLastName(msg)
      })
    }
    
    const caption = `Привет ${helper.getFirstName(msg)}. Ты зашел как админ`;

    bot.sendMessage(helper.getChatId(msg), caption);
  }
  else {
    const admin = await Admin.findByPk(helper.getChatId(msg));

    if(admin) {
      const users = await User.findAll();
      
      if (msg.text) {
        users.forEach(({dataValues}) => {
          const { id } = dataValues;
          bot.sendMessage(id, helper.getCmd(msg));
        });
      }
      else if (msg.document) {
        users.forEach(({dataValues}) => {
          const { id } = dataValues;
          bot.sendDocument(id, helper.getDocumentId(msg));
        });
      }
      else if (msg.photo) {
        users.forEach(({dataValues}) => {
          const { id } = dataValues;
          bot.sendPhoto(id, helper.getPhotoId(msg));
        });
      }
      else if (msg.location) {
        users.forEach(({dataValues}) => {
          const { id } = dataValues;
          bot.sendLocation(id, msg.location.latitude, msg.location.longitude);
        });
      }
      else if (msg.contact) {
        users.forEach(({dataValues}) => {
          const { id } = dataValues;
          bot.sendContact(id, msg.contact.phone_number, msg.contact.first_name);
        });
      }
    }
    else {
      // do nothing
    }

  }

  console.log(msg);

});



