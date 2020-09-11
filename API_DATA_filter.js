import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { FlatList } from 'react-native-gesture-handler'

export class API_DATA_filter extends Component {

  state = {
    searchList: '',
    data: [],
  }

  componentDidMount() {
    const URL = "http://dummy.restapiexample.com/api/v1/employees"

    fetch(URL)
      .then((response) => response.json())
      .then((json) => this.setState({ data: json.data }))
      .catch((error) => alert(error.message))
  }
  /*
  ..######...#######..##.....##.########...#######..##....##....###....##....##.########
  .##....##.##.....##.###...###.##.....##.##.....##.###...##...##.##...###...##....##...
  .##.......##.....##.####.####.##.....##.##.....##.####..##..##...##..####..##....##...
  .##.......##.....##.##.###.##.########..##.....##.##.##.##.##.....##.##.##.##....##...
  .##.......##.....##.##.....##.##........##.....##.##..####.#########.##..####....##...
  .##....##.##.....##.##.....##.##........##.....##.##...###.##.....##.##...###....##...
  ..######...#######..##.....##.##.........#######..##....##.##.....##.##....##....##...
  */
  deleteItems = (index) => {
    this.state.data.splice(index, 1)
    this.setState({ data: this.state.data })
  }
  closeBTN = () => {
    this.setState({ searchList: '' })
  }
  renderHeader = () => {
    return (
      <View style={styles.searchbar}>
        <View style={[styles.txtInput, { borderColor: this.state.searchList == '' ? '#fff' : '#BABCBD', borderWidth: 1 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              style={{ marginLeft: 10, color: 'grey' }}
              name="search1"
              size={24} />
            <TextInput
              style={{ width: "80%", paddingLeft: 10 }}
              placeholder='search'
              value={this.state.searchList}
              onChangeText={(s) => this.setState({ searchList: s })}
            />
          </View>
          {this.state.searchList !== '' &&
            <TouchableOpacity>
              <AntDesign
                onPress={() => this.closeBTN()}
                style={{ marginRight: 10, color: 'grey' }}
                name="close"
                size={24} />
            </TouchableOpacity>
          }
        </View>
      </View>
    )
  }

  renderBottom = () => {
    let filtered_Data = this.state.data.filter((item) => {
      return (
        (item.employee_name, item.employee_age).toLowerCase().indexOf(this.state.searchList.toLocaleLowerCase()) > -1
      )
    })
    return (
      <FlatList
        data={filtered_Data}
        keyExtractor={({ key }) => key}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.centeredView}>
              <View style={styles.noteView}>
                <View>
                  <Text style={{ color: 'grey' }}>Emp Name: {item.employee_name}</Text>
                  <Text style={{ color: 'grey' }}>Emp Salary: {item.employee_salary}</Text>
                  <Text style={{ color: 'grey' }}>Emp Age: {item.employee_age}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.deleteItems(index)}
                    style={styles.closeBTN}>
                    <Text style={{ fontSize: 18, color: 'grey' }}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
      />
    )
  }

  renderMainView = () => {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        {this.renderBottom()}
      </View>
    )
  }

  render() {
    return (
      this.renderMainView()
    )
  }
}

const styles = StyleSheet.create({
  searchbar: {
    borderBottomColor: '#BABCBD',
    borderBottomWidth: 1,
    backgroundColor: '#E9EBEC',
  },
  txtInput: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  noteView: {
    backgroundColor: '#E9EBEC',
    borderRadius: 20,
    padding: 20,
    width: "90%",
    flexDirection: 'row'
  },
  closeBTN: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#E9EBEC',
    alignSelf: 'flex-end',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default API_DATA_filter
