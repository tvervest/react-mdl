'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Tooltip = require('../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
    cellFormatter: _react.PropTypes.func,
    className: _react.PropTypes.string,
    name: _react.PropTypes.string.isRequired,
    numeric: _react.PropTypes.bool,
    onClick: _react.PropTypes.func,
    nosort: _react.PropTypes.bool,
    sortFn: _react.PropTypes.func,
    tooltip: _react.PropTypes.node
};

var TableHeader = function TableHeader(props) {
    var className = props.className;
    var name = props.name;
    var numeric = props.numeric;
    var onClick = props.onClick;
    var nosort = props.nosort;
    var tooltip = props.tooltip;
    var children = props.children;

    var otherProps = _objectWithoutProperties(props, ['className', 'name', 'numeric', 'onClick', 'nosort', 'tooltip', 'children']);

    var classes = (0, _classnames2.default)({
        'mdl-data-table__cell--non-numeric': !numeric
    }, className);

    var clickFn = !nosort && onClick ? function (e) {
        return onClick(e, name);
    } : null;

    return _react2.default.createElement(
        'th',
        _extends({ className: classes, onClick: clickFn }, otherProps, {
            __self: undefined
        }),
        !!tooltip ? _react2.default.createElement(
            _Tooltip2.default,
            { label: tooltip, __self: undefined
            },
            children
        ) : children
    );
};

TableHeader.propTypes = propTypes;

exports.default = TableHeader;