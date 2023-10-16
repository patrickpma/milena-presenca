import './App.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from "../src/img/02.png";
import { ListaGeral } from './ListaGeral';


function AppVoid() {

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('');
  const [key, setKey] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState(false);
  const [convidados, setConvidados] = useState([]);

  const fetchData = () => {

    let hoje = new Date();
    let dataLimite = new Date(2023, 8, 30);

    setExpire(hoje > dataLimite);

    fetch('https://api.veolink.com.br/api/auth', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username: "patrick.oliveira@veolink.com.br", password: "1234" })
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === '200') {
          setToken(json.data.token);
        }
      })

  }
  useEffect(fetchData, []);

  const handleClose = () => {
    setShow(false);
    setMode('');
  };

  const handleSave = () => {
    for (let index = 0; index < convidados.length; index++) {
      const element = convidados[index];
      fetch('https://api.veolink.com.br/api/portal/crud/_Table_1/' + element.column1 + '/column1', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(element),
        method: 'PUT',
      }).then(res => res.json()).catch(error => console.log(error));;
    }

    toast.success("Confirmado com sucesso.");
    setShow(false);
  };

  const handleShow = (mode) => {

    if (mode === 'admin') {


      let where = '';

      fetch(`https://api.veolink.com.br/api/portal/crud/_Table_1?filter=${where}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'GET',
      }).then(res => res.json()).then(json => {

        setConvidados(json.data.sort((a, b) => {
          if (a.column2 > b.column2)
            return 1;
          if (a.column2 < b.column2)
            return -1;
          // a must be equal to b
          return 0;
        }));
        setMode(mode)
        setKey('');
      });

    }
    else {
      if (expire)
        return;

      let where = '';

      if (!key) {
        toast.error('Você esqueceu de informar o Código.');
        return;
      }

      fetch(`https://api.veolink.com.br/api/portal/crud/_Table_1?filter=${where}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'GET',
      }).then(res => res.json()).then(json => {

        let filtered = json.data.filter(c => c.column3 === key);

        if (filtered.length === 0)
          toast.error('Código digitado não encontrado.');
        else {
          setConvidados(json.data.filter(c => c.column3 === key).sort((a, b) => {
            if (a.column2 > b.column2)
              return 1;
            if (a.column2 < b.column2)
              return -1;
            // a must be equal to b
            return 0;
          }));
          setShow(true);
          setMode(mode)
          setKey('');
        }

      });

    }


  }

  const handleChange = (e) => {
    let value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
    setKey(value.toUpperCase());
  }

  const handleCheck = (e) => {
    let value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
    let name = e.target.id;

    let convidadosCopy = [...convidados];
    convidadosCopy[name].column4 = value;

    setConvidados(convidadosCopy);
  }

  const renderModal = () => {
    return (
      <div>
        <section className="content">
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th><span style={{ color: "#fc0fc0" }}>#</span></th>
                  <th><span style={{ color: "#fc0fc0" }}>Convidado</span></th>
                </tr>
              </thead>
              <tbody>
                {convidados.map((c, index) => {
                  return (
                    <tr key={index}>
                      <td><input type="checkbox" id={index} checked={c.column4} onChange={handleCheck} style={{ accentColor: "#fc0fc0" }}></input></td>
                      <td><span style={{ color: "#fc0fc0" }}>{c.column2}</span></td>
                    </tr>
                  )
                })}
                <tr>
                  <td colspan="2"><span className='float-right' style={{ color: "#fc0fc0" }}><strong>{"*Confirme sua presença até dia 30/09/2023"}</strong></span></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
    </div>

  );
}

export default AppVoid;
