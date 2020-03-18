let fetcher = (settings) => {
    return new Promise(
        (resolve, reject) => {
            const rp = require('request-promise');
            const requestOptions = {
                method: 'GET',
                uri: settings.api.host + '/v1/cryptocurrency/listings/latest',
                qs: {
                    'start': '1',
                    'limit': '5000',
                    'convert': settings.api.currency
                },
                headers: {
                    'X-CMC_PRO_API_KEY': settings.api.key
                },
                json: true,
                gzip: true
            };
            rp(requestOptions).then(
                response => {
                    resolve(response);
                },
                err => {
                    reject(3);
                }
            );
        }
    );
}
module.exports = (settings) => {
    return new Promise(
        (resolve, reject) => {
            const fs = require('fs');
            const db = 'prices.db';
            const timer = 'timer.db';
            const delay = settings.server.delay; //secconds
            const currentTime = Math.floor(new Date() / 1000);
            if (fs.existsSync(settings.fs.dir + db)) {
                fs.readFile(settings.fs.dir + timer, (err, data) => {
                    if (err) {
                        reject(5);
                    }
                    if (data) {
                        if (currentTime > Math.floor(data)) {
                            fetcher(settings).then(
                                (data) => {
                                    let toResolve = data;
                                    fs.writeFile(settings.fs.dir + db, JSON.stringify(toResolve), (err, data) => {
                                        if (err) {
                                            reject(4);
                                        } else {
                                            fs.writeFile(settings.fs.dir + timer, (currentTime + delay).toString(), (err, data) => {
                                                if (err) {
                                                    reject(2);
                                                }else{
                                                    resolve(toResolve);
                                                }
                                            });
                                        }

                                    });
                                },
                                (error) => {
                                    reject(error);
                                }
                            );
                        } else {
                            fs.readFile(settings.fs.dir + db, (error, data) => {
                                if (error) {
                                    reject(6);
                                }
                                if (data) {
                                    resolve(JSON.parse(data));
                                }
                            })
                        }
                    } else {
                        reject(5);
                    }
                });
            } else {
                fetcher(settings).then(
                    (data) => {
                        let toResolve = data;
                        fs.writeFile(settings.fs.dir + db, JSON.stringify(data), (err, data) => {
                            if (err) {
                                reject(4);
                            }
                            if (data) {
                                fs.writeFile(settings.fs.dir + timer, (currentTime + delay).toString(), (err, data) => {
                                    if (err) {
                                        reject(2);
                                    }
                                    if (data) {
                                        resolve(toResolve);
                                    }
                                });
                            }
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        }
    );
};