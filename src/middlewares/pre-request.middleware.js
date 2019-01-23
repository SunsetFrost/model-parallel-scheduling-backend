import bodyParser from "body-parser";
import chalk from "chalk";
//const compression = require('compression');

function preMid(app) {
    // 私钥
    //app.set('jwtTokenSecret', setting.jwt_secret)
    // 压缩网页
    //app.use(compression());
    // 解析json格式的http请求体，通过req.body使用
    app.use(bodyParser.json());
    // 解析文本格式的http请求体，通过req.body使用
    //app.use(bodyParser.urlencoded({ extended: true }));

    // all cross origin
    app.all("*", (req, res, next) => {
        const allowOrign = ["http://localhost:9035", "http://localhost:8000"];
        if (allowOrign.includes(req.headers.origin)) {
            res.header("Access-Control-Allow-Origin", req.headers.origin);
            res.header(
                "Access-Control-Allow-Headers",
                "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
            );
            res.header(
                "Access-Control-Allow-Methods",
                "PUT,POST,GET,DELETE,OPTIONS"
            );
            res.header("Access-Control-Allow-Credentials", "true");
        }

        if (req.method == "OPTIONS") {
            // 预检请求直接返回
            return res.sendStatus(200);
        } else {
            return next();
        }
    });

    app.use((req, res, next) => {
        console.log(chalk.greenBright(`${req.method}  --  ${req.url}\n`));
        next();
    });
}

export default preMid;
