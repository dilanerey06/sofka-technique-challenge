// import './App.css';
import { Component } from 'react';
import Register from './components/Register/Register';
import Title from './components/Title';
import Questions from './components/Questions/Questions';
import Axios from 'axios';
import Records from './components/Records/Records';
import FinishPg from './components/FinishPg/FinishPg';
import { CloseButton } from 'react-bootstrap';

let initialState = {
  started: false,
  showRecords: false,
  currentUserID: -2,
  score: 0,
  // questions: [],
  topUsers: [],
  finished: false,
  finishMsg: '',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      showRecords: false,
      currentUserID: -2,
      score: 0,
      questions: [],
      topUsers: [],
      finished: false,
      finishMsg: '',
    };
  }

  restart = () => {
    this.fetchQuestions().then((dataQ) => {
      this.fetchTopUsers().then((topUsers) => {
        this.setState({
          ...initialState,
          questions: dataQ,
          topUsers: topUsers,
        });
      });
    });
  };

  componentDidMount = () => {
    this.fetchTopUsers().then((topUsers) => {
      this.setState({ topUsers: topUsers });
    });
    this.fetchQuestions().then((dataQ) => {
      this.setState({ questions: dataQ });
    });
  };

  fetchTopUsers = () => {
    return new Promise((resolve, reject) => {
      this.fetchData('users/records')
        .then((topUsers) => {
          resolve(topUsers);
        })
        .catch((err) => reject(err));
    });
  };

  fetchQuestions = () => {
    return new Promise((resolve, reject) => {
      this.fetchData('questions')
        .then((dataQ) => {
          resolve(dataQ);
        })
        .catch((err) => reject(err));
    });
  };

  fetchData = (path) => {
    const url = `http://localhost:3001/api/${path}/`;
    return Axios.get(url)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };

  postUser = () => {
    return new Promise((resolve, reject) => {
      const nameInsert = document.getElementById('name').value;
      if (nameInsert.length === 0) return resolve(0);
      Axios.post('http://localhost:3001/api/users/insert', { name: nameInsert })
        .then((res) => {
          resolve(res.data.insertId);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
      document.getElementById('name').value = '';
    });
  };

  updateGameState = () => {
    this.postUser().then((insertedId) => {
      if (insertedId <= 0) {
        console.log('Not valid');
        this.setState({ currentUserID: insertedId, started: false });
        return;
      }
      this.setState({ currentUserID: insertedId, started: true });
    });
  };

  updateScore = (points) => {
    return new Promise((resolve, reject) => {
      if (points === 0) {
        this.setState({ score: 0 });
        resolve('Ok');
        return;
      } else {
        const { score } = this.state;
        this.setState({ score: score + points });
        resolve('Ok');
        return;
      }
    });
  };

  actShowRecords = () => {
    const { showRecords } = this.state;
    if (showRecords) return;
    this.setState({ showRecords: true });
  };

  putFinishData = () => {
    const { currentUserID, score } = this.state;
    const bodyPut = { id: currentUserID, score: score };
    return new Promise((resolve, reject) => {
      Axios.put('http://localhost:3001/api/users/update-score', { ...bodyPut })
        .then((res) => {
          resolve(res.message);
        })
        .catch((err) => reject(err));
    });
  };

  getFinishMsg = (id) => {
    switch (id) {
      case 0:
        return 'Ok... you decided to give up. Very conservator.';
      case 1:
        return 'Oh... you was wrong with the question and lost all the points :(';
      case 2:
        return 'Nice! You have been finished all the game and got the max score. Well Done!';
      default:
        return;
    }
  };

  finishApp = (id) => {
    const finishMsg = this.getFinishMsg(id);
    this.putFinishData()
      .then((msg) => {
        console.log(msg);
        this.fetchTopUsers()
          .then((topUsers) => {
            this.setState({
              topUsers: topUsers,
              finished: true,
              finishMsg: finishMsg,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  questionsProps = () => {
    const { questions, score } = this.state;
    return {
      questions: questions,
      score: score,
      updateScore: this.updateScore,
      finishApp: this.finishApp,
    };
  };

  registerProps = () => {
    return {
      showRecords: this.actShowRecords,
      updateState: this.updateGameState,
      userId: this.state.currentUserID,
    };
  };

  finishPgProps = () => {
    return {
      finishMsg: this.state.finishMsg,
      score: this.state.score,
      restart: this.restart,
      showRecords: this.actShowRecords,
    };
  };

  closeButtonProps = () => {
    return {
      className: 'position-absolute top-0 start-0 mt-3 ms-3',
      onClick: () => this.setState({ showRecords: false }),
    };
  };

  getMainContain = () => {
    const { started, showRecords, topUsers, finished } = this.state;
    if (finished) {
      if (showRecords) return <Records topUsers={topUsers} />;
      return <FinishPg {...this.finishPgProps()} />;
    }
    if (started) return <Questions {...this.questionsProps()} />;
    if (!started) {
      if (showRecords) return <Records topUsers={topUsers} />;
      return <Register {...this.registerProps()} />;
    }
  };

  render() {
    const { showRecords } = this.state;
    return (
      <div className='container h-75 bg-white rounded-3 p-4 d-flex flex-column align-items-center justify-content-evenly flex-wrap position-relative shadow'>
        {showRecords ? <CloseButton {...this.closeButtonProps()} /> : null}
        <Title>TRIVIA GAME</Title>
        {this.getMainContain()}
      </div>
    );
  }
}

export default App;
