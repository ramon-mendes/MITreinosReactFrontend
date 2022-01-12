import React, { Component, useState } from 'react';
import { Termos } from './Termos';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useCookie } from 'react-use';
import './Nav.css';

export function Nav(props) {
	const [value, updateCookie, deleteCookie] = useCookie("UID-API");
	const [ddShow, setDdShow] = useState(false);
	const [modalTermsIsOpen, setModalTermsIsOpen] = React.useState(false);

	const onDropdownClick = function(evt) {
		setDdShow(!ddShow);
		evt.preventDefault();
	};

	document.onclick = function(evt) {
		if(evt.target.id != 'dropdownMenuLink')
			setDdShow(false);
	}

	const onLogoutClick = function(evt) {
		deleteCookie();
	}

	return (
		<nav>
			<div id="menu-toggler">
				<div>MI Treinos</div>
				<svg className="icon icon-menu" onClick={props.toggleSidebar} ><use xlinkHref="#menu"></use></svg>
			</div>

			<div id="user">
				<div className="dropdown">
					<a className="btn btn-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" onClick={onDropdownClick}>
						<div className="round">
							{props.username[0]}
						</div>
						<div id="username">
							{props.username}
						</div>
					</a>

					<div className={ `dropdown-menu dropdown-menu-right ${ddShow ? "show" : ""}` }>
						<a className="dropdown-item" href="/">Meus cursos</a>
						<a className="dropdown-item" href="/" onClick={(evt) => { setModalTermsIsOpen(true); evt.preventDefault() } }>Termos de uso e privacidade</a>
						<a className="dropdown-item" href="/" onClick={ onLogoutClick }>Sair</a>
					</div>
				</div>
			</div>

			<Modal size="lg" isOpen={modalTermsIsOpen} toggle={() => setModalTermsIsOpen(!modalTermsIsOpen)}>
				<ModalHeader>
					Termos de uso e privacidade
				</ModalHeader>
				<ModalBody>
					<Termos />
				</ModalBody>
			</Modal>
		</nav>
	);
}