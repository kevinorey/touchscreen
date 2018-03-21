var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'barmate',
  password : 'test1234',
  database : 'mydb'
});
 


function getWineReviews(){
	
	connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
    return;
	}
 
	connection.query('SELECT * from wine', function (error, results, fields) {
		if (error) throw error;
		console.log('The solution is: ', results[0].solution);
		});
 
	connection.end(function(err) {
		// The connection is terminated now
	});
}
