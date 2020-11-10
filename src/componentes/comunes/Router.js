import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Compradores from '../Compradores';
import Boletas from '../Boletas';
import Inicio from '../Inicio';
import NotFound from './NotFound';

import Cabecera from '../comunes/Cabecera';
import Menu from '../comunes/Menu';
import Pie from '../comunes/Pie';

export class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Cabecera />
                <Menu />

                <Switch>
                    <Route exact path="/" render={() => (<Inicio />)} />
                    <Route path="/compradores" render={() => (<Compradores />)} />
                    <Route path="/boletas" render={() => (<Boletas />)} />
                    <Route render={() => (<NotFound />)} />
                </Switch>

                <Pie />
            </BrowserRouter>
        )
    }
}

export default Router;