const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {data: null, error: null});
})

app.get('/recipe/recipe', (req, res) => {
    //res.render('recipe', {recipe: null, error: null});
    var id = req.param('id');
    console.log('recipe id = ', id);
    res.render('recipe', {drinkId: id});
});

app.post('/', function (req, res) {
  
  let liquorType = req.body.liquorType;
  console.log('liquor type = ', liquorType);
 
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
        res.render('index', {data: data.drinks, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
