import React, { PropTypes } from 'react';
import classNames from 'classnames';
import TableHeader from './TableHeader';
import Checkbox from '../Checkbox';

const propTypes = {
    columns: (props, propName, componentName) => (
        props[propName] && new Error(`${componentName}: \`${propName}\` is deprecated, please use the component \`TableHeader\` instead.`)
    ),
    data: (props, propName, componentName) => (
        props[propName] && new Error(`${componentName}: \`${propName}\` is deprecated, please use \`rows\` instead. \`${propName}\` will be removed in the next major release.`)
    ),
    onSelectionChanged: PropTypes.func,
    onRowSelected: PropTypes.func,
    onRowDeselected: PropTypes.func,
    rowKeyColumn: PropTypes.string,
    rows: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    selectedRows: PropTypes.array,
    selectable: PropTypes.bool
};

const defaultProps = {
    onSelectionChanged: () => {
        // do nothing
    },
    onRowSelected: () => {
        // do nothing
    },
    onRowDeselected: () => {
        // do nothing
    },
    selectedRows: []
};

export default Component => {
    class Selectable extends React.Component {
        constructor(props) {
            super(props);

            this.handleChangeHeaderCheckbox = this.handleChangeHeaderCheckbox.bind(this);
            this.handleChangeRowCheckbox = this.handleChangeRowCheckbox.bind(this);
            this.builRowCheckbox = this.builRowCheckbox.bind(this);

            if (props.selectable) {
                this.state = {
                    headerSelected: false,
                    selectedRows: [].concat(props.selectedRows)
                };
            }
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.selectable) {
                const { rows, data, selectedRows } = nextProps;
                const rrows = rows || data;

                this.setState({
                    headerSelected: selectedRows.length === rrows.length,
                    selectedRows
                });
            }
        }

        handleChangeHeaderCheckbox(e) {
            const { rowKeyColumn, rows, data, selectedRows } = this.props;
            const selected = e.target.checked;
            const newSelection = selected
                ? (rows || data).map((row, idx) => row[rowKeyColumn] || row.key || idx)
                : [];

            if (newSelection.length === 0) {
                selectedRows.map(this.props.onRowDeselected)
            } else {
                selectedRows.map(this.props.onRowSelected)
            }

            this.props.onSelectionChanged(newSelection);
        }

        handleChangeRowCheckbox(e) {
            e.stopPropagation()

            const rowId = JSON.parse(e.target.dataset.reactmdl).id;
            const selectedRows = this.state.selectedRows;
            const idx = selectedRows.indexOf(rowId);

            if (idx === -1) {
                this.props.onRowSelected(rowId)
                this.props.onSelectionChanged(selectedRows.concat(rowId));
            } else {
                this.props.onRowDeselected(rowId)
                this.props.onSelectionChanged([
                    ...selectedRows.slice(0, idx),
                    ...selectedRows.slice(idx + 1)
                ]);
            }
        }

        builRowCheckbox(content, row, idx) {
            const rowKey = row[this.props.rowKeyColumn] || row.key || idx;
            const isSelected = this.state.selectedRows.indexOf(rowKey) > -1;
            const onClick = (e) =>
                e.stopPropagation()

            return (
                <Checkbox
                    onClick={onClick}
                    className="mdl-data-table__select"
                    data-reactmdl={JSON.stringify({ id: rowKey })}
                    checked={isSelected}
                    onChange={this.handleChangeRowCheckbox}
                />
            );
        }

        render() {
            const { rows, data, selectable, children, rowKeyColumn, ...otherProps } = this.props;

            const realRows = selectable
                ? (rows || data).map((row, idx) => {
                    const rowKey = row[rowKeyColumn] || row.key || idx;
                    return {
                        ...row,
                        className: classNames({
                            'is-selected': this.state.selectedRows.indexOf(rowKey) > -1
                        }, row.className)
                    };
                })
                : (rows || data);

            return (
                <Component rows={realRows} {...otherProps} rowKeyColumn={rowKeyColumn}>
                    {selectable && (
                        <TableHeader name="mdl-header-select" cellFormatter={this.builRowCheckbox}>
                            <Checkbox className="mdl-data-table__select" checked={this.state.headerSelected} onChange={this.handleChangeHeaderCheckbox} />
                        </TableHeader>
                    )}
                    {children}
                </Component>
            );
        }
    }
    Selectable.propTypes = propTypes;
    Selectable.defaultProps = defaultProps;
    return Selectable;
};
