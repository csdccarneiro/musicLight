import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function ItemList(props) {
    return(
      <View style={[style.itemContainer, { backgroundColor: (props.isSelect ? "#C7C7C7" : "#F2F2F2") }]}>
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
          <TouchableOpacity onPress={props.onPress} style={{ flex: 1, marginLeft: 10 }} onLongPress={props.onLongPressItem}>
              <Text numberOfLines={1} style={style.itemTitle} >{props.title}</Text>
              <Text numberOfLines={1} style={style.itemSubtitle}>{props.subtitle}</Text>
          </TouchableOpacity>
          <View style={{ width: 30 }}>
              <TouchableOpacity onPress={props.onOptionPress}>
                  {
                    (props.listSelection.size == 0) ? 
                        <FastImage
                            style={style.iconOptions}
                            source={require('../../images/ellipsis.png')}
                            resizeMode={FastImage.resizeMode.contain}
                        /> 
                    :
                        <>
                        </> 
                  }
              </TouchableOpacity>
          </View>
      </View>
    )
}

const style = StyleSheet.create({
    itemContainer: {
      borderTopWidth: 0.5, 
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 2,
    },
    itemTitle: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    itemSubtitle: {
      fontSize: 13
    },
    iconOptions: {
      width: 20, 
      height: 20, 
      margin: 3, 
      borderRadius: 10
    }
});
