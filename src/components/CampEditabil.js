import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class CampEditabil extends React.Component {
  render() {
    return (
      <InputGroup className="my-1 flex-nowrap">
        <Form.Control
          className={this.props.cellData.textAlign}
          type={this.props.cellData.type}
          placeholder={this.props.cellData.placeholder}
          min={this.props.cellData.min}
          name={this.props.cellData.name}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          step={this.props.cellData.step}
          presicion={this.props.cellData.presicion}
          aria-label={this.props.cellData.name}
          onChange={this.props.onItemizedItemEdit}
          required
        />
        {
          this.props.cellData.leading != null &&
          <InputGroup.Text
            className="bg-light fw-bold border-0 text-secondary px-2">
            <span>
              {this.props.cellData.leading}
            </span>
          </InputGroup.Text>
        }
        
      </InputGroup>
    );
  }
}

export default CampEditabil;
