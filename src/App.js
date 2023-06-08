import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
function App() {

  const [show, setShow] = useState(false);
  const [key, setKey] = useState('');

  const handleClose = () => {
    setShow(false);
    setKey('');
  };

  const handleShow = (_char) => {
    if (key === '')
    {
      alert('Você esqueceu de informar a chave.');
      return;
    }
    
    setShow(true);
  }
  const handleChange = (e) => {
    let value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
    setKey(value);
}
  return (
    <>
      <div class="container-fluid" >
        <section className="content" style={{ padding: '20rem' }}>
          <div>

            <InputGroup className="mb-3">
              <Form.Control placeholder="Digite a chave do convite" aria-label="Recipient's username" aria-describedby="basic-addon2" size="lg" onChange={handleChange} value={key} />
              <Button variant="outline-success" id="button-addon2" onClick={() => handleShow('')} size="lg">
                Seguir
              </Button>
            </InputGroup>


          </div>
        </section>

      </div>
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
                    <tr>
                      <td><input type="checkbox"></input></td>
                      <td>Patrick Cosme de Oliveira</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox"></input></td>
                      <td>Cleide de Souza Oliveira</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox"></input></td>
                      <td>Milena Rebecca de Souza Oliveira</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox"></input></td>
                      <td>Thales Gabriel de Souza Oliveira</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </section>

          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success">Confirmar</Button>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
