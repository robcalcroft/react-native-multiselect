import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
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
        activeOpacity={0.2}
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
  row: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
