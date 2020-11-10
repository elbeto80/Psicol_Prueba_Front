import React from 'react'

function Bolestas() {
    return (
        <div className="content-wrapper">
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Bolestas</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="">Inicio</a></li>
                            <li className="breadcrumb-item active">Bolestas</li>
                        </ol>
                    </div>
                </div>
            </div>
            <hr style={{margin: 0}} />
        </section>

        <section className="content">
            <div className="card card-solid">
                <div className="card-body padding_07em">
                    <div className="row">
                        <div className="col-md-12  mb-3">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#modalNuevaTienda">Nueva tienda</button>
                        </div>

                        <div className="col-md-2 col-sm-6 col-xs-12">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-sm" v-model="campoBuscar" />
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <button className="btn btn-primary btn-sm" value="filter">Buscar</button>
                            <button className="btn btn-secondary btn-sm" type="button">Limpiar</button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
    )
}

export default Bolestas