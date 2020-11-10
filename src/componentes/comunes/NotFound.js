import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends Component {
    render() {
        return (
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Inicio</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><Link to={"/"}>Inicio</Link></li>
                                        <li className="breadcrumb-item active">404 Not Found</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <hr style={{margin: 0}} />
                    </section>

                    <section className="content">
                        <div className="card card-solid">
                            <div className="card-body padding_07em">
                                <div className="error-page">
                                    <h2 className="headline text-warning"> 404</h2>
                                    <div className="error-content">
                                        <h3><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Página No Encontrada.</h3>
                                        <p>
                                            No pudimos encontrar la página que estabas buscando. Mientras tanto, puedes
                                            <a to="/">Regrear al Inicio</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
        )
    }
}

export default NotFound
