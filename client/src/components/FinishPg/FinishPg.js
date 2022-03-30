import { Component } from 'react';
import ContentMsg from '../ContentMsg';
import { Form, Button } from 'react-bootstrap';
class FinishPg extends Component {
  buttonProps = (func) => {
    return {
      onClick: func,
      variant: 'outline-primary',
      className: 'w-25',
    };
  };
  render() {
    const { finishMsg, score, restart, showRecords } = this.props;
    return (
      <div className='w-75 d-flex flex-column p-1 text-center'>
        <ContentMsg className='mb-1'>{finishMsg}</ContentMsg>
        <ContentMsg className='mb-1'>Your score is: {score}.</ContentMsg>
        <ContentMsg className='mb-1'>
          Thanks for playing! Next you can choose either restart the app or see
          the records updated.
        </ContentMsg>
        <Form.Group className='mb-3 d-flex justify-content-evenly flex-wrap w-100'>
          <Button {...this.buttonProps(restart)}>Restart Game</Button>
          <Button {...this.buttonProps(showRecords)}>Records</Button>
        </Form.Group>
      </div>
    );
  }
}
export default FinishPg;
