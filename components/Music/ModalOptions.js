import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

export default function ModalOptions(props){

    const dispatch = useDispatch();
    const player = useSelector(state => state.player);

    function changeModeList(nameMode) {
        if (nameMode === "Card" && props.itensOptions.activeCard == false) 
            dispatch({ type: 'CHANGE_MODE_LIST', modeList: { activeCard: true } });
        else if(nameMode === "Lista" && props.itensOptions.activeCard == true)  
            dispatch({ type: 'CHANGE_MODE_LIST', modeList: { activeCard: false } });
    }

    return (
        <Modal
            animationType={'fade'}
            transparent={true}
            visible={props.options.modalVisible}
            hardwareAccelerated={true}
            onRequestClose={props.onRequestClose} >
            <View style={style.containerFullOptions}>
                <View style={[style.containerOptions, { width: props.widthModal }]}> 
                    {
                        (props.options.mode === "listing") ? 
                            <>
                                <CheckBox
                                    title={"Card"}
                                    checked={(props.itensOptions.activeCard ? true : false)}
                                    iconRight={true}
                                    textStyle={{ color: 'black' }}
                                    checkedColor={"#F89424"}
                                    onPress={() => changeModeList("Card")}
                                    containerStyle={style.checkBox}
                                    wrapperStyle={{ justifyContent: 'space-between' }}
                                />
                                <CheckBox
                                    title={"Lista"}
                                    checked={(props.itensOptions.activeCard ? false : true)}
                                    iconRight={true}
                                    textStyle={{ color: 'black' }}
                                    checkedColor={"#F89424"}
                                    onPress={() => changeModeList("Lista")}
                                    containerStyle={style.checkBox}
                                    wrapperStyle={{ justifyContent: 'space-between' }}
                                />  
                            </>
                        :
                        (props.options.mode === "rate") ?
                            <View style={{ margin: 15 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Modifique a velocidade</Text>
                                <Slider animateTransitions={true} style={{ marginBottom: -10 }} animationType={'spring'} value={player.velocity} maximumValue={3} onValueChange ={value => dispatch({ type: "CHANGE_VELOCITY_REPRODUCTION", velocity: Math.round(value * 100) / 100 })} trackStyle={{ height: 3 }} thumbStyle={{ height: 13, width: 13 }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Atual: {player.velocity}</Text>
                                    <Text>Max: 3</Text>
                                </View>
                            </View>
                        :
                        (props.options.mode === "details") ? 
                            <View style={style.containerDetails}>
                                <FastImage
                                    style={{ width: 90, height: 90 }}
                                    source={(String(props.options.item.cover).indexOf('.jpg') >= 0) ? 
                                    { uri: props.options.item.cover } : require('../../images/musical-note.png')}
                                />
                                <View style={style.containerDetailsText}>
                                     <Text style={style.textBold}>Arquivo: <Text style={style.textNormal}>{props.options.item.fileName}</Text></Text>
                                     <Text style={style.textBold}>Título: <Text style={style.textNormal}>{(props.options.item.title != null ? props.options.item.title : "Desconhecido")}</Text></Text>
                                     <Text style={style.textBold}>Artista: <Text style={style.textNormal}>{(props.options.item.artist != null ? props.options.item.artist : " Desconhecido")}</Text></Text>
                                     <Text style={style.textBold}>Caminho: <Text style={style.textNormal}>{props.options.item.path}</Text></Text>
                                </View>
                            </View>
                        :
                          <>
                             <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={props.onShare}><Text style={style.textOptions}>Compartilhar</Text></TouchableHighlight>
                             <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={props.onDelete}><Text style={style.textOptions}>Excluir</Text></TouchableHighlight>
                             <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={props.onDetails}><Text style={style.textOptions}>Detalhes</Text></TouchableHighlight>
                          </>
                    }
                </View>
            </View>
        </Modal>   
    );

}

const style = StyleSheet.create({
    containerFullOptions: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    containerOptions: { 
        flexDirection: "column",
        overflow: 'hidden', 
        backgroundColor: '#D8D8D8',
        borderRadius: 10,
    },
    borderButtonOptions:{
        borderBottomWidth: 0.2
    },
    textOptions: { 
        fontSize: 17, 
        marginLeft: 15, 
        padding: 10
    },
    textBold: { 
        fontWeight: 'bold',
        marginBottom: 4
    },
    textNormal: { 
        fontWeight: 'normal'
    },
    checkBox:{
        marginBottom: 0, 
        width: '100%', 
        marginLeft: 0,
        marginTop: 0,
        backgroundColor: '#D8D8D8'
    },
    containerDetails: {
        flexDirection: 'row', 
        margin: 10, 
        alignItems: 'center'
    },
    containerDetailsText: {
        flex: 1, 
        marginLeft: 10
    }
});