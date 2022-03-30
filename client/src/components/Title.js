import { Component } from 'react';

// const styles = {
//   title: {
//     backgroundColor: 'yellow',
//     // width: '80%',
//     textAlign: 'center',
//     color: '#23272a',
//     // marginBottom: '3%',
//   },
// };

class Title extends Component {
  render() {
    const { children } = this.props;
    return <div className='fs-1 fw-bold text-center'>{children}</div>;
  }
}

export default Title;
