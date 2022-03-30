import { Component } from 'react';

class QInfo extends Component {
  render() {
    const { topic, category, currentQ, pointsQ, score } = this.props;
    return (
      <div className='row mb-4 fs-6 d-flex flex-row justify-content-between flex-wrap'>
        <div className='w-25 text-start'>
          {topic} / {category}
        </div>
        <div className='w-25 text-center'>
          Question #{currentQ} ({pointsQ} Points)
        </div>
        <div className='w-25 text-end'>Score: {score}</div>
      </div>
    );
  }
}

export default QInfo;
