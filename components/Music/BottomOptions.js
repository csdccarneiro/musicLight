import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function BottomOptions(props){

    return (
        <View>
            {
                (props.itemSelected.size > 0) ?
                    <View style={style.containerBottomOptions}>
                        <Avatar icon={{ name: 'trash', size: 35, color: 'black', type: 'font-awesome' }} onPress={props.onDeleteAll} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                        <Text style={{ fontSize: 20, color: 'white' }}>{props.itemSelected.size}</Text>
                        <Avatar icon={{ name: 'share-alt', size: 35, color: 'black', type: 'font-awesome' }} onPress={props.onShareAll} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    </View> 
                : 
                    <></>
            }
        </View> 
    );

}

const style = StyleSheet.create({
    containerBottomOptions: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        backgroundColor: "#F89424"
    }   
});