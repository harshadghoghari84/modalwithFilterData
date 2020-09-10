import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Modal, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { Notes } from './Note'

export class App extends Component {

  state = {
    searchList: '',
    modalVisible: false,
    name: '',
    age: '',
    noteArr: [],
    visibleClose: false


  }

  closeBTN = () => {
    this.setState({ searchList: '' })
  }
  renderHeader = () => {
    return (
      <View style={styles.searchbar}>
        <View style={styles.txtInput}>
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

  // rendermodal = () => {
  //   this.setState({ modalVisible: true })
  //   return (
  //     <Modal
  //       transparent={true}
  //       visible={this.state.modalVisible}
  //       animationType="slide"
  //     >
  //       <View style={styles.centeredView}>
  //         <View style={styles.modalView}>
  //           <Text style={styles.modalText}>Hello World!</Text>

  //           <TouchableHighlight
  //             style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
  //             onPress={() => this.setState({ modalVisible: false })}
  //           >
  //             <Text style={styles.textStyle}>Hide Modal</Text>
  //           </TouchableHighlight>
  //         </View>
  //       </View>
  //     </Modal>

  //   )
  // }
  deletenote(key) {
    this.state.noteArr.splice(key, 1);
    this.setState({ noteArr: this.state.noteArr })

  }
  addItems = () => {
    this.setState({ modalVisible: true })
    let tampArr = this.state.noteArr
    if (this.state.name && this.state.age) {
      tampArr.push({
        'name': this.state.name,
        'age': this.state.age,
      })

      this.setState({ noteArr: tampArr, name: '', age: '', modalVisible: false })

    }
  }
  renderBottom = () => {

    let note = this.state.noteArr.filter((item) => {
      return (
        (item.name).toLowerCase().indexOf(this.state.searchList.toLowerCase()) > -1
      )
    })

    let filteredData = note.map((val, key) => {
      return <Notes
        key={key}
        keyval={key}
        val={val}
        deletemethod={() => this.deletenote(key)}
      />
    })



    return (
      <View style={styles.items}>
        <ScrollView>
          {filteredData}
        </ScrollView>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          animationType="slide"
        >
          <KeyboardAvoidingView style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                value={this.state.name}
                style={{ width: "80%", borderBottomColor: 'grey', borderBottomWidth: 1 }}
                onChangeText={(txt) => this.setState({ name: txt })}
                placeholder="Enter Name" />
              <TextInput
                value={this.state.age}
                style={{ width: "80%", borderBottomColor: 'grey', borderBottomWidth: 1 }}
                onChangeText={(txt) => this.setState({ age: txt })}
                placeholder="Enter Age" />

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#E9EBEC" }}
                onPress={() => this.addItems()}
              >
                <Text style={styles.textStyle}>add items</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>


        <TouchableOpacity
          onPress={() => this.setState({ modalVisible: true })}
          style={styles.plusebtn}>
          <Entypo name="plus" size={45} color="grey" />
        </TouchableOpacity>
      </View>
    )
  }

  renderMainView = () => {
    return (
      <>
        {this.renderHeader()}
        {this.renderBottom()}
      </>
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
    backgroundColor: '#E9EBEC'
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
  plusebtn: {
    height: 60,
    width: 60,
    backgroundColor: '#E9EBEC',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 1,
    right: 20,
    bottom: 20,
    elevation: 5
  },
  items: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute'
  },
  openButton: {
    backgroundColor: "#E9EBEC",
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 8,
    elevation: 2,
    alignSelf: 'center',
    marginTop: 20
  },
  textStyle: {
    color: "grey",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

})
export default App
