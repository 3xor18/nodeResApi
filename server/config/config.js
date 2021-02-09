/* ----Puerto---- */
process.env.PORT = process.env.PORT || 3000;
/* ----Puerto---- */

/* Enviroments */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
/* Enviroments */

/* ----Vencimiento Token---- */
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
/* ----Vencimiento Token---- */

/* ----SEED---- */
process.env.SEED = 'secret';
/* ----SEED---- */

/* BD */
let urlBD;
if (process.env.NODE_ENV === 'dev') {
	urlBD = 'mongodb://localhost:27017/cefe';
} else {
	urlBD = `mongodb+srv://gerson:gerson@cluster0.sca18.mongodb.net/cafe`;
}

process.env.URLDB = urlBD;
/* BD */
