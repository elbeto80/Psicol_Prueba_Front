import React, { Component } from 'react'

export class Inicio extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">Inicio</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <hr style={{margin: 0}} />
                </section>

                <section className="content">
                    <div className="card card-solid">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3>Prueba para desarrollador Psicol</h3><br/>
                                    <h4>Alberto Alonso Alvarez Rendón</h4>
                                    <h4>CC 98699801</h4>
                                    <h4>Telf 3178555209</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Inicio;
