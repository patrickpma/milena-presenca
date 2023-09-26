import './App.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from "../src/img/02.png";
import { ListaGeral } from './ListaGeral';


function App() {

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
                  <td colspan="2"><span className='float-right' style={{ color: "#fc0fc0" }}><strong>{"*Confirme sua presença até dia 27/09/2023"}</strong></span></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </section>
      </div>
    )
  }

  return (
    // <div className="content" style={{ "minHeight": "2171.31px" }}>

    //   <section className="content-header">
    //     <div className="container-fluid">
    //       <div className="row mb-2">
    //         <div className="col-sm-6">
    //           <h1>Milena 15 Anos</h1>
    //         </div>
    //         <div className="col-sm-6">
    //           <ol className="breadcrumb float-sm-right">
    //             <li className="breadcrumb-item">Home</li>
    //             <li className="breadcrumb-item active">Milena 15 Anos</li>
    //           </ol>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section className="content">
    //     <div className="row">
    //       <div className="col-12 col-sm-12">
    //         <div className="card card-primary card-tabs">
    //           <div className="card-header p-0 pt-1">
    //             <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
    //               <li className="nav-item">
    //                 <a className="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Confirmar Presença</a>
    //               </li>
    //             </ul>
    //           </div>
    //           <div className="card-body">
    //             <div className="tab-content" id="custom-tabs-one-tabContent">
    //               <div className="tab-pane fade show active" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
    //                 <form>
    //                   <div className="form-group">
    //                     <label >Confirme a presença de sua família até dia 10/08/2023</label>
    //                     <div className="input-group input-group-lg">
    //                       <input type="text" className="form-control" placeholder={!expire ? "Digite o código do convite" : "Prazo para confirmação encerrado"} aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={key} readOnly={expire} />
    //                       <span className="input-group-append">
    //                         <span className="input-group-text" className={expire ? "input-group-text disabled" : "input-group-text"} onClick={handleShow}><i className="fas fa-search"></i></span>
    //                       </span>
    //                     </div>
    //                   </div>
    //                 </form>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div></div>
    //     <div className="container-fluid">
    //       <div className="row">
    //         <div className="col-md-12">


    //         </div>
    //       </div></div>
    //   </section>
    <div>
      {mode === 'admin' &&
        <ListaGeral data={convidados} onBack={handleClose} />
      }
      {mode !== 'admin' &&
        <div className="login-page" style={{ backgroundImage: mode !== 'admin' ? `url(${background})` : '', backgroundRepeat: 'repeat', backgroundSize: 'contain' }}>

          <div className="card card-outline" style={{ opacity: '0.7', width: '75%', minWidth: '250px', backgroundColor: '#f7acb0' }}>
            <div className="card-header">
              <h5 style={{ color: "#fc0fc0", fontWeight: 'bold' }}><strong>Confirme a presença de sua família até dia 27/09/2023</strong></h5>

            </div>
            <form>
              <div className="card-body">
                <form>
                  <div className="form-group">

                    <div className="input-group input-group-lg">
                      <input type="text" className="form-control" style={{ color: '#fc0fc0', fontWeight: 'bold' }} placeholder={!expire ? "Digite o código do convite" : "Prazo para confirmação encerrado"} aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={key} readOnly={expire} />
                      <span className="input-group-append">
                        <span className={expire ? "input-group-text disabled" : "input-group-text"} onClick={() => handleShow('convidado')}><i className="fas fa-search"></i></span>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="card-tools">
                  <Button className="btn btn-default float-right ml-2" onClick={() => handleShow('admin')}>Area Restrita</Button>
                </div>
              </div>
            </form>
          </div>

        </div >}

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'repeat', backgroundSize: 'contain' }}>
        <Modal.Header style={{ backgroundColor: '#f7acb0' }}>
          <Modal.Title><label style={{ color: "#fc0fc0" }}>Confirme quais convidados comparecerão</label></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#f7acb0' }}>
          {mode === 'convidado' && renderModal()}

        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f7acb0' }}>
          <Button variant="primary" onClick={handleSave}>Confirmar</Button>
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
