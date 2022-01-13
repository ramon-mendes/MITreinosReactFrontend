import React, { Component, useState, useEffect } from 'react';
import './Login.css';
import Notifications, { notify } from 'react-notify-toast';
import * as Consts from '../consts.js';

async function loginUser(credentials) {
	const data = await fetch(Consts.API + '/UserAPI/Login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	});

	if (data.status != 200) {
		return false;
	}

	localStorage.setItem(Consts.STORAGEUID, await data.text());
	return true;
}

export function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async e => {
		e.preventDefault();
		const bOK = await loginUser({
			email,
			password
		});
		if (bOK) {
			window.location.reload();
		}
		else {
			notify.hide();
			notify.show(`Usuário ou senha inválidos.`);
		}
	}

	return (
		<div className="main-login">
			<Notifications />

			<h1>Conecte-se na sua conta</h1>

			<form id="area-login" onSubmit={handleSubmit}>
				<img src="/img/logo.png" />

				<div className="input-group input-group-lg">
					<input type="email" className="form-control" placeholder="E-mail" name="email" autoFocus onChange={e => setEmail(e.target.value)} />
				</div>

				<div className="input-group input-group-lg">
					<input type="password" className="form-control" placeholder="Senha" name="senha" onChange={e => setPassword(e.target.value)} />
				</div>

				<button type="submit" className="btn btn-primary btn-block">
					ENTRAR
				</button>
			</form>
		</div>
	);
}
