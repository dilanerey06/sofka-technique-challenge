import { Component } from 'react';
import ContentMsg from '../ContentMsg';
import { ListGroup } from 'react-bootstrap';
class Records extends Component {
  render() {
    const { topUsers } = this.props;
    return (
      <div className='w-75 p-1 text-center'>
        <ContentMsg className='mb-3'>
          Here you can see the top score records.
        </ContentMsg>
        <ListGroup>
          <ListGroup.Item className='d-flex flex-row justify-content-between flex-wrap'>
            <div>#</div>
            <div className='w-50'>Nickname</div>
            <div className='w-25'>Score</div>
          </ListGroup.Item>
          {topUsers.map((user, i) => {
            return (
              <ListGroup.Item
                key={i}
                className='d-flex flex-row justify-content-between flex-wrap'
              >
                <span className='badge bg-primary rounded-circle pt-2'>
                  {i + 1}
                </span>
                <div className='w-50'>{user.name}</div>
                <div className='w-25'>{user.score}</div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default Records;
