import './App.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gift from "./img/gift-box-icon-in-trendy-minimalist-style-vector-35044335.jpg";
import grandeDia from "./img/para--o-grande-dia-base.jpg";

function App() {

  const [show, setShow] = useState(false);
  const [key, setKey] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState(false);
  const [convidados, setConvidados] = useState([]);

  const fetchData = () => {

    let hoje = new Date();
    let dataLimite = new Date(2023, 7, 10);

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
        setKey('');
      }

    });

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

  const handleDica = (i) => {
    setShow(true);

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
                      <label >Confirme a presença de sua família até dia 10/08/2023</label>
                      <div className="input-group input-group-lg">
                        <input type="text" className="form-control" placeholder={!expire ? "Digite o código do convite" : "Prazo para confirmação encerrado"} aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={key} readOnly={expire} />
                        <span className="input-group-append">
                          <button type="button" className={expire ? "btn btn-success disabled btn-flat" : "btn btn-success btn-flat"} onClick={handleShow}>Seguir</button>
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5 col-sm-4">
                        <img class="profile-user-img img-fluid img-circle" src={gift} alt="User profile picture" />
                      </div>
                      <div className="col-5 col-sm-4">
                        <img class="profile-user-img img-fluid img-circle" src={gift} alt="User profile picture" />
                      </div>
                      <div className="col-5 col-sm-4">
                        <img class="profile-user-img img-fluid img-circle" src={gift} alt="User profile picture" onClick={() => handleDica(1)} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div></div>
      </section>



      {/* <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg'>
        <Modal.Header>
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
                    <tr>
                      <td colspan="2"><span className='float-right'><strong>{"*Confirme sua presença até dia 10/08/2023"}</strong></span></td>
                    </tr>
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
      </Modal> */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Body>
          <div>
            <section className="content">
              <img class="" src={grandeDia} alt="User profile picture" />
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
