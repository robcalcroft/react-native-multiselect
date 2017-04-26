# react-native-multiselect
> A simple RN component that allows row selection

## Install
`yarn add react-native-multiselect` or `npm install react-native-multiselect --save`

### 3.0.0
`3.0.0` swaps out `ListView` for `FlatList` or `SectionList`. This gives a huge performance increase for larger lists. This is a **breaking change** so you might need to modify your implementation of `react-native-multiselect` for this to work. Don't worry though, its not a massive change.

### 2.0.0
**If you used `<2.0.0` the `renderRow` API has changed and you'll need to do a small rewrite**

`2.0.0` brings some major performance enhancements and removes the dependancy on `react-native-vector-icons`, you are now just given an `isSelected` parameter which you can use to style the `renderRow`. Thanks to [@indesignlatam](https://github.com/indesignlatam) for proposing a fix to performance issues with large datasets.


## API
### `options[]` `required`
An array of values for the list to display. Each item in the array should be an
object that looks like this:
```javascript
{
  // A unique identifier for the row
  key: Number || String
  // The name displayed in the row
  name: String
  // This namespace can also be used to store custom props
  ...customProps
}
```

### `renderRow` `(row, isSelected)` `required`
A function that renders each row. The current row object is passed to it to
allow dynamic rows. This is where you could use the `customProps` mentioned
above. You can use the `isSelected` parameter to decide how to style your row when its selected

### `onSelectionChange` `(selectedRow, allSelectedRows)`
A callback that is fired when a row is clicked. It is passed the row that was
just selected as well as an array of all the currently selected rowStyle.

### `selectedOptions[]`
An array of `keys` that match those in `options` that will be preselected on the
list.

### `rowStyle{}`
A React Native style object, you can also pass StyleSheet styles to this; they
will be flattened.

### `listProps{}`
An object of props that are given to the FlatList or SectionList, this for things like `ListHeaderComponent`

### `activeOpacity` `Number`
Proxied to the TouchableHighlight component when you click the row

### `underlayColor` `String`
Proxied to the TouchableHighlight component when you click the row

### `useSections` `Boolean`
Use this to render a `SectionList` instead of a `FlatList`. Your `options` prop needs to looks like the one seen here: https://facebook.github.io/react-native/docs/sectionlist.html


## Usage
```javascript
import MultiSelect from 'react-native-multiselect';

const MyComponent = ({
  // [{id: 1, name: 'Thing 1', data: [...]}, {id: 2, name: 'Thing 2', data: [...]} ...]
  listOfThings,
  // [0, 4]
  preselectedThings,
  // (selectedRows) => this.setState({ selectedRows })
  updateListOfSelectedThings,
}) => (
  <View>
    <Text>Select some items from the list</Text>
    <MultiSelect
      options={listOfThings.map(thing => ({ key: thing.id, name: thing.name }) )}
      renderRow={(row, isSelected) => <Text>{row.name} {isSelected ? 'I am selected' : 'I am not selected'}</Text>}
      onSelectionChange={
        (selectedRow, allSelectedRows) => updateListOfSelectedThings(allSelectedRows)
      }
      selectedOptions={[]}
      rowStyle={{ backgroundColor: 'skyblue' }}
    />
  </View>
);
```
