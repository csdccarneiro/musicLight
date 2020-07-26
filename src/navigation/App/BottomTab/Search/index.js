import React, { useState, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ItemList } from '../../../../components';

function Search({ app, dispatch, navigation }) {

    const [ searchList, setSearchList ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const { colors } = useTheme();
    
    const onItemPress = useCallback(item => {
        dispatch({ type: "TRACK_SELECT", payload: { musicId: item.id } });
        navigation.navigate("Player");
    }, []);
    
    const searchMusic = useCallback(text => {
        if(text)
            setSearchList(app.localListMusic.filter(item => (item.fileName.match(text) || item.title.match(text) ? item : null)));
        else {
            setSearchList([]);
            setSearchText("");
        }
    }, [app.localListMusic]);

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
        <View style={{ flex: 1 }}>
            <View style={{ ...styles.containerSearch, backgroundColor: colors.background }}>
                <TextInput placeholder={"Pesquise uma música..."} style={{ ...styles.inputSearch, color: colors.text }}
                    placeholderTextColor={"#C7C7C7"} autoFocus={true} onChangeText={text => setSearchText(text)}
                    onSubmitEditing={teste => searchMusic(teste.nativeEvent.text)} value={searchText}
                />   
                <Icon.Button name={(searchText != "" ? "clear" : "search")} size={25} underlayColor={'#C7C7C7'}
                    onPress={() => searchMusic("")} style={{ paddingRight: 0, marginRight: -2 }} color={colors.text}
                    backgroundColor={"transparent"} />
            </View>
            <FlatList 
                data={searchList}
                columnWrapperStyle={(searchList.length > 0 ? styles.listContent : {})}
                contentContainerStyle={(searchList.length <= 0 ? styles.listempty : {})}
                ListEmptyComponent={<Text style={{ color: colors.text }}>Nenhuma música no momento...</Text>}
                initialNumToRender={5}
                numColumns={2}
                renderItem={renderItems}
                removeClippedSubviews={true}
                keyExtractor={item => item.id}
            />
        </View> 
    );

}

const styles = StyleSheet.create({ 
    containerSearch: {
        marginTop: -3, 
        elevation: 10, 
        height: 60, 
        paddingRight: 10, 
        borderBottomWidth: 0.1,
        flexDirection: "row", 
        alignItems: "center"
    },
    inputSearch: {
        flex: 1, 
        paddingLeft: 20, 
        fontSize: 17,
        paddingBottom: 8
    },
    listempty: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center"
    },
    listContent: {
        justifyContent: "space-between", 
        paddingTop: 10,
        paddingHorizontal: 25
    }
});

export default connect(state => ({ app: state.App }))(Search);