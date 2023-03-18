const express = require("express");
const bodyParser = require("body-parser");
const Calculator = require('./caculator.js');
const app = express();

const expressHbs = require('express-handlebars');

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});

// server css as static
app.use(express.static(__dirname));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('.hbs',expressHbs.engine({
    extname: "hbs",
    defaultLayout: 'index'
}))
app.set('view engine','.hbs');
app.set('views','../Server Adr/bt_calculator/views');

app.get("/tinhtoan", (req, res) => {
    console.log(req.body);
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);
    const operator = req.query.operator;
    let result;
    let op;
    switch (operator) {
        case 'tong':
            result = Calculator.tinhTong(num1, num2);
            op = '+';
            break;
        case 'hieu':
            result= Calculator.tinhHieu(num1, num2);
            op = '-';
            break;
        case 'tich':
            result = Calculator.tinhTich(num1, num2);
            op = 'x';
            break;
        case 'thuong':
            result = Calculator.tinhThuong(num1, num2);
            op = '/';
            break;
    }
    res.render("index", {
        layout: 'main',
        a: num1,
        b: num2, 
        opera: op,
        kq: result,
        showResult: true
      });
    });
    app.get("/", (req, res) => {
        res.render("index", {
          showResult: false
        });
});