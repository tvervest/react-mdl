'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UndecoratedTable = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _clamp = require('clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _shadows = require('../utils/shadows');

var _shadows2 = _interopRequireDefault(_shadows);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _Selectable = require('./Selectable');

var _Selectable2 = _interopRequireDefault(_Selectable);

var _Sortable = require('./Sortable');

var _Sortable2 = _interopRequireDefault(_Sortable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    className: _react.PropTypes.string,
    columns: function columns(props, propName, componentName) {
        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use the component `TableHeader` instead.');
    },
    data: function data(props, propName, componentName) {
        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use `rows` instead. `' + propName + '` will be removed in the next major release.');
    },
    rowKeyColumn: _react.PropTypes.string,
    rows: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
    shadow: _react.PropTypes.number,
    onRowClicked: _react.PropTypes.func
};

var defaultProps = {
    onRowClicked: function onRowClicked() {
        // do nothing
    }
};

var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    function Table() {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
    }

    _createClass(Table, [{
        key: 'renderCell',
        value: function renderCell(column, row, idx) {
            var className = (0, _classnames2.default)(_extends({
                'mdl-data-table__cell--non-numeric': !column.numeric
            }, column.cellClasses ? column.cellClasses(row[column.name], row, idx) : null));
            return _react2.default.createElement(
                'td',
                { key: column.name, className: className, __self: this
                },
                column.cellFormatter ? column.cellFormatter(row[column.name], row, idx) : row[column.name]
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var className = _props.className;
            var columns = _props.columns;
            var shadow = _props.shadow;
            var children = _props.children;
            var rowKeyColumn = _props.rowKeyColumn;
            var rows = _props.rows;
            var data = _props.data;

            var otherProps = _objectWithoutProperties(_props, ['className', 'columns', 'shadow', 'children', 'rowKeyColumn', 'rows', 'data']);

            var realRows = rows || data;

            var hasShadow = typeof shadow !== 'undefined';
            var shadowLevel = (0, _clamp2.default)(shadow || 0, 0, _shadows2.default.length - 1);

            var classes = (0, _classnames2.default)('mdl-data-table', _defineProperty({}, _shadows2.default[shadowLevel], hasShadow), className);

            var columnChildren = !!children ? _react2.default.Children.toArray(children) : columns.map(function (column) {
                return _react2.default.createElement(
                    _TableHeader2.default,
                    {
                        key: column.name,
                        className: column.className,
                        name: column.name,
                        numeric: column.numeric,
                        tooltip: column.tooltip,
                        __self: _this2
                    },
                    column.label
                );
            });

            var makeOnClickHandler = function makeOnClickHandler(key) {
                return function (e) {
                    // ugly hack to prevent the callback from firing when a checkbox in the row is clicked
                    if (!e.target.className || e.target.className.indexOf('checkbox') === -1) {
                        _this2.props.onRowClicked(key);
                    }
                };
            };

            return _react2.default.createElement(
                'table',
                _extends({ className: classes }, otherProps, {
                    __self: this
                }),
                _react2.default.createElement(
                    'thead',
                    {
                        __self: this
                    },
                    _react2.default.createElement(
                        'tr',
                        {
                            __self: this
                        },
                        columnChildren
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    {
                        __self: this
                    },
                    realRows.map(function (row, idx) {
                        var key = row[rowKeyColumn] || row.key || idx;
                        return _react2.default.createElement(
                            'tr',
                            { key: key, className: row.className, onClick: makeOnClickHandler(key), __self: _this2
                            },
                            columnChildren.map(function (child) {
                                return _this2.renderCell(child.props, row, idx);
                            })
                        );
                    })
                )
            );
        }
    }]);

    return Table;
}(_react2.default.Component);

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

exports.default = (0, _Sortable2.default)((0, _Selectable2.default)(Table));
var UndecoratedTable = exports.UndecoratedTable = Table;