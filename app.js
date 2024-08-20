const express = require('express');
const session = require("express-session");
const app = express();
const http = require('http')
const config = require("./config.json")
const logger = require('morgan');
const cors = require("cors")
const passport = require("passport");
const port = config.port;
const rateLimit = require('express-rate-limit');
const tapLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500,
    handler: function (req, res, next) {
        res.status(429).json({
            "error": true,
            "status": 429,
            "message": "Too many requests, please try again later.",
            "data": {}
        })
    }
});

app.set("port", port);
app.set("trust proxy", 2);
app.use(passport.initialize());
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app)

server.listen(config.port)
server.on('error', function () {
    {
        if (error.syscall !== 'listen') {
            throw error
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges')
                process.exit(1)
                break
            case 'EADDRINUSE':
                console.error(bind + ' is already in use')
                process.exit(1)
                break
            default:
                throw error
        }
    }
})
server.on('listening', function () {
    const addr = server.address()
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    console.log('Server Running ->>> Listening on ' + bind)
})

const tokenStrategy = require("./helpers/passport/jwt")
passport.use(tokenStrategy.name, tokenStrategy.strategy)

app.get("/healthcheck", (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    };
    try {
        return res.status(200).send(healthcheck);
    } catch (error) {
        console.error("Health check failed:", error);
        return res.status(503).send({ message: "Service Unavailable" });
    }
});

const basicController = require("./controllers/basic")
app.use("/basic", basicController)
