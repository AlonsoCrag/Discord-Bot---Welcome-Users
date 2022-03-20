module. exports = {
    name: '!uinfo',
    description: 'Command to get name of users and profile pictures',
    execute(message) {
        let users = message.mentions.users.map(cur => {
            return {data: [cur.username, cur.displayAvatarURL({format: 'jpg'})]}
        });
        for (let elm in users) {
            let mssg = users[elm].data
            message.channel.send(mssg);
        }
    }
}


const elements = ["Elmer", "Hachy", "Pulgas"];

const newElm = elements.map(cur => {
    return {data: ['Hi', cur]};
});

// console.log(newElm);