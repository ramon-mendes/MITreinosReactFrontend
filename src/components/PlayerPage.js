import React, { useState } from 'react';
import { PageIEOrientacoes } from './pages/PageIEOrientacoes';

export function PlayerPage(props) {
	if (props.pageSlug == 'ieorientacoes') {
		return <PageIEOrientacoes />
	}
	return <div></div>
}