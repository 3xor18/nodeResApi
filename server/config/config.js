/* ----Puerto---- */
process.env.PORT = process.env.PORT || 3000;
/* ----Puerto---- */

/* Enviroments */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
/* Enviroments */

/* BD */
let urlBD;
if (process.env.NODE_ENV === 'dev') {
	urlBD = 'mongodb://localhost:27017/cefe';
} else {
	const bdname = `test`;
	const user = `gerson`;
	const password = `gerson`;
	urlBD = `mongodb+srv://${user}:${password}@cluster0.sca18.mongodb.net/${bdname}`;
}

process.env.URLDB = urlBD;
/* BD */
