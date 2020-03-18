module.exports = (settings, req) => {
    return new Promise(
        (resolve, reject) => {
            const fs = require('fs');
            const path = settings.fs.blacklist + "ips.db";
            fs.readFile(path, (err, data) => {
                if (!err) {
                    if (data.toString().split(settings.str.sperators[0]).includes(req.connection.remoteAddress)) {
                        reject(8)
                    }else{
                        resolve(true);
                    }
                }
            });
        }
    );
}