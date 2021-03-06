'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    className: _react.PropTypes.string,
    onCancel: _react.PropTypes.func,
    open: _react.PropTypes.bool
};

var defaultProps = {
    onCancel: function onCancel(e) {
        return e.preventDefault();
    }
};

var Dialog = function (_React$Component) {
    _inherits(Dialog, _React$Component);

    function Dialog() {
        _classCallCheck(this, Dialog);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog).apply(this, arguments));
    }

    _createClass(Dialog, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refs.dialog.addEventListener('cancel', this.props.onCancel);
            // if (this.props.open) {
            //     findDOMNode(this).showModal();
            // }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.open !== prevProps.open) {
                if (this.props.open) {
                    // findDOMNode(this).showModal();

                    // display the dialog at the right location
                    // needed for the polyfill, otherwise it's not at the right position
                    var bodyHeight = document.body.clientHeight;
                    var dialogHeight = this.refs.dialog.clientHeight;
                    this.refs.dialog.style.position = 'fixed';
                    this.refs.dialog.style.top = (bodyHeight - dialogHeight) / 2 + 'px';
                    // } else {
                    //     findDOMNode(this).close();
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.dialog.removeEventListener('cancel', this.props.onCancel);
        }
    }, {
        key: 'render',
        value: function render() {
            // We cannot set the `open` prop on the Dialog if we manage its state manually with `showModal`,
            // this the disabled eslint rule
            // eslint-disable-next-line no-unused-vars
            var _props = this.props;
            var className = _props.className;
            var open = _props.open;
            var onCancel = _props.onCancel;
            var children = _props.children;

            var otherProps = _objectWithoutProperties(_props, ['className', 'open', 'onCancel', 'children']);

            var classes = (0, _classnames2.default)('mdl-dialog', className, { 'is-open': open });

            return _react2.default.createElement(
                'div',
                _extends({ ref: 'dialog', className: classes }, otherProps, {
                    __self: this
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'app-dialog--box', __self: this
                    },
                    children
                )
            );
        }
    }]);

    return Dialog;
}(_react2.default.Component);

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

exports.default = Dialog;