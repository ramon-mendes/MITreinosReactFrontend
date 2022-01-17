import React, { Component, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export function MetaAccept(props) {
    const [modalIsOpen, setModalIsOpen] = React.useState(true);

    function onclose() {
        setModalIsOpen(!modalIsOpen);
        props.onclose();
    }

    return (
        <Modal size="lg" isOpen={modalIsOpen} toggle={onclose}>
            <ModalBody>
                <h1>Orientações do curso</h1>
                <p>Olá! Você está num curso on-line de Inteligência Emocional.</p>
                <p></p>
                <p>Dois requisitos essenciais para você aproveitar o curso ao máximo:</p>

                <h3>1. Acreditar</h3>
                <p>Você deve acreditar no processo, sem gerar expectativas.</p>
                <p>O processo é lento propositalmente para evitar que você gere super expectativas e possa crer nele.</p>

                <h3>2. Sigilo</h3>
                <p>
                    O sigilo é para melhorar o seu próprio desempenho no processo deste curso.
                </p>
                <p>
                    No momento que você compartilha suas percepções sobre o curso com outras pessoas, você irá ouvir a percepção delas sobre o seu processo,
                    e isso só irá lhe gerar confusão pois provalmente é diferente da sua percepção individual. Você estará se sabotando. Portanto faça o curso de forma totalmente individual.
                </p>
                <p>Mantendo o sigilo significa que você acredita/crê no processo.</p>

                <hr />
                <button className="btn btn-primary btn-lg" onClick={onclose}>Continuar</button>
            </ModalBody>
        </Modal>
    );
}