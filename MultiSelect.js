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
      selectedRows: {},
    };
  }

  componentWillMount() {
    const { selectedOptions } = this.props;
    const initialSelectedRows = {};

    // `selectedOptions` is a list of keys that are also used in `options`
    if (selectedOptions) {
      for (let index = 0; index < selectedOptions.length; index += 1) {
        initialSelectedRows[selectedOptions[index]] = true;
      }
      this.setState({ selectedRows: initialSelectedRows });
    }
  }

  generateDataSource(options) { // eslint-disable-line class-methods-use-this
    return new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(options);
  }

  selectRow(row) {
    const { selectedRows } = this.state;
    // TODO change this to use just an array doesnt need to be an object
    if (selectedRows[row.key]) {
      delete selectedRows[row.key];
    } else {
      selectedRows[row.key] = true;
    }

    this.setState(
      { selectedRows },
      () => this.props.onSelectionChange(row, this.state.selectedRows),
    );
  }

  renderRow(row) {
    const { renderRow: _renderRow, rowStyle, selectedOptions } = this.props;
    const { selectedRows } = this.state;

    return (
      <TouchableHighlight
        underlayColor="rgb(245, 246, 246)"
        onPress={() => this.selectRow(row)}
      >
        <View style={[styles.row, StyleSheet.flatten(rowStyle)]}>
          <View style={{ flex: 15 }}>
            {_renderRow(row)}
          </View>
          <View style={{ flex: 1 }}>
            {selectedRows[row.key] || selectedOptions.indexOf(row.key) !== -1 ? (
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
};

export default MultiSelect;
