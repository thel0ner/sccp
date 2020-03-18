const express = require('express');
const app = express();
const settings = require('./settings');
const err = require('./error');
const prices = require('./routes/prices');
const logger = require('./logger');
const ipckecker = require('./ipcheck');
app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
);
app.get("/", (req, res) => {
    ipckecker(settings, req).then(
        (data) => {
            let temp = err(1);
            res.status(temp.status).send(temp.toShow);
        }
    ).catch(
        (error) => {
            let temp = err(error);
            res.status(temp.status).send(temp.toShow);
        }
    );
});
app.get("/prices", (req, res) => {
    ipckecker(settings, req).then(
        (data) => {
            prices(settings).then(
                (data) => {
                    res.status(200).send(data);
                },
                (error) => {
                    let temp = err(error);
                    res.status(temp.status).send(temp.toShow);
                }
            );
        }
    ).catch(
        (error) => {
            let temp = err(error);
            res.status(temp.status).send(temp.toShow);
        }
    );
});
app.get("*", (req, res) => {
    let temp = err(7);
    res.status(temp.status).send(temp.toShow);
});

app.listen(settings.port, settings.host, () => {
    console.log("server running at http://" + settings.host + ":" + settings.port);
});
