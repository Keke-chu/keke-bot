// 걍 디스코드js 불러오는 코드
const Discord = require('discord.js');
const bot = new Discord.Client();

// 노래 불러오는 파트
const {Manager} = require('@lavacord/discord.js');
const nodes = {
    id: '1',
    host: 'localhost',
    port: 2333,
    password: "pw"
};
const mainPlayer = new Manager(bot, nodes);

// 에러확인 해줌
mainPlayer.on('error', err => {
    console.error(err);
});

//호출(준비되면 라바링크 호출)
bot.on('ready', async () => {
    await mainPlayer.connect();
    console.log("ready!");
});

//변수들 담아놓는 곳
const queue = new Map();

//라바링크 기능들
const fetch = require('node-fetch');
const {URLSearchParams} = require('url');

const getSongs = async (search) => {
    const node = mainPlayer.idealNodes[0];

    const params = new URLSearchParams();
    params.append("identifier", search);

    return fetch('http://${node.host}:${node.port}/loadtracks?${params}', {headers: {Authorization: node.password}})
    .then(res  => res.json())
    .then(data => data.tracks)
    .catch(err => {
        console.error(err);
        return null;
    });
};

//디스코드.js 기능들
const fmt = (str) => {
    return '**:books: ${str}**';
}

const command = {
    help: async (msg, args) => {
        msg.channel.send(fmt("케케.."));
    }
}

//메세지 받기
bot.on('message', async => {
    if (msg.author.bot) return;

    if (!msg.guild) return;
    
    const msgArray = msg.content.spilt(" ");
    const prefix = ">";

    if (!msgArray[0].startsWith(prefix)) return;

    const cmd = msgArray[0].substring(prefix.length);
    const args = msgArray.shift();

    if(!command.hasOwnproperty(cmd)) return msg.channel.send(fmt("권한이 없어요.."));

    command[cmd](msg, args);

});

bot.login("TOKEN");
