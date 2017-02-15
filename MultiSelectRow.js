import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
    minHeight: 36,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

class MultiSelectRow extends Component {
  constructor() {
    super();

    this.isSelected = false;
  }

  shouldComponentUpdate(nextProps) {
    if (this.isSelected === nextProps.isSelected) {
      return false;
    }
    return true;
  }

  render() {
    const { row, rowStyle, isSelected, renderRow, selectRow } = this.props;
    this.isSelected = isSelected;

    return (
      <TouchableHighlight
        underlayColor="rgb(245, 246, 246)"
        onPress={() => selectRow(row)}
      >
        <View style={[styles.row, StyleSheet.flatten(rowStyle)]}>
          {renderRow(row, isSelected)}
        </View>
      </TouchableHighlight>
    );
  }
}

MultiSelectRow.propTypes = {
  row: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSelected: PropTypes.bool,
  renderRow: PropTypes.func.isRequired,
  selectRow: PropTypes.func.isRequired,
  rowStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default MultiSelectRow;
