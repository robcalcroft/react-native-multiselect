# react-native-multiselect
> A simple RN component that allows row selection

## Install
`yarn add react-native-multiselect` or `npm install react-native-multiselect --save`

**You'll also need to link the [react native vector icons](https://github.com/oblador/react-native-vector-icons#installation) library to your RN project. This is for the checkmark that is used in the row.**

## Screenshot
Looks like this (without the title and backgrounds)
![A screenshot of the component](http://i.imgur.com/mC7zx72.png)

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

### `renderRow` `(row)` `required`
A function that renders each row. The current row object is passed to it to
allow dynamic rows. This is where you could use the `customProps` mentioned
above.

### `onSelectionChange` `(selectedRow, allSelectedRows)`
A callback that is fired when a row is clicked. It is passed the row that was
just selected as well as an array of all the currently selected rowStyle.

### `selectedOptions[]`
An array of `keys` that match those in `options` that will be preselected on the
list.

### `rowStyle{}`
A React Native style object, you can also pass StyleSheet styles to this; they
will be flattened.

## `flexRight` `Number`
Defines the flex of the rendered row

## `flexLeft` `Number`
Defines the flex of the check mark


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
      renderRow={(row) => <Text>{row.name}</Text>}
      onSelectionChange={
        (selectedRow, allSelectedRows) => updateListOfSelectedThings(allSelectedRows)
      }
      selectedOptions={[]}
      rowStyle={{ backgroundColor: 'skyblue' }}
    />
  </View>
);
```
