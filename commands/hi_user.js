module.exports = {
    name: '!hi',
    description: 'Command to reply hi',
    execute(message) {
        message.reply('Hi, good morning');
    }
}