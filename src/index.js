import React, { Component } from 'react';
import './style.scss';

export default class AsyncComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _Component: null,
      loading: true
    };

    // this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  componentDidMount() {
    // if (typeof this.props.onLoadStart === 'function') {
    //   this.props.onLoadStart();
    // }

    if(!this.state._Component) {
      this.props.moduleProvider().then(({ component }) => {
        this.setState({
          _Component: component,
          loading: false
        }, () => {
          // if (typeof this.props.onLoadEnd === 'function') {
          //   this.props.onLoadEnd();
          // }
        });
      });
    }

    // this.loaderContainer.addEventListener('animationend', this.handleAnimationEnd);
  }

  componentWillUnmount() {
    // if (typeof this.props.onLoadStart === 'function') {
    //   this.props.onLoadStart();
    // }

    // this.loaderContainer.removeEventListener('animationend', this.handleAnimationEnd);
  }

  // handleAnimationEnd(e) {
  //   this.setState({ loading: false });
  // }

  render() {
    const { _Component } = this.state;

    // let loaderContainerClasses = ['loader-container'];

    // if (!this.state.loading) {
    //   loaderContainerClasses.push('loaded');
    // } else {
    //   if (_Component) {
    //     loaderContainerClasses.push('fade');
    //   }
    // }

    return (
      <div className="async-component">
        { this.state.loading ? this.props.loader || 'Loading...' : <_Component {...this.props} /> }
      </div>
    );
  }
};