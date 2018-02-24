const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '8dc5e70e3a07611d59bbc7e14ebf370e';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {data: null, error: null});
})

app.post('/', function (req, res) {
  //let city = req.body.city;
  let liquorType = req.body.liquorType;
  console.log('liquor type = ', liquorType);
  //let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  let url = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorType}`
  
  console.log('url', url);

  request(url, function (err, response, body) {
	  
	  //console.log('body = ', body);
	  //console.log('response = ', response);
	 
    if(err){
      res.render('index', {data: null, error: 'Failed to call url'});
      console.log('error:', err);
      console.log('body:', body);
    } else {
      let data = JSON.parse(body)
      console.log('body:', data);
      if(data.drinks == undefined){
        res.render('index', {data: null, error: 'Returned data is invalid'});
      } else {
        let dataText = `It's ${data.drinks[1].strDrink} with ID ${data.drinks[1].idDrink}!`;
        res.render('index', {data: data.drinks, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
