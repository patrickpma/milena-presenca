import './App.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [show, setShow] = useState(false);
  const [key, setKey] = useState('');
  const [token, setToken] = useState('');
  const [convidados, setConvidados] = useState([]);

  const fetchData = () => {
    fetch('https://api.veolink.com.br/api/auth', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username: "patrick.cosme", password: "1234" })
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

  const handleShow = () => {
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
        setConvidados(json.data.filter(c => c.column3 === key));
        setShow(true);
        setKey('');
      }

    });

  }

  const handleChange = (e) => {
    let value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
    setKey(value);
  }

  const handleCheck = (e) => {
    let value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
    let name = e.target.id;

    let convidadosCopy = [...convidados];
    convidadosCopy[name].column4 = value;

    setConvidados(convidadosCopy);
  }

  return (
    <div className="content" style={{ "minHeight": "2171.31px" }}>

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Milena 15 Anos</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active">Milena 15 Anos</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-secondary card-outline">
                <form>
                  <div className="card-body">
                    <div className="form-group">
                      <label >Confirme a presença de sua família</label>
                      <div className="input-group input-group-lg">
                        <input type="text" className="form-control" placeholder="Digite o código do convite" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={key} />
                        <span className="input-group-append">
                          <button type="button" className="btn btn-success btn-flat" onClick={handleShow}>Seguir</button>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div></div>
      </section>



      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Confirme quais convidados comparecerão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <section className="content">
              <div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Convidado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {convidados.map((c, index) => {
                      return (
                        <tr key={index}>
                          <td><input type="checkbox" id={index} checked={c.column4} onChange={handleCheck}></input></td>
                          <td>{c.column2}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSave}>Confirmar</Button>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>

  );
}

export default App;
