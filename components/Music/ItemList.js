import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Picker } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function ItemList(props){
    return (
      <View style={styles.itemContainer} >
          { (String(props.cover).indexOf('.jpg') >= 0) ? <Avatar size={"small"} containerStyle={{ marginLeft: 5 }} source={{ uri: props.cover }} /> : 
          <Avatar icon={{ name: 'music', type: 'font-awesome', color: 'red', size: 30 }} containerStyle={{ marginLeft: 5 }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"small"} />}
          <TouchableOpacity onLongPress={props.onLongPressItem} style={styles.itemButton} onPress={props.onPressItem} >
              <Text style={styles.itemTitle} numberOfLines={1}>{props.title}</Text>
              <Text style={styles.itemSubtitle} numberOfLines={1}>{props.subtitle}</Text>
          </TouchableOpacity>
          <View style={styles.itemPicker}>
            <Picker
                mode={'dropdown'}
                style={{ margin: -10 }}
                onValueChange={(itemValue, itemIndex) => alert(itemValue)}>
                <Picker.Item label="Adicionar Lista de Reprodução" value="1" />
                <Picker.Item label="Compartilhar" value="2" />
                <Picker.Item label="Excluir" value="3" />
            </Picker>
          </View>
      </View>  
    );
}

const styles = StyleSheet.create({
    itemContainer: {
      borderTopWidth: 0.5, 
      flexDirection: "row", 
      flex: 1, 
      paddingTop: 5, 
      paddingBottom: 5
    },
    itemButton: {
      flexDirection: "column", 
      flex: 1,
    },
    itemTitle: {
      fontSize: 13, 
      fontWeight: 'bold',
      paddingLeft: 5, 
      paddingRight: 5
    },
    itemSubtitle: {
      fontSize: 11,
      paddingLeft: 5, 
      paddingRight: 5
    },
    itemPicker: {
      flex: 0.1,
      justifyContent: 'center'
    }
});
