const settings = {
    port : 8080,
    host : '127.0.0.1',
    api : {
        host : 'https://pro-api.coinmarketcap.com',
        key : '6d7472f0-abad-4a38-889c-80dbeffb17ea',
        currency : 'IRR'
    },
    fs : {
        dir  : './bank/',
        logs : './logs/',
        blacklist : './blacklist/'
    },
    str : {
        sperators : [
            "\n"
        ]
    },
    server : {
        delay : 2400 // in secconds
    }
};
module.exports = settings;