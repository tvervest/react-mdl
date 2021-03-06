import React, { PropTypes } from 'react';
import classNames from 'classnames';
import clamp from 'clamp';
import shadows from '../utils/shadows';
import TableHeader from './TableHeader';
import makeSelectable from './Selectable';
import makeSortable from './Sortable';

const propTypes = {
    className: PropTypes.string,
    columns: (props, propName, componentName) => (
        props[propName] && new Error(`${componentName}: \`${propName}\` is deprecated, please use the component \`TableHeader\` instead.`)
    ),
    data: (props, propName, componentName) => (
        props[propName] && new Error(`${componentName}: \`${propName}\` is deprecated, please use \`rows\` instead. \`${propName}\` will be removed in the next major release.`)
    ),
    rowKeyColumn: PropTypes.string,
    rows: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    shadow: PropTypes.number,
    onRowClicked: PropTypes.func
};

const defaultProps = {
    onRowClicked: () => {
        // do nothing
    }
};

class Table extends React.Component {
    renderCell(column, row, idx) {
        const className = classNames({
            'mdl-data-table__cell--non-numeric': !column.numeric,
            ...column.cellClasses ? column.cellClasses(row[column.name], row, idx) : null
        })
        return (
            <td key={column.name} className={className}>
                {column.cellFormatter ? column.cellFormatter(row[column.name], row, idx) : row[column.name]}
            </td>
        );
    }

    render() {
        const { className, columns, shadow, children,
            rowKeyColumn, rows, data, ...otherProps } = this.props;
        const realRows = rows || data;

        const hasShadow = typeof shadow !== 'undefined';
        const shadowLevel = clamp(shadow || 0, 0, shadows.length - 1);

        const classes = classNames('mdl-data-table', {
            [shadows[shadowLevel]]: hasShadow
        }, className);

        const columnChildren = !!children
            ? React.Children.toArray(children)
            : columns.map(column =>
                <TableHeader
                    key={column.name}
                    className={column.className}
                    name={column.name}
                    numeric={column.numeric}
                    tooltip={column.tooltip}
                >
                    {column.label}
                </TableHeader>
            );

        const makeOnClickHandler = (key) =>
            (e) => {
                // ugly hack to prevent the callback from firing when a checkbox in the row is clicked
                if (!e.target.className || e.target.className.indexOf('checkbox') === -1) {
                    this.props.onRowClicked(key)
                }
            }

        return (
            <table className={classes} {...otherProps}>
                <thead>
                    <tr>
                        {columnChildren}
                    </tr>
                </thead>
                <tbody>
                    {realRows.map((row, idx) => {
                        const key = row[rowKeyColumn] || row.key || idx
                        return (
                            <tr key={key} className={row.className} onClick={makeOnClickHandler(key)}>
                                {columnChildren.map((child) => this.renderCell(child.props, row, idx))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default makeSortable(makeSelectable(Table));
export const UndecoratedTable = Table;
