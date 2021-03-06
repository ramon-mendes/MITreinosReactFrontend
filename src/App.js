import React, { useState, useEffect, useLocalStorage } from 'react';
import { Route, Switch } from 'react-router';
import { Player } from './components/Player';
import { Login } from './components/Login';
import { Courses } from './components/Courses';
import { NotFound } from './components/NotFound';
import './components/global.css';
import * as Consts from './consts.js';

export default function App() {
	const [loading, setLoading] = useState(true);
	const [hasUID, setHasUID] = useState(localStorage.getItem(Consts.STORAGEUID));
	const login = Login();// must be here else gets error 'used more hooks than previous state'

	useEffect(() => {
		if (setHasUID) {
			fetch(Consts.API + '/UserAPI/IsAuthorized', { headers: Consts.GetFetchHeaders() }).then(data => {
				if (data.status != 200) {
					localStorage.removeItem(Consts.STORAGEUID);
					setHasUID(undefined);
				} else {
					setLoading(false);
				}
			});
		}
	}, []);

	if (!hasUID) {
		return login;
	}
	if (loading) {
		return <div></div>;
	}

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