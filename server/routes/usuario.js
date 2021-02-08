const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const _ = require('underscore');
const usuario = require('../models/usuario');

app.get('/usuario', function (req, res) {
	const estado = true;

	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	usuario
		.find({ estado }, 'nombre email role estado google img')
		.skip(desde)
		.limit(limite)
		.exec((err, usuarios) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}

			Usuario.count({ estado }, (err, conteo) => {
				res.json({
					ok: true,
					usuarios,
					cuantos: conteo,
				});
			});
		});
});

app.get('/usuario/:id', function (req, res) {
	let id = req.params.id;
	res.json(`Get user ${id}`);
});

app.post('/usuario', function (req, res) {
	const body = req.body;

	const usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		role: body.role,
	});

	usuario.save((err, usuarioDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}
		res.json({
			ok: true,
			usuario: usuarioDB,
		});
	});
});

const permitidosEditar = ['nombre', 'email', 'password', 'img', 'role', 'estado'];

app.put('/usuario/:id', function (req, res) {
	let id = req.params.id;
	let body = _.pick(req.body, permitidosEditar);

	Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}

		res.json({
			ok: true,
			usuario: usuarioDB,
		});
	});
});

app.delete('/usuario/:id', function (req, res) {
	let id = req.params.id;

	Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
		if (err) {
			return res.status(400).json({ ok: false, err });
		}

		if (!usuarioBorrado) {
			return res.status(400).json({ ok: false, err: { message: 'Usuario no Encontrado' } });
		}

		res.json({ ok: true, usuario: usuarioBorrado });
	});
});

app.put('/usuario/logico/:id', function (req, res) {
	let id = req.params.id;

	const cambiaEstado = {
		estado: false,
	};

	Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDesactivado) => {
		if (!usuarioDesactivado) {
			return res.status(400).json({ ok: false, err: { message: 'Usuario no existe' } });
		}
		if (err) {
			return res.status(400).json({ ok: false, err });
		}
		res.json({ ok: true, usuario: usuarioDesactivado });
	});
});

module.exports = app;
