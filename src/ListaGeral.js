import './App.css';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import { Utils } from './Utils';
export function ListaGeral(props) {
    const convidados = props.data;
    const [show, setShow] = useState(false);
    const onImprimir = () => {
        window.print();
    }

    const onBack = () => {
        props.onBack()
    }
    const onExit = () => {
        localStorage.clear();
        props.onBack()
    }
    const isLoged = () => {
        return localStorage.getItem("success") || show;
    }
    const handleAuth = (loged) => {
        if (!loged) {
            localStorage.clear();
            alert("Usuario ou senha incorretos.")
        };
        setShow(true);
    }

    return (
        <React.Fragment>
            {!isLoged() &&
                <Login authenticate={handleAuth}></Login>
            }
            {isLoged() && <div className="login-page">
                <h5 style={{ color: "#fc0fc0", fontWeight: 'bold' }}><strong>Confirme a presença de sua família até dia 27/09/2023</strong></h5>
                <div className="card card-primary card-outline" style={{ opacity: '0.7', width: '75%', height: '75%', minWidth: '250px', overflow: 'auto' }}>
                    <section className="content">
                        <div>
                            <Table striped bordered hover style={{ width: '100%', height: '50%' }}>
                                <thead>
                                    <tr>
                                        <th><span style={{ color: "#fc0fc0" }}>Convidado</span></th>
                                        <th><span style={{ color: "#fc0fc0" }}>Código</span></th>
                                        <th><span style={{ color: "#fc0fc0" }}>Status</span></th>
                                        <th><span style={{ color: "#fc0fc0" }}>Data Confirmação</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {convidados.sort((a, b) => {
                                        if (a.column3 > b.column3)
                                            return 1;
                                        if (a.column3 < b.column3)
                                            return -1;
                                        // a must be equal to b
                                        return 0;
                                    }).map((c, index) => {
                                        return (
                                            <tr key={index}>
                                                <td><span style={{ color: "#fc0fc0" }}>{c.column2}</span></td>
                                                <td><span style={{ color: "#fc0fc0" }}>{c.column3}</span></td>
                                                <td><span style={{ color: "#fc0fc0" }}>{c.column4 ? 'Confirmando' : ''}</span></td>
                                                <td><span style={{ color: "#fc0fc0" }}>{Utils.dateFix(c.confirmacao)}</span></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </section>
                </div>
                <a className="nav-link active float-right" href="#" data-toggle="tab" onClick={onBack}>Voltar</a>
                <a className="nav-link active float-right" href="#" data-toggle="tab" onClick={onExit}>Sair e Voltar</a>
            </div>}
        </React.Fragment>
    )
}