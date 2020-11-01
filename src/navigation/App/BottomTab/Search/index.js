import React, { useState, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ItemList } from '../../../../components';

function Search({ app, dispatch, navigation }) { 

    const [ searchList, setSearchList ] = useState([]);
    const [ searchValue, setSearchValue ] = useState(null);
    const { colors } = useTheme();

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
                <TextInput placeholder={"Pesquise uma música..."} style={{ ...styles.inputSearch, color: colors.text }}
                    placeholderTextColor={"#C7C7C7"} onChangeText={searchMusic} value={searchValue} autoFocus={true} />   
                <Icon.Button name={(searchValue ? "clear" : "search")} size={25} underlayColor={'#C7C7C7'} color={colors.text}
                    onPress={searchMusic} style={styles.inputRightOptions} backgroundColor={"transparent"} />
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
        paddingLeft: 10,
        paddingRight: 5,
        height: 60,  
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