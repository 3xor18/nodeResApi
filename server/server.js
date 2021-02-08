require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
	if (err) throw new err();

	console.log('Bd Online');
});

const puerto = process.env.PORT;
app.listen(puerto, () => {
	console.log(`Escuchando en el puerto ${puerto}`);
});
