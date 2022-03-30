import { Component } from 'react';
import { Button } from 'react-bootstrap';

class QButtons extends Component {
  getButtonProps = (func) => {
    return {
      className: 'w-25',
      variant: 'outline-primary',
      onClick: func,
    };
  };
  render() {
    const { sendAnswer, surrender } = this.props;
    return (
      <div className='row d-flex justify-content-evenly'>
        <Button {...this.getButtonProps(surrender)}>Surrender</Button>
        <Button {...this.getButtonProps(sendAnswer)}>Confirm</Button>
      </div>
    );
  }
}

export default QButtons;
