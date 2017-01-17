import React, { Component, PropTypes } from 'react';
import { ListView, TouchableHighlight, StyleSheet, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  row: {
    minHeight: 36,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

class MultiSelect extends Component {
  constructor() {
    super();

    this.renderRow = this.renderRow.bind(this);
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
    const { renderRow: _renderRow, rowStyle, selectedOptions, flexLeft, flexRight } = this.props;
    const { selectedRows } = this.state;

    return (
      <TouchableHighlight
        underlayColor="rgb(245, 246, 246)"
        onPress={() => this.selectRow(row)}
      >
        <View style={[styles.row, StyleSheet.flatten(rowStyle)]}>
          <View style={{ flex: flexLeft || 15 }}>
            {_renderRow(row)}
          </View>
          <View style={{ flex: flexRight || 1 }}>
            {selectedRows.indexOf(row.key) !== -1 || selectedOptions && selectedOptions.indexOf(row.key) !== -1 ? (
              <Icon
                name={`${Platform.OS === 'ios' ? 'ios-' : 'md-'}checkmark`}
                color="black"
                size={30}
              />
            ) : null}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { options } = this.props;

    return (
      <ListView
        dataSource={this.generateDataSource(options)}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        enableEmptySections
      />
    );
  }
}

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string.isRequired,
    // Can use this to store other row data
  }).isRequired).isRequired,
  renderRow: PropTypes.func.isRequired,
  // Passes `selectedRow, allSelectedRows`
  onSelectionChange: PropTypes.func,
  // `selectedOptions` is an array of keys that are also found in `options`
  selectedOptions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rowStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  flexLeft: PropTypes.number,
  flexRight: PropTypes.number,
};

export default MultiSelect;
