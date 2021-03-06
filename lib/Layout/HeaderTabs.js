'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TabBar = require('../Tabs/TabBar');

var _TabBar2 = _interopRequireDefault(_TabBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var HeaderTabs = function HeaderTabs(props) {
    var className = props.className;
    var ripple = props.ripple;
    var children = props.children;

    var otherProps = _objectWithoutProperties(props, ['className', 'ripple', 'children']);

    var classes = (0, _classnames2.default)({
        'mdl-js-ripple-effect': ripple
    }, className);

    return _react2.default.createElement(
        _TabBar2.default,
        _extends({ cssPrefix: 'mdl-layout', className: classes }, otherProps, {
            __self: undefined
        }),
        children
    );
};
HeaderTabs.propTypes = {
    activeTab: _react.PropTypes.number,
    className: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    ripple: _react.PropTypes.bool
};

exports.default = HeaderTabs;