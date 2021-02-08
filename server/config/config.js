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
	urlBD = process.env.MONGO_URI;
}

process.env.URLDB = urlBD;
/* BD */
