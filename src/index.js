import React, { Component } from 'react';
import './style.scss';

export default class AsyncComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _Component: null,
      loading: true
    };

    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.onLoadStart === 'function') {
      this.props.onLoadStart();
    }

    if(!this.state.Component) {
      this.props.moduleProvider().then(({component}) => {
        this.setState({ _Component: component }, () => {
          if (typeof this.props.onLoadEnd === 'function') {
            this.props.onLoadEnd();
          }
        });
      });
    }

    this.loaderContainer.addEventListener('animationend', this.handleAnimationEnd);
  }

  componentWillUnmount() {
    if (typeof this.props.onLoadStart === 'function') {
      this.props.onLoadStart();
    }

    this.loaderContainer.removeEventListener('animationend', this.handleAnimationEnd);
  }

  handleAnimationEnd(e) {
    this.setState({ loading: false });
  }

  render() {
    const { _Component } = this.state;

    let loaderContainerClasses = ['loader-container'];

    if (!this.state.loading) {
      loaderContainerClasses.push('loaded');
    } else {
      if (_Component) {
        loaderContainerClasses.push('fade');
      }
    }

    return (
      <div className="async-component">
        <div ref={el => this.loaderContainer = el} className={loaderContainerClasses.join(' ')}>
          { this.props.loader || 'Loading...' }
        </div>
        {_Component ? <_Component {...this.props} /> : ''}
      </div>
    );
  }
};