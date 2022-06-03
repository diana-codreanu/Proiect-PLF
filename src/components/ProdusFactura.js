import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import CampEditabil from './CampEditabil';

class ProdusFactura extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var moneda = this.props.moneda;
    var rowDel = this.props.onRowDel;
    var tablouProduse = this.props.items.map(function(item) {
      return (
        <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={rowDel.bind(this)} key={item.id} moneda={moneda}/>
      )
    });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>PRODUS/SERVICIU</th>
              <th className="text-center">CANTITATE</th>
              <th className="text-center">PREȚ</th>
              <th className="text-center">ACȚIUNE</th>
            </tr>
          </thead>
          <tbody>
            {tablouProduse}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>Adaugă</Button>
      </div>
    );

  }

}
class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <tr>
        <td style={{width: '100%'}}>
          <CampEditabil
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "name",
            placeholder: "Denumire produs/serviciu",
            value: this.props.item.name,
            id: this.props.item.id,
          }}/>
          <CampEditabil
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "descriere",
            placeholder: "Descriere produs/serviciu",
            value: this.props.item.descriere,
            id: this.props.item.id
          }}/>
        </td>
        <td style={{minWidth: '70px'}}>
          <CampEditabil
          onItemizedItemEdit={this.props.onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "cantitate",
            min: 1,
            step: "1",
            value: this.props.item.cantitate,
            id: this.props.item.id,
          }}/>
        </td>
        <td style={{minWidth: '130px'}}>
          <CampEditabil
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            leading: this.props.moneda,
            type: "number",
            name: "pret",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: this.props.item.pret,
            id: this.props.item.id,
          }}/>
        </td>
        <td className="text-center" style={{minWidth: '50px'}}>
          <BiTrash onClick={this.onDelEvent.bind(this)} style={{height: '33px', width: '33px', padding: '7.5px'}} className="text-white mt-1 btn btn-danger"/>
        </td>
      </tr>
    );

  }

}

export default ProdusFactura;
