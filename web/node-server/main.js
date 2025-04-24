const express = require("express");
const axios = require('axios');
const path = require('path')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')))


app.get('/api/retirement-need', async (req, res)=>{
  const { retirement_age, quality_life } = req.query;

  try {
    const response = await axios.get('http://192.168.1.20:3000/api/retirement-need', {
      params: {
      retirement_age,
      quality_life
      }
    })
    res.json(response.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  }
})

app.post('/api/pension_calculation', async (req, res) => {
  const { age } = req.body;
  console.log("req.body", req.body);

  try {
    const response = await axios.post('http://192.168.1.41:3000/api/pension_calculation', {
      age: age
    });

    console.log(response.data);
    res.json(response.data); 
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  }
});

app.post('/pension_gap', async (req, res) => {
  const {age, quality_life} = req.body;
  console.log(req.body)

  try {
    const response = await axios.post('http://192.168.1.41:3000/pension_gap',{
      age: age,
      quality_life: quality_life
    }, { headers: { 'Content-Type': 'application/json' } })

    console.log(response.data)
    res.json(response.data)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  }
})

app.get('/get-expense-data', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.1.20:3000/get-expense-data')
    res.json(response.data)
    console.log(response.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Internal Server Error', detail: error.message })
  }
})

app.get('/chart_data', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.1.41:3000/chart_data')
    res.json(response.data);
    console.log(response.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Internal Server Error', detail: error.message })
  }
})

app.listen(8000, function () {
  console.log("Server is started 8000 Port");
});