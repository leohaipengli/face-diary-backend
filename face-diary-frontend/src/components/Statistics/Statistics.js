import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import ProgressBar from '../ProgressBar/ProgressBar';
import './Statistics.css';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getEmotionData() {
    return this.props.emotions;
  }

  render() {
    if (this.props.emotions) {
      var dict = this.getEmotionData();
      var keys = Object.keys(dict);
      const { open } = this.state;
      return (
        <div className="container">
          <div className="row">
            <button className="btn btn-primary col-12" onClick={this.onOpenModal}>
              View History Emotions
            </button>{' '}
          </div>
          <Modal
            open={open}
            onClose={this.onCloseModal}
            little
            classNames={{
              transitionEnter: 'transition-enter',
              transitionEnterActive: 'transition-enter-active',
              transitionExit: 'transition-exit-active',
              transitionExitActive: 'transition-exit-active',
            }}
            animationDuration={1000}
          >
            <div className="container statistics-con">
              <p className="statistics-title">Your Monthly Emotion Statistics</p>
              <div className="row">
                <div className="col-12">
                  {
                    keys.map((item, i) =>
                      <ProgressBar type={item} value={dict[item]} />
                    )
                  }
                </div>
              </div>
            </div>
          </Modal>
        </div>
      );
    }
    else{
      return(
        <button disabled className="btn btn-primary col-12" onClick={this.onOpenModal}>
          View History Emotions
        </button>
      );
    }
  }
}
