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
	  url = http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
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
  
  
  
  if ( liquorType != undefined)
  {
 
	let url = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorType}`
  
	console.log('url', url);

	request(url, function (err, response, body) {
	 
	console.log('body = <', body, '>');
	console.log('error: =<', err, '>');
	 
    if(err){
      res.render('liquorSearch', {data: null, error: 'Failed to call url'});
      console.log('error:', err);
      console.log('body:', body);
    } else {
	  if ( body == null )
	  {
		  console.log('Null body returned');
		  res.render('recipe', {data: null, error: 'Invalid liquor type'});
		  console.log('error:', err);
          console.log('body:<', body, '>');
	  }
	  else
	  {
		console.log('body is not null... checking undefined');
		  
		if ( body == undefined)
		{
			console.log('undefined returned body check');
		    res.render('recipe', {data: null, error: 'Invalid liquor type'});
		    console.log('error:', err);
            console.log('body:', body);
		}
		
		console.log('index of = ', body.indexOf( '' ));
		
		if ( body == '' )
		{
			console.log('Blank string returned');
		    res.render('liquorSearch', {data: null, error: 'Invalid liquor type'});
		    console.log('error:', err);
            console.log('body:', body);
		}
		else
		{
			console.log('valid body going to parse json');
			let data = JSON.parse(body)
			console.log('body:', data);
			if(data.drinks == undefined){
				res.render('liquorSearch', {data: null, error: 'Returned data is invalid'});
			} else {
				res.render('liquorSearch', {data: data.drinks, error: null});
			}
	    }
      }
    }
  });
}

else if ( drinkName != undefined)
{
	console.log('Search by drink name specified');
}
})
