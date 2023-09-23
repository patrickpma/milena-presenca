import './App.css';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import { Utils } from './Utils';
export function ListaGeral(props) {
    const convidados = props.data;
    const [show, setShow] = useState(false);

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
            props.onBack()
        }
        else {
            setShow(true);
        }
       
    }

    return (
        <React.Fragment>
            {!isLoged() &&
                <Login authenticate={handleAuth}></Login>
            }
            {isLoged() && <div className="login-page">
                <h5 style={{ fontWeight: 'bold' }}><strong>Confirme a presença de sua família até dia 27/09/2023</strong></h5>
                <div className="card card-primary card-outline" style={{ opacity: '0.7', width: '75%', height: '75%', minWidth: '250px', overflow: 'auto' }}>
                    <section className="content">
                        <div>
                            <Table striped bordered hover style={{ width: '100%', height: '50%' }}>
                                <thead>
                                    <tr>
                                        <th><span >Convidado</span></th>
                                        <th><span >Código</span></th>
                                        <th><span >Status</span></th>
                                        <th><span >Data Confirmação</span></th>
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
                                                <td><span >{c.column2}</span></td>
                                                <td><span >{c.column3}</span></td>
                                                <td><span >{c.column4 ? 'Confirmando' : ''}</span></td>
                                                <td><span >{Utils.dateFix(c.confirmacao)}</span></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </section>
                </div>
                <div className="card card-primary card-outline" style={{ opacity: '0.7', width: '75%', overflow: 'auto' }}>
                <div className="card-footer">
                <div className="card-tools float-right">
                <Button className="btn btn-default ml-2" onClick={onBack}>Voltar</Button>
                <Button className="btn btn-default float-right ml-2" onClick={onExit}>Sair e Voltar</Button>
                </div>
              </div>
                </div>
               
            </div>}
        </React.Fragment>
    )
}