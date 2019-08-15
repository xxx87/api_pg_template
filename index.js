const express = require('express');
const {Pool} = require("pg");
const app = express();
const favicon = require('serve-favicon');
const path = require('path');

const connectionString = "tcp://pguser:pgpassword@localhost:5432/db_name";

const pool = new Pool({
	connectionString: connectionString,
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', function(req, res, next) {
	pool.query('SELECT * FROM table_name', function(err, result) {
		if(err) {
			console.log(err);
			res.status(400).send(err);
		}
		res.status(200).send(result.rows);
	});
});


app.listen(4000, function() {
	console.log('Server is running.. on Port 4000');
});
