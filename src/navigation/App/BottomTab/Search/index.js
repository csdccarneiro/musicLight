import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import Voice from '@react-native-community/voice';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ItemList } from '../../../../components';

function Search({ app, dispatch, navigation }) { 

    const [ searchList, setSearchList ] = useState([]);
    const [ searchValue, setSearchValue ] = useState(null);
    const [ voiceStart, setVoiceStart ] = useState(false);
    const { colors } = useTheme();

    useEffect(() => {
        Voice.onSpeechStart = () => setVoiceStart(true);
        Voice.onSpeechEnd = () => setVoiceStart(false);
        Voice.onSpeechError = () => setVoiceStart(false);
        Voice.onSpeechResults = (e) => searchMusic(e.value[0]);
    }, []);

    const searchMusic = useCallback(text => {
        let search = (text && typeof text != "object" ? text : null);
        let regex = new RegExp(search, "i");
        let newList = app.localListMusic.filter(item => (regex.test(item.fileName) || regex.test(item.title) ? item : null));
        setSearchValue(search);
        setSearchList(newList);
    }, [searchValue]);

    const onItemPress = useCallback(item => {
        dispatch({ type: "TRACK_SELECT", payload: { musicId: item.id } });
        navigation.navigate("Player");
    }, []);

    async function onStartButtonPress() {
        await Voice.start("pt_BR");
    }

    function renderItems({ item }) {
        return (
            <ItemList 
                item={item}
                backgroundSelected={colors.primary}
                colorText={colors.text}
                widthItem={app.widthItems}
                onItemPress={onItemPress}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ ...styles.containerSearch, backgroundColor: colors.background }}>
                <Icon name={"search"} size={25} style={{ paddingTop: 5 }} color={colors.text} backgroundColor={"transparent"} />
                <TextInput placeholder={"Pesquise uma música..."} style={{ ...styles.inputSearch, color: colors.text }}
                    placeholderTextColor={"#C7C7C7"} onChangeText={searchMusic} value={searchValue} autoFocus={true} />   
                <Icon.Button name={(searchValue ? "clear" : null)} size={25} underlayColor={'#C7C7C7'} color={colors.text}
                    onPress={searchMusic} style={styles.inputRightOptions} backgroundColor={"transparent"} />
                <Icon.Button name={"keyboard-voice"} style={styles.inputRightOptions} size={25} underlayColor={'#C7C7C7'}
                    color={(voiceStart ? "#F10000" : colors.text)} backgroundColor={"transparent"} onPress={onStartButtonPress} />
            </View>
            <FlatList 
                data={searchList}
                columnWrapperStyle={styles.listContent}
                ListEmptyComponent={<Text style={{ ...styles.textEmpty, color: colors.text }}>Nenhuma música no momento...</Text>}
                initialNumToRender={5}
                numColumns={2}
                extraData={searchValue}
                renderItem={renderItems}
                removeClippedSubviews={true}
                keyExtractor={item => item.id}
            />
        </View> 
    );

}

const styles = StyleSheet.create({ 
    container: {
        flex: 1
    },
    containerSearch: {
        marginTop: -3, 
        elevation: 10, 
        height: 60, 
        paddingLeft: 13,
        paddingRight: 10, 
        borderBottomWidth: 0.1,
        flexDirection: "row", 
        alignItems: "center"
    },
    inputRightOptions: {
        paddingRight: 0, 
        marginRight: -2
    },
    textEmpty: {
        textAlign: "center", 
        paddingTop: 10
    },
    inputSearch: {
        flex: 1, 
        paddingLeft: 15, 
        fontSize: 17,
        paddingBottom: 8
    },
    listContent: {
        justifyContent: "space-between", 
        paddingTop: 10,
        paddingHorizontal: 25
    }
});

export default connect(state => ({ app: state.App }))(Search);