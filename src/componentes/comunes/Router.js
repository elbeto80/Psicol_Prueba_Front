import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Compradores from '../Compradores';
import Boletas from '../Boletas';
import Inicio from '../Inicio';
import NotFound from './NotFound';

export class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Inicio}/>
                    <Route path="/compradores" component={Compradores}/>
                    <Route path="/boletas" component={Boletas}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;