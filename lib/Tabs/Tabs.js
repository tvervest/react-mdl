'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabBar = require('./TabBar');

var _TabBar2 = _interopRequireDefault(_TabBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TabPropType = function TabPropType(props, propName, componentName) {
    var prop = props[propName];
    return prop.type !== _Tab2.default && new Error('\'' + componentName + '\' only accepts \'Tab\' as children.');
};

var propTypes = {
    activeTab: _react.PropTypes.number,
    children: _react.PropTypes.oneOfType([TabPropType, _react.PropTypes.arrayOf(TabPropType)]),
    className: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    tabBarProps: _react.PropTypes.object
};

var Tabs = function Tabs(props) {
    var activeTab = props.activeTab;
    var className = props.className;
    var onChange = props.onChange;
    var children = props.children;
    var tabBarProps = props.tabBarProps;

    var otherProps = _objectWithoutProperties(props, ['activeTab', 'className', 'onChange', 'children', 'tabBarProps']);

    var classes = (0, _classnames2.default)('mdl-tabs is-upgraded', className);

    return _react2.default.createElement(
        'div',
        _extends({ className: classes }, otherProps, {
            __self: undefined
        }),
        _react2.default.createElement(
            _TabBar2.default,
            _extends({ cssPrefix: 'mdl-tabs', activeTab: activeTab, onChange: onChange }, tabBarProps, {
                __self: undefined
            }),
            children
        )
    );
};

Tabs.propTypes = propTypes;

exports.default = Tabs;