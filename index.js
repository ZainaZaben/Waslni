const express = require('express')
const orderRouter = require('./BE/order/order')
const emailRouter = require('./BE/sendEmail/sendEmail')
const homePageRouter = require('./BE/homePage/homePage')
const companySurveyRegistrationRouter = require('./BE/companySurveyRegistration/companySurveyRegistration')
const companyHomePageRouter = require('./BE/companyHomePage/companyHomePage')
const orderSearchRouter =require('./BE/orderSearch/orderSearch')
const Sign_up_api= require("./BE/clientSignup/user.router"); 
const login_api= require("./BE/clientLogin/user.router"); 
const rateRouter = require('./BE/rate/rate')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

 
app.use(cors())
app.use(express.json())
app.use(emailRouter)
app.use(homePageRouter)
app.use(companySurveyRegistrationRouter)
app.use(companyHomePageRouter)
app.use(orderRouter)
app.use(orderSearchRouter)
app.use(Sign_up_api)
app.use(login_api)
app.use(rateRouter)

app.use(express.static("./"));
app.get("/", function (req, res) {
  res.sendFile(__dirname+"/Frontend/pages/signup.html");
});


app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);

