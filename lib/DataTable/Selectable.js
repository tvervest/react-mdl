'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    columns: function columns(props, propName, componentName) {
        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use the component `TableHeader` instead.');
    },
    data: function data(props, propName, componentName) {
        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use `rows` instead. `' + propName + '` will be removed in the next major release.');
    },
    onSelectionChanged: _react.PropTypes.func,
    onRowSelected: _react.PropTypes.func,
    onRowDeselected: _react.PropTypes.func,
    rowKeyColumn: _react.PropTypes.string,
    rows: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
    selectedRows: _react.PropTypes.array,
    selectable: _react.PropTypes.bool
};

var defaultProps = {
    onSelectionChanged: function onSelectionChanged() {
        // do nothing
    },
    onRowSelected: function onRowSelected() {
        // do nothing
    },
    onRowDeselected: function onRowDeselected() {
        // do nothing
    },
    selectedRows: []
};

exports.default = function (Component) {
    var Selectable = function (_React$Component) {
        _inherits(Selectable, _React$Component);

        function Selectable(props) {
            _classCallCheck(this, Selectable);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Selectable).call(this, props));

            _this.handleChangeHeaderCheckbox = _this.handleChangeHeaderCheckbox.bind(_this);
            _this.handleChangeRowCheckbox = _this.handleChangeRowCheckbox.bind(_this);
            _this.builRowCheckbox = _this.builRowCheckbox.bind(_this);

            if (props.selectable) {
                _this.state = {
                    headerSelected: false,
                    selectedRows: [].concat(props.selectedRows)
                };
            }
            return _this;
        }

        _createClass(Selectable, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.selectable) {
                    var rows = nextProps.rows;
                    var data = nextProps.data;
                    var selectedRows = nextProps.selectedRows;

                    var rrows = rows || data;

                    this.setState({
                        headerSelected: selectedRows.length === rrows.length,
                        selectedRows: selectedRows
                    });
                }
            }
        }, {
            key: 'handleChangeHeaderCheckbox',
            value: function handleChangeHeaderCheckbox(e) {
                var _props = this.props;
                var rowKeyColumn = _props.rowKeyColumn;
                var rows = _props.rows;
                var data = _props.data;
                var selectedRows = _props.selectedRows;

                var selected = e.target.checked;
                var newSelection = selected ? (rows || data).map(function (row, idx) {
                    return row[rowKeyColumn] || row.key || idx;
                }) : [];

                if (newSelection.length === 0) {
                    selectedRows.map(this.props.onRowDeselected);
                } else {
                    selectedRows.map(this.props.onRowSelected);
                }

                this.props.onSelectionChanged(newSelection);
            }
        }, {
            key: 'handleChangeRowCheckbox',
            value: function handleChangeRowCheckbox(e) {
                e.stopPropagation();

                var rowId = JSON.parse(e.target.dataset.reactmdl).id;
                var selectedRows = this.state.selectedRows;
                var idx = selectedRows.indexOf(rowId);

                if (idx === -1) {
                    this.props.onRowSelected(rowId);
                    this.props.onSelectionChanged(selectedRows.concat(rowId));
                } else {
                    this.props.onRowDeselected(rowId);
                    this.props.onSelectionChanged([].concat(_toConsumableArray(selectedRows.slice(0, idx)), _toConsumableArray(selectedRows.slice(idx + 1))));
                }
            }
        }, {
            key: 'builRowCheckbox',
            value: function builRowCheckbox(content, row, idx) {
                var rowKey = row[this.props.rowKeyColumn] || row.key || idx;
                var isSelected = this.state.selectedRows.indexOf(rowKey) > -1;
                var onClick = function onClick(e) {
                    return e.stopPropagation();
                };

                return _react2.default.createElement(_Checkbox2.default, {
                    onClick: onClick,
                    className: 'mdl-data-table__select',
                    'data-reactmdl': JSON.stringify({ id: rowKey }),
                    checked: isSelected,
                    onChange: this.handleChangeRowCheckbox
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props2 = this.props;
                var rows = _props2.rows;
                var data = _props2.data;
                var selectable = _props2.selectable;
                var children = _props2.children;
                var rowKeyColumn = _props2.rowKeyColumn;

                var otherProps = _objectWithoutProperties(_props2, ['rows', 'data', 'selectable', 'children', 'rowKeyColumn']);

                var realRows = selectable ? (rows || data).map(function (row, idx) {
                    var rowKey = row[rowKeyColumn] || row.key || idx;
                    return _extends({}, row, {
                        className: (0, _classnames2.default)({
                            'is-selected': _this2.state.selectedRows.indexOf(rowKey) > -1
                        }, row.className)
                    });
                }) : rows || data;

                return _react2.default.createElement(
                    Component,
                    _extends({ rows: realRows }, otherProps, { rowKeyColumn: rowKeyColumn }),
                    selectable && _react2.default.createElement(
                        _TableHeader2.default,
                        { name: 'mdl-header-select', cellFormatter: this.builRowCheckbox },
                        _react2.default.createElement(_Checkbox2.default, { className: 'mdl-data-table__select', checked: this.state.headerSelected, onChange: this.handleChangeHeaderCheckbox })
                    ),
                    children
                );
            }
        }]);

        return Selectable;
    }(_react2.default.Component);

    Selectable.propTypes = propTypes;
    Selectable.defaultProps = defaultProps;
    return Selectable;
};