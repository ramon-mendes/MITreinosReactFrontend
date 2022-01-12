import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { Player } from './components/Player';
import { Login } from './components/Login';
import { Courses } from './components/Courses';
import { NotFound } from './components/NotFound';
import { useCookie } from 'react-use';
import './components/global.css';
import * as Consts from './consts.js';

export default function App() {
	const [value, updateCookie, deleteCookie] = useCookie("UID-API");
	const [loading, setLoading] = useState(true);
	const login = Login();// must be here eles gets error 'used more hooeks than previous state'

	useEffect(() => {
		fetch(Consts.API + '/UserAPI/IsAuthorized', { credentials: 'include' }).then(data => {
			if (data.status != 200) {
				deleteCookie("UID-API");
			} else {
				setLoading(false);
			}
		});
	}, []);

	if (!value)
		return login;
	if (loading)
		return <div></div>;

	return (
		<Switch>
			<Route exact path='/' component={Courses} />
			<Route exact path='/player/:course' component={Player} />
			<Route exact path='/player/:course/lesson/:lesson' component={Player} />
			<Route exact path='/player/:course/page/:page' component={Player} />
			<Route component={NotFound} />
		</Switch>
	);
}