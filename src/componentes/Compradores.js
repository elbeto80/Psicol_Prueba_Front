import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { globalFunctions, Success_Error_Mostrar, CargandoSweet } from './comunes/GlobalFuntions';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Compradores = () => {
    const [datos, setDatos] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        idComprador: 0,
        campoBuscar: ''
    })
    const [listaCompradores, setlistaCompradores] = useState([]);
    // const [campoBuscar, setCampoBuscar] = useState('');

    const HandelGetCompradores = async () => {
        CargandoSweet(0, 'Cargando...');
        await axios.get(globalFunctions.url+'/getCompradores', {
            params: {
                campoBuscar: datos.campoBuscar
            }
        })
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

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const HandelClickGuardar = async () => {
        if( !validarCampos() ) { return false; }
        CargandoSweet(0, 'Guardando...');
        const data = {
            'idComprador': datos.idComprador,
            'cedula': datos.cedula,
            'nombre': datos.nombre,
            'apellido': datos.apellido,
            'telefono': datos.telefono,
            'email': datos.email,
        };

        await axios.post(globalFunctions.url+'/compradores/save', {data}
        ).then(response => {
            CargandoSweet(1);
            if(response.data.error) {
                Success_Error_Mostrar('Error', response.data.info, 'error');
                return false;
            }
            Success_Error_Mostrar("Registro Correcto", response.data.info, "success");
            HandelGetCompradores();
            document.getElementById("closeModal").click();
            vaciarCampos();
        }).catch(function(error) {
            CargandoSweet(1);
            console.log(error);
            Success_Error_Mostrar('Error', error, 'error');
        });
    }

    const validarCampos = () => {
        if( datos.cedula.trim() === '' ) {
            Success_Error_Mostrar('Falta información', 'Documento obligatorio', 'warning');
            return false;
        }

        if( datos.nombre.trim() === '' ) {
            Success_Error_Mostrar('Falta información', 'Nombre abligatorio', 'warning');
            return false;
        }

        if( datos.apellido.trim() === '' ) {
            Success_Error_Mostrar('Falta información', 'Apellido abligatorio', 'warning');
            return false;
        }

        if( datos.telefono.trim() === '' ) {
            Success_Error_Mostrar('Falta información', 'Teléfono abligatorio', 'warning');
            return false;
        }

        if( datos.email.trim() === '' ) {
            Success_Error_Mostrar('Falta información', 'Email abligatorio', 'warning');
            return false;
        }

        if (datos.email !== '') {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(datos.email)) {
                Success_Error_Mostrar('Falta información', 'Formato de email invalido', 'warning');
                return false;
            }
        }
        return true;
    }

    const vaciarCampos = () => {
        setDatos({
            ...datos,
            cedula: '',
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            idComprador: 0
        });
        document.getElementById('cedula').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('email').value = '';
    }

    const HandelEditarComprador = (info) => {
        console.log(info);
        setDatos({
            // ...datos,
            cedula: info.cedula,
            nombre: info.nombre,
            apellido: info.apellido,
            telefono: info.telefono,
            email: info.email,
            idComprador: info.id
        })
        document.getElementById('cedula').value = info.cedula;
        document.getElementById('nombre').value = info.nombre
        document.getElementById('apellido').value = info.apellido;
        document.getElementById('telefono').value = info.telefono;
        document.getElementById('email').value = info.email
    }

    const HandelBorrarComprador = (info) => {
        MySwal.fire({
            title: "Esta Seguro?",
            text: "Desea eliminar comprador " + info.nombre + ' ' + info.apellido + "?",
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
                axios.post(globalFunctions.url+'/comprador/delete', {
                    idComprador: info.id
                })
                .then(function (response) {
                    CargandoSweet(1);
                    if(response.data.error) {
                        Success_Error_Mostrar('Error', response.data.info, 'error');
                        return false;
                    }
                    Success_Error_Mostrar("", response.data.info, "success");
                    HandelGetCompradores();
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

    const limpiarBusqueda = () => {
        setDatos({
            ...datos,
            campoBuscar: ''
        });
        document.getElementById('campoBuscar').value = '';
        setTimeout(() => {
            HandelGetCompradores();
        }, 1000);
    }

    useEffect(() => {
        HandelGetCompradores();
    }, [])
    

    return (
        <div className="content-wrapper">
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Compradores</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to={"/"}>Inicio</Link></li>
                            <li className="breadcrumb-item active">Compradores</li>
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
                            <button className="btn btn-primary" data-toggle="modal" data-target="#modalCompradores">Nuevo comprador</button>
                        </div>

                        {/* <div className="col-md-2 col-sm-6 col-xs-12">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-sm" onChange={handleInputChange} id="campoBuscar" name="campoBuscar" />
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <button className="btn btn-primary btn-sm" value="filter" onClick={HandelGetCompradores}>Buscar</button>
                            <button className="btn btn-secondary btn-sm" type="button" onClick={limpiarBusqueda}>Limpiar</button>
                        </div> */}

                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Documento</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        listaCompradores.map((comprador, index) => {
                                            return (
                                                <tr key={comprador.id}>
                                                    <td>{index+1}</td>
                                                    <td>{comprador.cedula}</td>
                                                    <td>{comprador.nombre}</td>
                                                    <td>{comprador.apellido}</td>
                                                    <td>{comprador.telefono}</td>
                                                    <td>{comprador.email}</td>
                                                    <td>
                                                    <button className="btn btn-warning btn-xs" title="Editar comprador" data-toggle="modal" data-target="#modalCompradores" onClick={() => HandelEditarComprador(comprador)}>
                                                        <i className="nav-icon fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button className="btn btn-danger btn-xs" title="Eliminar comprador" onClick={() => HandelBorrarComprador(comprador)}>
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
                            <div className="modal fade" id="modalCompradores" tabIndex="-1" aria-labelledby="modalCompradores" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Nuevo comprador</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="cedula" style={{marginBottom: 0}}>Documento</label>
                                                    <input type="text" className="form-control" id="cedula" name="cedula" onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="nombre" style={{marginBottom: 0}}>Nombre</label>
                                                    <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleInputChange}/>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="apellido" style={{marginBottom: 0}}>Apellido</label>
                                                    <input type="text" className="form-control" id="apellido" name="apellido" onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="telefono" style={{marginBottom: 0}}>Teléfono</label>
                                                    <input type="text" className="form-control" id="telefono" name="telefono" onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label htmlFor="email" style={{marginBottom: 0}}>Email</label>
                                                    <input type="text" className="form-control" id="email" name="email" onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={HandelClickGuardar}>Guardar</button>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeModal" onClick={vaciarCampos}>Cerrar</button>
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

export default Compradores