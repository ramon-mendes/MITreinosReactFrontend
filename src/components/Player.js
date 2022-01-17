import React, { useState, useEffect } from 'react';
import { PlayerModule } from './PlayerModule';
import { PlayerVideoComp } from './PlayerVideoComp';
import { PlayerPage } from './PlayerPage';
import { MetaAccept } from './MetaAccept';
import { Nav } from './Nav';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import * as Consts from '../consts.js';
import './Player.css';

export function Player() {
	const [data, setData] = useState([]);
	const history = useHistory();
	const [checkedmap, setCheckedmap] = useState({});
	const [loading, setLoading] = useState(true);
	const [hideSidebar, setHideSidebar] = useState(false);
	const [modalKeyboardIsOpen, setModalKeyboardIsOpen] = React.useState(false);
	const { course, lesson, page } = useParams();

	async function toggleChecked(lesson) {
		let checked = !checkedmap[course + '-' + lesson];
		checkedmap[course + '-' + lesson] = checked;
		setCheckedmap({ ...checkedmap });

		const response = await fetch(Consts.API + `/LessonAPI/SetWatched?hash=${lesson}&watched=${checked}`, { headers: Consts.GetFetchHeaders() });
		return checked;
	}

	async function onAccept() {
		const response = await fetch(Consts.API + `/StaticAPI/SetCourseMeta?course=` + course, {
			method: 'POST',
			headers: Consts.GetFetchHeaders(),
			body: JSON.stringify({ show_accept: false })
		});
	}

	console.log('Player', course, lesson, page);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);

			const response = await fetch(Consts.API + '/StaticAPI/GetForCourse?slug=' + course, { headers: Consts.GetFetchHeaders() });
			const data = await response.json();
			console.log(data);

			if (!lesson && !page) {
				document.location = ('/player/' + course + '/lesson/' + data.Meta.CurrentLessonHash);
				return;
			}
			setData(data);
			setLoading(false);
			setCheckedmap(data.Meta.WatchedMap);
		}
		fetchData();

		window.onresize = function () {
			const is_mobile = window.innerWidth <= 1200;
			if (is_mobile) {
				document.getElementById('sidebar').setAttribute('disabled', 'true');
				document.getElementById('sidebar').setAttribute('mobile', 'true');
				document.body.setAttribute('mobile', 'true');
			}
			else {
				document.getElementById('sidebar').removeAttribute('disabled');
				document.getElementById('sidebar').removeAttribute('mobile');
				document.body.removeAttribute('mobile');
			}
		};
	}, []);

	if (loading) {
		return <div className="global-loader"><img src="img/loader.gif" /></div>;
	}

	setTimeout(() => window.onresize(), 0);

	return (
		<>
			<Nav toggleSidebar={() => setHideSidebar(!hideSidebar)} username={data.UserName}></Nav>

			{data.Course.JsonMeta.show_accept && <MetaAccept onclose={onAccept} />}

			<main className="player">
				<div id="sidebar" disabled={hideSidebar}>
					<div className="navigation-header">
						<h1>{data.Course.Title}</h1>
						<div className="info"><span id="watch-cnt">{Object.values(checkedmap).filter(p => !!p).length} de {data.Meta.WatchTotal}</span> aulas completas</div>
					</div>

					{data.Course.Pages.map(p =>
						<Link to={`/player/${course}/page/${p.Slug}`} className={"navigation-page-page " + (page == p.Slug ? "current" : "")} key={p.Slug}>
							{p.Title}
						</Link>
					)}

					{data.Course.Modules.map(module => <PlayerModule course={course} module={module} curLesson={lesson} initialModule={data.Meta.CurrentModuleSlug} key={module.Slug} toggleChecked={toggleChecked} checkedmap={checkedmap}></PlayerModule>)}
				</div>

				<div id="area-content">
					{lesson && <PlayerVideoComp courseSlug={course} lessonHash={lesson} key={lesson} toggleChecked={toggleChecked} checkedmap={checkedmap} />}
					{page && <PlayerPage courseSlug={course} pageSlug={page} />}

					{
						(lesson || page) &&
						<footer>
							<blockquote>
								“Aprendemos a voar como os pássaros, a nadar como os peixes; mas não aprendemos a simples arte de vivermos junto como irmãos.”
								— Martin Luther King
							</blockquote>

							<div>
								{lesson && <a href={Consts.API + "/LessonAPI/GetMP3NoAuth?hash=" + lesson} target="_blank"><svg className="icon icon-file-mp3"><use xlinkHref="#file-mp3"></use></svg></a>}
								{lesson && <svg className="icon icon-keyboard" onClick={() => setModalKeyboardIsOpen(true)}><use xlinkHref="#keyboard"></use></svg>}
							</div>
						</footer>
					}

					<Modal isOpen={modalKeyboardIsOpen} toggle={() => setModalKeyboardIsOpen(!modalKeyboardIsOpen)}>
						<ModalHeader>
							Atalhos de teclado
						</ModalHeader>
						<ModalBody>
							<div id="dialog-shortcuts" className="shortcuts">
								<div>
									<div><kbd>+</kbd> Acelerar reprodução do vídeo</div>
								</div>

								<div>
									<div><kbd>-</kbd> Desacelerar reprodução do vídeo</div>
								</div>
							</div>
						</ModalBody>
					</Modal>
				</div>
			</main>
		</>
	);
}