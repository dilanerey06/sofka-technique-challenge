import { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import QButtons from './QButtons';
import QInfo from './QInfo';
import QStatement from './QStatement';

//Questions component -> Control all the logic above the questions and it's intermediate
//between user - server

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQ: 0,
      optSelect: null,
    };
  }

  surrender = () => {
    console.log('Surrender Clicked :(');
    this.props.finishApp(0);
  };

  getPointQ = () => {
    const { currentQ } = this.state;
    switch (currentQ) {
      case 0:
        return 50; // Points question 1 and so on
      case 1:
        return 125;
      case 2:
        return 175;
      case 3:
        return 250;
      case 4:
        return 400;
      default:
        return 0;
    }
  };

  getQuestion = () => {
    const { questions } = this.props;
    const { currentQ } = this.state;
    const q = questions[currentQ];
    const opts = [q.opt_one, q.opt_two, q.opt_three, q.opt_four];
    return [q, opts];
  };

  validateAnswer = () => {
    const [q, opts] = this.getQuestion();
    const { optSelect } = this.state;
    if (q.opt_correct === opts[optSelect]) {
      console.log('Validate answer true');
      return true;
    }
    return false;
  };

  selectOpt = (i) => {
    this.setState({ optSelect: i });
  };

  sendAnswer = () => {
    if (this.state.optSelect === null) return;
    const { updateScore, finishApp } = this.props;
    if (!this.validateAnswer()) {
      updateScore(0).then((msg) => {
        console.log(msg);
        finishApp(1);
        return;
      });
    } else {
      console.log('It is correct');
      const { currentQ } = this.state;
      updateScore(this.getPointQ()).then((msg) => {
        console.log(msg);
        const newCurrentQ = currentQ + 1;
        if (newCurrentQ > 4) {
          return finishApp(2);
        }
        this.setState({ currentQ: currentQ + 1, optSelect: null });
      });
    }
  };

  getOptsProps = (i) => {
    return {
      key: i,
      action: true,
      variant: 'light',
      className: 'p-2',
      style: { cursor: 'pointer' },
      onClick: () => this.selectOpt(i),
    };
  };

  getInfoProps = (topic, category) => {
    return {
      topic: topic,
      category: category,
      currentQ: this.state.currentQ + 1,
      pointsQ: this.getPointQ(),
      score: this.props.score,
    };
  };

  getButtonsProps = () => {
    return {
      sendAnswer: this.sendAnswer,
      surrender: this.surrender,
    };
  };

  render() {
    const [q, opts] = this.getQuestion();
    return (
      <div className='w-75 text-center'>
        <QInfo {...this.getInfoProps(q.Topic, q.Category)} />
        <QStatement className='row fs-5 mb-4'>{q.statement}</QStatement>
        <ListGroup variant='flush' className='row mb-4'>
          {opts.map((opt, i) => {
            return (
              <ListGroup.Item {...this.getOptsProps(i)}>{opt}</ListGroup.Item>
            );
          })}
        </ListGroup>
        <QButtons {...this.getButtonsProps()} />
      </div>
    );
  }
}

export default Questions;
