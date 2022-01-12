﻿import React, { useState, useEffect } from 'react';
import './Courses.css';
import { Link } from "react-router-dom";

export function Courses() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);

			const response = await fetch('/StaticAPI/UserCourses');
			const data = await response.json();
			console.log(data);

			setData(data);
			setLoading(false);
		}
		fetchData();
	}, []);

	if(loading)
		return <div><img src="img/loader.gif" /></div>;

	return (
		<main className="cursos">
			{
				data.map(item =>

					<Link to={"/player/" + item.slug} key={ item.slug } className="item">
						<div className="img" style={{ backgroundImage: `url(${item.logoURL})` }}></div>
						<h2>{ item.title }</h2>
						<div className="about"></div>
					</Link>
				)
			}
				{/*<div class="item locked">*/}
				{/*	<div class="lock">*/}
				{/*		<svg class="icon icon-locked"><use xlink:href="#locked"></use></svg>*/}
				{/*	</div>*/}

				{/*	<div class="img" style="background-image: url(@item.BaseURL/curso.png)"></div>*/}
				{/*	<h2>@item.Title</h2>*/}
				{/*	<div class="about">@item.About</div>*/}
				{/*</div>*/}
		</main>
	);
}