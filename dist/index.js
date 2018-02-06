'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncComponent = function (_Component2) {
  _inherits(AsyncComponent, _Component2);

  function AsyncComponent(props) {
    _classCallCheck(this, AsyncComponent);

    var _this = _possibleConstructorReturn(this, (AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).call(this, props));

    _this.state = {
      _Component: null
    };
    return _this;
  }

  _createClass(AsyncComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (typeof this.props.onLoadStart === 'function') {
        this.props.onLoadStart();
      }

      if (!this.state.Component) {
        this.props.moduleProvider().then(function (_ref) {
          var component = _ref.component;

          _this2.setState({ _Component: component }, function () {
            if (typeof _this2.props.onLoadEnd === 'function') {
              _this2.props.onLoadEnd();
            }
          });
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (typeof this.props.onLoadStart === 'function') {
        this.props.onLoadStart();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _Component = this.state._Component;


      var loaderStyle = {
        opacity: _Component === null ? 1 : 0,
        transition: 'opacity 500ms'
      };

      return _react2.default.createElement(
        'div',
        { style: { height: 'inherit', width: 'inherit' } },
        _react2.default.createElement(
          'div',
          { className: 'loader-container', style: loaderStyle },
          this.props.loader || 'Loading...'
        ),
        _Component ? _react2.default.createElement(_Component, this.props) : ''
      );
    }
  }]);

  return AsyncComponent;
}(_react.Component);

exports.default = AsyncComponent;
;