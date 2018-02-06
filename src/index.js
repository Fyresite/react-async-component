import React, { Component } from 'react';

export default class AsyncComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _Component: null
    };
  }

  componentWillMount() {
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
  }

  componentWillUnmount() {
    if (typeof this.props.onLoadStart === 'function') {
      this.props.onLoadStart();
    }
  }

  render() {
    const { _Component } = this.state;

    let loaderStyle = {
      opacity: _Component === null ? 1 : 0,
      transition: 'opacity 500ms'
    };

    return (
      <div style={{ height: 'inherit', width: 'inherit' }}>
        <div className="loader-container" style={loaderStyle}>
          { this.props.loader || 'Loading...' }
        </div>
        {_Component ? <_Component {...this.props} /> : ''}
      </div>
    );
  }
};