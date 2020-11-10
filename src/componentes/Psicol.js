import React from 'react';

import Cabecera from './comunes/Cabecera';
import Menu from './comunes/Menu';
import Pie from './comunes/Pie';

import Router from './comunes/Router';

function Psicol() {
    return (
        <>
            <Cabecera />
            <Menu />

            <Router />

            <Pie />
        </>
    )
}

export default Psicol
