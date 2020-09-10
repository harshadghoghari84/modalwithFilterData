import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export class Notes extends Component {
  render() {
    return (
      <View>
        <View key={this.props.keyval}
          style={{
            position: 'relative',
            padding: 20,
            paddingRight: 10,
            backgroundColor: '#CED3D6',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            marginHorizontal: 10,
            marginVertical: 10,
            width: "83%"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 10
            }}>Name: {this.props.val.name}</Text>

          <Text
            style={{
              fontSize: 18,
              paddingLeft: 10
            }}>Age: {this.props.val.age}</Text>

        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#CED3D6',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            padding: 10,
            top: 10,
            bottom: 10,
            right: 10
          }}
          onPress={this.props.deletemethod}>

          <Text style={{ color: 'grey', fontSize: 30 }}>X</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


