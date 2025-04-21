const express = require("express");
const axios = require('axios');
const request = require("request");
const path = require('path')
const CircularJSON = require("circular-json");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')))

let option1 = "http://192.168.1.20:3000/healthcheck";
app.get("/", (req, res) => {
  request(option1, {json:true}, function(err, result,body) {
    if (err) {
      console.log(err)
    }
    console.log(body)
    res.send(CircularJSON.stringify(body))
  })

});

app.get('/api/retirement-need', async (req, res)=>{
  const { retirement_age, monthly_expense } = req.query;

  try {
    const response = await axios.get('http://192.168.1.20:3000/api/retirement-need', {
      params: {
      retirement_age,
      monthly_expense
      }
    })
    res.json(response.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  }
})

app.post('/api/pension_calculation', (req, res) => {
  const { age } = req.body;
  console.log("req.body", req.body);

  let option3 = {
    url: "http://192.168.1.41:3000/api/pension_calculation",
    method: "POST",
    json: true,
    body: {
      age: age
    }
  }

  request(option3, function(err, result, body) {
    if (err) {
      console.log(err)
    }
    console.log(body)
    res.send(CircularJSON.stringify(body))
  });
  
})

app.listen(8000, function () {
  console.log("Server is started 8000 Port");
});