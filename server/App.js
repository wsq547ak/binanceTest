const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const index = require("./routers/index");
const app = express();
const path = require('path');
app.use(cookieParser());
app.use(bodyParser.json());

// 用户接口模块
// app.use("/user",index);

// 映射到build后的路径
//设置build以后的文件路径 项目上线用
app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    }
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

app.listen("9000",function(){
    console.log("open Browser http://localhost:9000");
});
