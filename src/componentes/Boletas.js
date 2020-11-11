import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { globalFunctions, Success_Error_Mostrar, CargandoSweet } from './comunes/GlobalFuntions';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';
const MySwal = withReactContent(Swal);

function Boletas() {
    const [datos, setDatos] = useState({
        idBoleta: '',
        evento: '',
        fecha: '',
        comprador: '',
        campoBuscar: '',
        verDisponibles: 0,
    })
    const [listaBoletas, setlistaBoletas] = useState([]);
    const [listaCompradores, setlistaCompradores] = useState([]);

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const HandelGetCompradores = async () => {
        CargandoSweet(0, 'Cargando...');
        await axios.get(globalFunctions.url+'/getCompradores')
        .then(function (response) {
            setlistaCompradores(response.data.info.compradores)
            CargandoSweet(1);
        })
        .catch(function (error) {
            CargandoSweet(1);
            console.log(error);
            Success_Error_Mostrar('Error', error, 'error');
        });
    }

    const HandelGetBoletas = async (op) => {
        CargandoSweet(0, 'Cargando...');
        await axios.get(globalFunctions.url+'/getBoletas', {
            params: {
                campoBuscar: datos.campoBuscar,
                verDisponibles: op
            }
        })
        .then(function (response) {
            setlistaBoletas(response.data.info.boletas)
            CargandoSweet(1);
        })
        .catch(function (error) {
            CargandoSweet(1);
            console.log(error);
            Success_Error_Mostrar('Error', error, 'error');
        });
    }

    const HandelClickGuardar = async () => {
        if( !validarCampos() ) { return false; }
        CargandoSweet(0, 'Guardando...');
        const data = {
            'idBoleta': datos.idBoleta,
            'evento': datos.evento,
            'fecha': datos.fecha,
            'comprador': datos.comprador,
        };

        await axios.post(globalFunctions.url+'/boleta/save', {data}
        ).then(response => {
            CargandoSweet(1);
            if(response.data.error) {
                Success_Error_Mostrar('Error', response.data.info, 'error');
                return false;
            }
            Success_Error_Mostrar("Registro Correcto", response.data.info, "success");
            HandelGetBoletas();
            document.getElementById("closeModal").click();
            vaciarCampos();
        }).catch(function(error) {
            CargandoSweet(1);
            console.log(error);
            Success_Error_Mostrar('Error', error, 'error');
        });
    }

    const validarCampos = () => {
        if( datos.evento.trim() === '' ) {
            Success_Error_Mostrar('Falta información', 'Evento es obligatorio', 'warning');
            return false;
        }

        if( datos.fecha === '' ) {
            Success_Error_Mostrar('Falta información', 'Fecha es abligatorio', 'warning');
            return false;
        }

        return true;
    }

    const vaciarCampos = () => {
        setDatos({
            ...datos,
            idBoleta: 0,
            evento: '',
            fecha: '',
            comprador: '',
        });
        document.getElementById('evento').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('comprador').value = '';
    }

    const HandelEditarBoleta = (boleta) => {
        setDatos({
            ...datos,
            idBoleta: boleta.id,
            evento: boleta.evento,
            fecha: boleta.fecha,
            comprador: ((!boleta.idComprador || boleta.idComprador === null) ? '' : boleta.idComprador),
        })
        document.getElementById('evento').value = boleta.evento;
        document.getElementById('fecha').value = boleta.fecha;
        document.getElementById('comprador').value = boleta.comprador;
    }

    const HandelBorrarBoleta = (boleta) => {
        MySwal.fire({
            title: "Esta Seguro?",
            text: "Desea eliminar boleta?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if (result.value) {
                CargandoSweet(0, 'Eliminando...');
                axios.post(globalFunctions.url+'/boleta/delete', {
                    idComprador: boleta.id
                })
                .then(function (response) {
                    CargandoSweet(1);
                    if(response.data.error) {
                        Success_Error_Mostrar('Error', response.data.info, 'error');
                        return false;
                    }
                    Success_Error_Mostrar("", response.data.info, "success");
                    HandelGetBoletas();
                    vaciarCampos();
                })
                .catch(function (error) {
                    CargandoSweet(1);
                    console.log(error);
                    Success_Error_Mostrar('Error', error, 'error');
                });
            } 
        });
    }

    const nombreComprador = (nombre,apellido) => {
        if( !nombre ) { nombre = ''; }

        if( !apellido ) { apellido = ''; }
        return `${nombre} ${apellido}`;
    }

    const formato_fecha_corta = (fecha) => {
        if (fecha) {
          return moment(fecha, 'YYYY-MM-DD h:mm:ss').format('DD/MM/YYYY');
        }
    }

    const HandelVerDisponibles = (e) => {
        let op = e.target.value;
        HandelGetBoletas(op);
    }

    useEffect(() => {
        HandelGetCompradores();
        HandelGetBoletas();
    }, []);

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
                                <li className="breadcrumb-item"><Link to={"/"}>Inicio</Link></li>
                                <li className="breadcrumb-item active">Boletas</li>
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
                            <div className="col-md-8 mb-3">
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modalNuevaBoleta">Nueva boleta</button>
                            </div>

                            <div className="col-md-4">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <label className="input-group-text" htmlFor="verDisponibles">Ver</label>
                                    </div>
                                    <select className="custom-select" id="verDisponibles" name="verDisponibles" onChange={HandelVerDisponibles} >
                                        <option value="0">Todos</option>
                                        <option value="1">Disponibles</option>
                                        <option value="2">No disponibles</option>
                                    </select>
                                </div>
                            </div>

                            {/* <div className="col-md-2 col-sm-6 col-xs-12">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control form-control-sm" />
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <button className="btn btn-primary btn-sm" value="filter">Buscar</button>
                                <button className="btn btn-secondary btn-sm" type="button">Limpiar</button>
                            </div> */}

                            <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Evento</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Comprador</th>
                                    <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        listaBoletas.map((boleta, index) => {
                                            return (
                                                <tr key={boleta.id}>
                                                    <td>{index+1}</td>
                                                    <td>{boleta.evento}</td>
                                                    <td>{formato_fecha_corta(boleta.fecha)}</td>
                                                    <td>{nombreComprador(boleta.nombre,boleta.apellido)}</td>
                                                    <td>
                                                    <button className="btn btn-warning btn-xs" title="Editar boleta" data-toggle="modal" data-target="#modalNuevaBoleta" onClick={() => HandelEditarBoleta(boleta)}>
                                                        <i className="nav-icon fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button className="btn btn-danger btn-xs" title="Eliminar boleta" onClick={() => HandelBorrarBoleta(boleta)}>
                                                        <i className="nav-icon far fa-trash-alt"></i>
                                                    </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                }
                                 </tbody>
                            </table>
                        </div>

                            <div className="col-md-12">
                                <div className="modal fade" id="modalNuevaBoleta" tabIndex="-1" aria-labelledby="modalNuevaBoleta" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Nueva boleta</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row">
                                                    <div className="col-md-12 form-group">
                                                        <label htmlFor="evento" style={{marginBottom: 0}}>Evento</label>
                                                        <input type="text" className="form-control" id="evento" name="evento" onChange={handleInputChange} />
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label htmlFor="fecha" style={{marginBottom: 0}}>Fecha</label>
                                                        <input type="date" className="form-control" id="fecha" name="fecha" onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="comprador">Comprador</label>
                                                    <select className="form-control" id="comprador" name="comprador" onChange={handleInputChange} >
                                                        <option value=''>Seleccionar...</option>
                                                        {
                                                            listaCompradores.map((comprador, index) => {
                                                                return (
                                                                <option value={comprador.id} key={comprador.id}>{nombreComprador(comprador.nombre,comprador.apellido)}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={HandelClickGuardar}>Guardar</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeModal" onClick={vaciarCampos} >Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Boletas