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
    
    // Grab id from request parameter to use to fetch cocktail details
    var id = req.param('id');
    console.log('recipe id = ', id);
    
    // Build URL for cocktail receipe details
    let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    console.log('URL = ', url);
    
    //Call cocktail details
    request(url, function (err, response, body) {
	  
	//Check for error 
    if(err){
      res.render('recipe', {data: null, error: 'Failed to get detailed cocktail receipe'});
      console.log('error:', err);
      console.log('body:', body);
    } else {
		
		let data = JSON.parse(body)
		console.log('body:', data);
		if(data.drinks == undefined){
			res.render('recipe', {data: null, error: 'Unable to find cocktail details'});
		} else {
			res.render('recipe', {data: data.drinks, error: null});
		}
    }
  });
   
});

app.post('/', function (req, res) {
  
  let liquorType = req.body.liquorType;
  console.log('liquor type = ', liquorType);
 
  let url = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorType}`
  
  console.log('url', url);

  request(url, function (err, response, body) {
	 
	console.log('body = ', body);
	 
    if(err){
      res.render('index', {data: null, error: 'Failed to call url'});
      console.log('error:', err);
      console.log('body:', body);
    } else {
	  if ( body == null )
	  {
		  console.log('Null body returned');
		  res.render('recipe', {data: null, error: 'Invalid liquor type'});
		  console.log('error:', err);
          console.log('body:', body);
	  }
	  else
	  {
		console.log('body is not null... checking undefined');
		  
		if ( body == undefined)
		{
			console.log('undefined returned');
		    res.render('recipe', {data: null, error: 'Invalid liquor type'});
		    console.log('error:', err);
            console.log('body:', body);
		}
		
		
		if ( body.indexOf("undefined") == -1 )
		{
			console.log('undefined returned');
		    res.render('index', {data: null, error: 'Invalid liquor type'});
		    console.log('error:', err);
            console.log('body:', body);
		}
		else
		{
		
			let data = JSON.parse(body)
			console.log('body:', data);
			if(data.drinks == undefined){
				res.render('index', {data: null, error: 'Returned data is invalid'});
			} else {
				res.render('index', {data: data.drinks, error: null});
			}
	    }
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
