import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ProdusFactura from './ProdusFactura';
import ModalFactura from './ModalFactura';
import InputGroup from 'react-bootstrap/InputGroup';
var x = 0;
class FormularFactura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eDeschis: false,
      moneda: 'RON',
      dataCurenta: '',
      numarFactura: 1,
      dataScadenta: '',
      cumparator: '',
      cumparatorEmail: '',
      cumparatorAdresa: '',
      furnizor: '',
      furnizorEmail: '',
      furnizorAdresa: '',
      observatii: '',
      total: '0.00',
      subTotal: '0.00',
      TVAProcent: '',
      TVAValoare: '0.00',
      discountProcent: '',
      discountValoare: '0.00'
    };
    this.state.items = [
      {
        id: 0,
        name: '',
        descriere: '',
        pret: '1.00',
        cantitate: 1
      }
    ];
    this.editeazaCamp = this.editeazaCamp.bind(this);
  }
  componentDidMount(prevProps) {
    this.handleCalculateTotal()
  }
  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  };
  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: '',
      pret: '1.00',
      descriere: '',
      cantitate: 1,
    }
    this.state.items.push(items);
    this.setState(this.state.items);
  }
  handleCalculateTotal() {
    var items = this.state.items;
    var subTotal = 0;

    items.map(function(items) {
      subTotal = parseFloat(subTotal + (parseFloat(items.pret).toFixed(2) * parseInt(items.cantitate))).toFixed(2);
    });

    this.setState({
      subTotal: parseFloat(subTotal).toFixed(2)
    }, () => {
      this.setState({
        TVAValoare: parseFloat(parseFloat(subTotal) * (this.state.TVAProcent / 100)).toFixed(2)
      }, () => {
        this.setState({
          discountValoare: parseFloat(parseFloat(subTotal) * (this.state.discountProcent / 100)).toFixed(2)
        }, () => {
          this.setState({
            total: ((subTotal - this.state.discountValoare) + parseFloat(this.state.TVAValoare))
          });
        });
      });
    });

  };
  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var items = this.state.items.slice();
    var newItems = items.map(function(items) {
      for (var key in items) {
        if (key == item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({items: newItems});
    this.handleCalculateTotal();
  };
  editeazaCamp = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.handleCalculateTotal();
  };
  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };
  openModal = (event) => {
    event.preventDefault()
    this.handleCalculateTotal()
    this.setState({eDeschis: true})
  };
  closeModal = (event) => this.setState({eDeschis: false});
  render() {
    return (<Form onSubmit={this.openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div class="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div class="mb-2">
                    <span className="fw-bold">Data&nbsp;Curentă:&nbsp;</span>
                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Data&nbsp;Scadentă:</span>
                  <Form.Control type="date" value={this.state.dataScadenta} name={"dataScadenta"} onChange={(event) => this.editeazaCamp(event)} style={{
                      maxWidth: '150px'
                    }} required="required"/>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Număr&nbsp;Factură:&nbsp;</span>
                <Form.Control type="number" value={this.state.numarFactura} name={"numarFactura"} onChange={(event) => this.editeazaCamp(event)} min="1" style={{
                    maxWidth: '70px'
                  }} required="required"/>
              </div>
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Cumpărător:</Form.Label>
                <Form.Control placeholder={"Denumire cumpărător"} rows={3} value={this.state.cumparator} type="text" name="cumparator" className="my-2" onChange={(event) => this.editeazaCamp(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email cumpărător"} value={this.state.cumparatorEmail} type="email" name="cumparatorEmail" className="my-2" onChange={(event) => this.editeazaCamp(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Adresă cumpărător"} value={this.state.cumparatorAdresa} type="text" name="cumparatorAdresa" className="my-2" autoComplete="address" onChange={(event) => this.editeazaCamp(event)} required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Furnizor:</Form.Label>
                <Form.Control placeholder={"Denumire furnizor"} rows={3} value={this.state.furnizor} type="text" name="furnizor" className="my-2" onChange={(event) => this.editeazaCamp(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email furnizor"} value={this.state.furnizorEmail} type="email" name="furnizorEmail" className="my-2" onChange={(event) => this.editeazaCamp(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Adresă furnizor"} value={this.state.furnizorAdresa} type="text" name="furnizorAdresa" className="my-2" autoComplete="address" onChange={(event) => this.editeazaCamp(event)} required="required"/>
              </Col>
            </Row>
            <ProdusFactura onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} moneda={this.state.moneda} items={this.state.items}/>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:
                  </span>
                  <span>
                    {this.state.subTotal}{" "}{this.state.moneda}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({this.state.discountProcent || 0}%)</span>
                    
                    {this.state.discountValoare || 0}{" "}{this.state.moneda}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">TVA:
                  </span>
                  <span>
                    <span className="small ">({this.state.TVAProcent || 0}%)</span>
                    {this.state.TVAValoare || 0}{" "}{this.state.moneda}</span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total:
                  </span>
                  <span className="fw-bold">
                    {this.state.total || 0}{" "}{this.state.moneda}</span>
                </div>
              </Col>
            </Row>
            <hr className="my-4"/>
            <Form.Label className="fw-bold">Observații:</Form.Label>
            <Form.Control placeholder="Factura este valabilă fără semnătură și ștampilă conform art. 155 (19) din Codul Fiscal." name="observatii" value={this.state.observatii} onChange={(event) => this.editeazaCamp(event)} as="textarea" className="my-2" rows={1}/>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">Verifică Factura</Button>
            <ModalFactura showModal={this.state.eDeschis} closeModal={this.closeModal} info={this.state} items={this.state.items} moneda={this.state.moneda} subTotal={this.state.subTotal} TVAValoare={this.state.TVAValoare} discountValoare={this.state.discountValoare} total={this.state.total}/>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Moneda:</Form.Label>
              <Form.Select onChange={event => this.onCurrencyChange({moneda: event.target.value})} className="btn btn-light my-1" aria-label="Schimbă moneda">
                <option value="RON">RON (RON)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Procent TVA:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="TVAProcent" type="number" value={this.state.TVAProcent} onChange={(event) => this.editeazaCamp(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Procent Discount:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="discountProcent" type="number" value={this.state.discountProcent} onChange={(event) => this.editeazaCamp(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>)
  }
}

export default FormularFactura;
