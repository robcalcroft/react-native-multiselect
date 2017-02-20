import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import MultiSelectRow from './MultiSelectRow';

class MultiSelect extends Component {
  constructor() {
    super();

    this.renderRow = this.renderRow.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.generateDataSource = this.generateDataSource.bind(this);

    this.state = {
      selectedRows: [],
    };
  }

  componentWillReceiveProps(props) {
    const { selectedOptions } = props;

    // `selectedOptions` is a list of keys that are also used in `options`
    if (selectedOptions) {
      this.setState({
        selectedRows: selectedOptions,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This is a performance check as this sometimes gets updated often
    if (nextProps.selectedOptions === this.props.selectedOptions &&
      nextState.selectedRows === this.state.selectedRows) {
      return false;
    }

    return true;
  }

  generateDataSource(options) { // eslint-disable-line class-methods-use-this
    return new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(options);
  }

  selectRow(row) {
    const { selectedRows } = this.state;
    const indexToRemove = selectedRows.indexOf(row.key);

    this.setState(
      (() => {
        if (indexToRemove !== -1) {
          return {
            selectedRows: [
              ...selectedRows.slice(0, indexToRemove),
              ...selectedRows.slice(indexToRemove + 1),
            ],
          };
        }
        return {
          selectedRows: [...selectedRows].concat([row.key]),
        };
      })(),
      () => this.props.onSelectionChange(row, this.state.selectedRows),
    );
  }

  renderRow(row) {
    const {
      renderRow: _renderRow,
      rowStyle,
      selectedOptions,
      underlayColor,
      activeOpacity,
    } = this.props;
    const { selectedRows } = this.state;
    const isSelected = (
      selectedRows.indexOf(row.key) !== -1 ||
      (selectedOptions && selectedOptions.indexOf(row.key) !== -1)
    );

    return (
      <MultiSelectRow
        row={row}
        isSelected={isSelected}
        renderRow={_renderRow}
        rowStyle={rowStyle}
        selectRow={this.selectRow}
        activeOpacity={activeOpacity}
        underlayColor={underlayColor}
      />
    );
  }

  render() {
    const { options, listViewProps, generateDataSource } = this.props;

    return (
      <ListView
        dataSource={(generateDataSource || this.generateDataSource)(options)}
        renderRow={this.renderRow}
        enableEmptySections
        {...listViewProps}
      />
    );
  }
}

MultiSelect.propTypes = {
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string.isRequired,
    // Can use this to store other row data
  }).isRequired).isRequired, PropTypes.object]), // eslint-disable-line react/forbid-prop-types
  renderRow: PropTypes.func.isRequired,
  listViewProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  // Passes `selectedRow, allSelectedRows`
  onSelectionChange: PropTypes.func,
  // `selectedOptions` is an array of keys that are also found in `options`
  selectedOptions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  // Use this to specify a custom generate data source function that is given options
  generateDataSource: PropTypes.func,
  rowStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string,
};

export default MultiSelect;
