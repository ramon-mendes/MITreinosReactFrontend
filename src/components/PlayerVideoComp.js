import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Notifications, { notify } from 'react-notify-toast';

export class PlayerVideoComp extends Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
		this.props = props;
		this.state = { data: {}, showNotes: true, modal: false };
		this.state.curSpeed = 1;
		this.bindedHandleKeyPress = this.handleKeyPress.bind(this);
		this.bindedHandleKeyDown = this.handleKeyDown.bind(this);
	}

	handleKeyDown(evt) {
		if(evt.keyCode == 37 || evt.keyCode == 39) {
			this.player.currentTime(this.player.currentTime() + (evt.keyCode==37 ? -5 : 5));
			return;
		}
	}

	handleKeyPress(evt) {
		if(evt.key == '+')
			this.state.curSpeed += 0.25;
		else if(evt.key == '-')
			this.state.curSpeed -= 0.25;
		else
			return;
		if(this.state.curSpeed < 0.25)
			this.state.curSpeed = 0.25;

		this.videoRef.current.playbackRate = this.state.curSpeed;

		notify.hide();
		notify.show(`Velocidade de reprodução: ${this.state.curSpeed}x`);
	}

	componentDidMount() {
		document.addEventListener("keypress", this.bindedHandleKeyPress, false);
		document.addEventListener("keydown", this.bindedHandleKeyDown, false);

		var comp = this;

		async function fetchData() {
			comp.setState({ loading: true });

			const response = await fetch(`/LessonAPI/GetForHash?hash=${comp.props.lessonHash}`);
			const data = await response.json();

			comp.setState({ data: data, loading: false });

			// instantiate Video.js
			comp.player = videojs(comp.videoRef.current, comp.props, function onPlayerReady() {
				this.src(data.VideoPath);
				//this.play();
				console.log('ready');
			});
			comp.player.fluid(true);
		}
		fetchData();
	}

	// destroy player on unmount
	componentWillUnmount() {
		document.removeEventListener("keypress", this.bindedHandleKeyPress, false);
		if(this.player) {
			this.player.dispose()
		}
	}

	toggleCompleted() {
		this.props.toggleChecked(this.props.lessonHash);
	}

	async setStars(n) {
		const response = await fetch(`/LessonAPI/SetStars?hash=${this.props.lessonHash}&stars=${n}`);
		this.state.data.Stars = n;
		this.setState(this.state.data);
	}

	render() {
		const checked = this.props.checkedmap[this.props.courseSlug + "-" + this.props.lessonHash];

		return (
			<>
				<Notifications />

				<header>
					<Link to={this.state?.data?.PrevLessonHash ? `/player/${this.props.courseSlug}/lesson/${this.state?.data?.PrevLessonHash}` : ""}
						className="nav-btn" disabled={this.state?.data?.PrevLessonHash == null}>
						<svg className="icon icon-left-arrow"><use xlinkHref="#left-arrow"></use></svg>

						<div className="txt-next-prev">
							<div className="txt-label">Anterior</div>
							<div className="txt-title">
								{this.state?.data?.PrevLessonTitle}
							</div>
						</div>
					</Link>

					<Link to={this.state?.data?.NextLessonHash ? `/player/${this.props.courseSlug}/lesson/${this.state?.data?.NextLessonHash}` : ""}
						className="nav-btn nav-btn-next" disabled={this.state?.data?.NextLessonHash == null}>
						<div className="txt-next-prev">
							<div className="txt-label">Próximo</div>
							<div className="txt-title">
								{this.state?.data?.NextLessonTitle}
							</div>
						</div> 

						<svg className="icon icon-right-arrow"><use xlinkHref="#right-arrow"></use></svg>
					</Link>
				</header>

				<article className="container lesson">
					<div id="lesson" className="row">
						<div className="col-xs-12 col-lg-8 col-xl-9">
							<video ref={this.videoRef} controls className="video-js">
								Your browser does not support the video tag.
							</video>

							<h2>
								{this.state?.data?.Title}
							</h2>
						</div>

						<div className="col-lg-4 col-xl-3">
							<div id="meta">
								<div className="btn-wrap btn-wrap-marcar">
									<div id="btn-marcar" className={"btn-main btn-check-hoverer " + (checked ? "checked" : "")} onClick={ () => this.toggleCompleted() }>
										<div className={"btn-check btn-check-fx " + (checked ? "checked" : "")}>
											<svg className="icon icon-check"><use xlinkHref="#check"></use></svg>
										</div>
										<span className="txt"></span>
									</div>
								</div>

								{/*<div className="btn-wrap">*/}
								{/*	<div id="btn-notas" className="btn-main" >*/}
								{/*		<svg className="icon icon-note-1"><use xlinkHref="#note-1"></use></svg>*/}
								{/*		<span className="txt">Anotações</span>*/}
								{/*	</div>*/}
								{/*</div>*/}

								Avalie esta aula:

								<div id="area-stars">
									<svg className={"icon icon-star " + (this.state.data.Stars >= 1 ? "checked" : "")} onClick={() => this.setStars(1)}><use xlinkHref="#star"></use></svg>
									<svg className={"icon icon-star " + (this.state.data.Stars >= 2 ? "checked" : "")} onClick={() => this.setStars(2)}><use xlinkHref="#star"></use></svg>
									<svg className={"icon icon-star " + (this.state.data.Stars >= 3 ? "checked" : "")} onClick={() => this.setStars(3)}><use xlinkHref="#star"></use></svg>
									<svg className={"icon icon-star " + (this.state.data.Stars >= 4 ? "checked" : "")} onClick={() => this.setStars(4)}><use xlinkHref="#star"></use></svg>
									<svg className={"icon icon-star " + (this.state.data.Stars >= 5 ? "checked" : "")} onClick={() => this.setStars(5)}><use xlinkHref="#star"></use></svg>
								</div>
							</div>
						</div>
					</div>
				</article>
			</>
		)
	}
}