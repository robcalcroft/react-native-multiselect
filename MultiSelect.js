import React, { Component, PropTypes } from 'react';
import { ListView, FlatList, SectionList } from 'react-native';
import MultiSelectRow from './MultiSelectRow';

class MultiSelect extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.generateDataSource = this.generateDataSource.bind(this);
    
    this.state = {
      selectedRows: props.selectedOptions || [],
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

  shouldComponentUpdate(nextProps) {
    // This is a performance check as this sometimes gets updated often
    if (nextProps.selectedOptions.length === this.props.selectedOptions.length) {
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
    if (!row.item) {
      return false;
    }

    const {
      renderRow: _renderRow,
      rowStyle,
      selectedOptions,
      underlayColor,
      activeOpacity,
    } = this.props;
    const { selectedRows } = this.state;
    const isSelected = (
      selectedRows.indexOf(row.item.key) !== -1 ||
      (selectedOptions && selectedOptions.indexOf(row.item.key) !== -1)
    );

    return (
      <MultiSelectRow
        row={row.item}
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
    const { options, listProps, useSections } = this.props;
    let view = null;

    if (useSections) {
      view = (
        <SectionList
          sections={options}
          renderItem={this.renderRow}
          {...listProps}
        />
      );
    } else {
      view = (
        <FlatList
          data={options}
          renderItem={this.renderRow}
          {...listProps}
        />
      );
    }

    return view;
  }
}

MultiSelect.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  renderRow: PropTypes.func.isRequired,
  listProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  // Passes `selectedRow, allSelectedRows`
  onSelectionChange: PropTypes.func,
  // `selectedOptions` is an array of keys that are also found in `options`
  selectedOptions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rowStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string,
  useSections: PropTypes.bool,
};

export default MultiSelect;
