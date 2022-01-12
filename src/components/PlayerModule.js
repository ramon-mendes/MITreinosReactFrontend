import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function PlayerModule(props) {
	const course = props.course;
	const module = props.module;
	const [show, setShow] = useState(props.initialModule != module.Slug);

	const toggleCompleted = function(evt, lesson) {
		if(evt.target.classList.contains("icon-check") || evt.target.classList.contains("btn-check")) {
			props.toggleChecked(lesson.Hash);
			evt.preventDefault();
		}
	}

	const renderLessons = function(module) {
		if(!module.Available)
			return;

		return (
			<div className="navigation-module-pages">
				{
					module.Lessons.map(lesson =>
						<Link to={`/player/${module.CourseSlug}/lesson/${lesson.Hash}`} className={"navigation-page " + (props.curLesson == lesson.Hash ? "current" : "")} key={lesson.Hash} onClick={(evt) => toggleCompleted(evt, lesson)}>
							<div className="navigation-page-status btn-check-hoverer">
								<div className={"btn-check btn-check-fx " + (props.checkedmap[course + "-" + lesson.Hash] ? "checked" : "")}>
									<svg className="icon icon-check"><use xlinkHref="#check"></use></svg>
								</div>
							</div>

							<div className="navigation-page-info">
								{lesson.Title}
							</div>
						</Link>
					)
				}
			</div>
		);
	}

	return (
		<div className="navigation-module" disabled={show}>
			<div className="navigation-module-header" onClick={() => setShow(!show)}>
				<div className="icon-state">
					<svg className="icon icon-folder-plus"><use xlinkHref="#folder-plus"></use></svg>
				</div>

				<div className="ml-2">
					<div className="d-flex">
						{
							module.Available
								? <div className="navigation-module-index">Módulo</div>
								: <div className="navigation-module-index">Liberação dia {module.AvailableDt}</div>
						}
					</div>

					<h3 className="navigation-module-title">{module.Title}</h3>
				</div>
			</div>

			{ renderLessons(module) }
		</div>
	);
}