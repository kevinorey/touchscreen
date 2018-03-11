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

app.post('/getSearch', function (req, res) {

  console.log('req = ', req.body);
  console.log(req.body.searchByPicker);
  
  var searchBy = req.body.searchByPicker
  
  if ( searchBy != undefined )
  {
	  //res.render('index', {data: null, error: null});
	  
	  if ( searchBy == 'liquor')
	  {
		  console.log('liquor search');
		  res.render('liquorSearch', {data: null, error: null});
	  }
	  else if ( searchBy == 'drinkName')
	  {
		  console.log('drink search');
		  res.render('drinkSearch', {data: null, error: null});
	  }
	  else
	  {
		  console.log('Invalid search option');
		  res.render('index', {data: null, error: 'Please select a search by in drop down'});
	  }
  }
  else
  {
	  console.log('Undefined search by option');
	  //Error scenario  
  }
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

//app.post('/', function (req, res) {
  
  //let liquorType = req.body.liquorType;
  //console.log('liquor type = ', liquorType);
  
  //let drinkName = req.body.drinkName;
  //console.log('drink name = ', drinkName);
  
  //if ( liquorType != undefined)
  //{
 
	//let url = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorType}`
  
	//console.log('url', url);

	//request(url, function (err, response, body) {
	 
	//console.log('body = <', body, '>');
	//console.log('error: =<', err, '>');
	 
    //if(err){
      //res.render('liquorSearch', {data: null, error: 'Failed to call url'});
      //console.log('error:', err);
      //console.log('body:', body);
    //} else {
	  //if ( body == null )
	  //{
		  //console.log('Null body returned');
		  //res.render('recipe', {data: null, error: 'Invalid liquor type'});
		  //console.log('error:', err);
          //console.log('body:<', body, '>');
	  //}
	  //else
	  //{
		//console.log('body is not null... checking undefined');
		  
		//if ( body == undefined)
		//{
			//console.log('undefined returned body check');
		    //res.render('recipe', {data: null, error: 'Invalid liquor type'});
		    //console.log('error:', err);
            //console.log('body:', body);
		//}
		
		//console.log('index of = ', body.indexOf( '' ));
		
		//if ( body == '' )
		//{
			//console.log('Blank string returned');
		    //res.render('liquorSearch', {data: null, error: 'Invalid liquor type'});
		    //console.log('error:', err);
            //console.log('body:', body);
		//}
		//else
		//{
			//console.log('valid body going to parse json');
			//let data = JSON.parse(body)
			//console.log('body:', data);
			//if(data.drinks == undefined){
				//res.render('liquorSearch', {data: null, error: 'Returned data is invalid'});
			//} else {
				//res.render('liquorSearch', {data: data.drinks, error: null});
			//}
	    //}
      //}
    //}
  //});
//}

//else if ( drinkName != undefined)
//{
	//console.log('Search by drink name specified');
//}
//})

app.post('/', function (req, res) {
  
  let liquorType = req.body.liquorType;
  console.log('liquor type = ', liquorType);
  
  let drinkName = req.body.drinkName;
  console.log('drink name = ', drinkName);
  
  let url;
  let renderPage;
  
  if ( liquorType != undefined )
  {
	  url = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorType}`
	  renderPage = 'liquorSearch';
  }
  else if ( drinkName != undefined )
  {
	  url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
	  renderPage = 'drinkSearch';
  }
  else
  {
	  res.render('index', {data: null, error: 'Bad shit occurred call Kevin!!'});
  }
  
  console.log('url', url);
  
  request(url, function (err, response, body) {
	 
  console.log('body = <', body, '>');
  console.log('error: =<', err, '>');
	 
if(err){
  res.render(renderPage, {data: null, error: 'Failed to call url'});
  console.log('error:', err);
  console.log('body:', body);
} else {
  if ( body == null )
  {
	  console.log('Null body returned');
	  res.render(renderPage, {data: null, error: 'Invalid type.... null body returned'});
	  console.log('error:', err);
	  console.log('body:<', body, '>');
  }
  else
  {
	console.log('body is not null... checking undefined');
	  
	if ( body == undefined)
	{
		console.log('undefined returned body check');
	    res.render(renderPage, {data: null, error: 'Invalid type... undefined body'});
	    console.log('error:', err);
		console.log('body:', body);
	}
	
	console.log('index of = ', body.indexOf( '' ));
	
	if ( body == '' )
	{
		console.log('Blank string returned');
	    res.render(renderPage, {data: null, error: 'Invalid type... blank was returned'});
	    console.log('error:', err);
		console.log('body:', body);
	}
	else
	{
		console.log('valid body going to parse json');
		let data = JSON.parse(body)
		console.log('body:', data);
		if(data.drinks == undefined){
			res.render(renderPage, {data: null, error: 'Returned data is invalid'});
		} else {
			res.render(renderPage, {data: data.drinks, error: null});
		}
    }
  }
}
});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
