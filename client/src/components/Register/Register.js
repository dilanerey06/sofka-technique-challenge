import { Component } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import ContentMsg from '../ContentMsg';

class Register extends Component {
  formFeedBack = () => {
    const { userId } = this.props;
    switch (userId) {
      case 0:
        return { feedbackMsg: 'Nickname not typed', nameInvalid: true };
      case -1:
        return {
          feedbackMsg: 'Nickname already exists',
          nameInvalid: true,
        };
      default:
        return { feedbackMsg: '', nameInvalid: false };
    }
  };

  formControlProps = () => {
    const { nameInvalid } = this.formFeedBack();
    return {
      type: 'text',
      placeholder: 'Nickname',
      className: 'w-100 rounded-1',
      id: 'name',
      required: true,
      isInvalid: nameInvalid,
    };
  };

  getRegisterMsg = () => {
    let msg =
      'Welcome to our Trivia Game, Your first step is register with your ';
    msg +=
      'nickname and then you can start to play. The trivia consist in a game of 5 levels of difficulty, ';
    msg +=
      'each level contain 5 different questions of differents topics (Maths, Spanish Language, English, ';
    msg +=
      'Science and General culture), if you pass through all the nivels you are going to win the max ';
    msg += 'score. Lets get started!';
    return msg;
  };

  buttonProps = (func) => {
    return {
      onClick: func,
      variant: 'outline-primary',
      className: 'w-25',
    };
  };

  render() {
    const { updateState, showRecords } = this.props;
    // console.log(this.props.userId);
    // console.log(this.state);
    const { feedbackMsg } = this.formFeedBack();
    return (
      <div className='w-75 d-flex flex-column p-1'>
        <ContentMsg className='mb-4'>{this.getRegisterMsg()}</ContentMsg>
        <Form className='align-self-center w-75'>
          <InputGroup hasValidation className='mb-4'>
            <Form.Label>Nickname Here</Form.Label>
            <Form.Control {...this.formControlProps()} />
            <Form.Control.Feedback type='invalid'>
              Please choose a valid nickname err: {feedbackMsg}.
            </Form.Control.Feedback>
          </InputGroup>
          <Form.Group className='mb-3 d-flex justify-content-evenly flex-wrap w-100'>
            <Button {...this.buttonProps(updateState)}>Start Game</Button>
            <Button {...this.buttonProps(showRecords)}>Records</Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Register;
