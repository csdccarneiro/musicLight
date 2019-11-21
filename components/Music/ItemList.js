import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function ItemList(props) {
    return(
      <View style={style.itemContainer}>
          <FastImage
              style={{ width: 45, height: 45, marginLeft: 5 }}
              source={(String(props.cover).indexOf('.jpg') >= 0) ? 
              {
                uri: props.cover, 
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.high,
                cache: "immutable"
              }: require('../../images/musical-note.png')}
              resizeMode={FastImage.resizeMode.cover}
          />
          <TouchableOpacity onPress={props.onPress} style={{ flex: 1, marginLeft: 10 }}>
              <Text numberOfLines={1} style={style.itemTitle} >{props.title}</Text>
              <Text numberOfLines={1} style={style.itemSubtitle}>{props.subtitle}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onOptionPress}>
              <FastImage
                style={{ width: 20, height: 20, margin: 3, borderRadius: 10 }}
                source={require('../../images/ellipsis.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
          </TouchableOpacity>
      </View>
    )
}

const style = StyleSheet.create({
    itemContainer: {
      borderBottomWidth: 0.5, 
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 2
    },
    itemTitle: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    itemSubtitle: {
      fontSize: 13
    }
});
