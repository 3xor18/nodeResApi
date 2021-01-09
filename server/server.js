require('./config/config');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/usuario', function (req, res) {
	res.json('Users');
});

app.get('/usuario/:id', function (req, res) {
	let id = req.params.id;
	res.json('Users');
});

app.post('/usuario', function (req, res) {
	const body = req.body;
	if (body.nombre === undefined)
		res.status(400).json({
			ok: false,
			mensaje: 'El nombre es requerido',
		});
	res.json({ persona: body });
});

app.put('/usuario/:id', function (req, res) {
	let id = req.params.id;
	res.json(`Put User ${id}`);
});

app.delete('/usuario', function (req, res) {
	res.json('delete User');
});

const puerto = process.env.PORT;
app.listen(puerto, () => {
	console.log(`Escuchando en el puerto ${puerto}`);
});
