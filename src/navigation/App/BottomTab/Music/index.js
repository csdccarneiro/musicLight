import React, { useState } from 'react';
import { View, VirtualizedList, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { ItemList } from '../../../../components';

function Music ({ app }) {

    const [selected, setSelected ] = useState(new Map());
    const [ modalVisible, setModalVisible ] = useState(false);
    const { colors } = useTheme();

    const onSelect = React.useCallback(id => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));
        setSelected(newSelected);
    }, [selected]);

    const onItemPress = React.useCallback(() => alert('Olá'), []);

    function renderItems({ item }) {

        return (
            <ItemList 
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                icon={item.icon}
                colors={colors}
                onItemPress={onItemPress}
                optionsVisible={setModalVisible}
                onSelect={onSelect} 
                selected={!!selected.get(item.id)}
            />
        );

    }

    return (
        <View>
            <VirtualizedList
                data={app.localListMusic}
                initialNumToRender={10}
                ListEmptyComponent={<ActivityIndicator size="large" color={'blue'} />}
                style={styles.list}
                renderItem={renderItems}
                removeClippedSubviews={true}
                keyExtractor={item => item.id}
                getItemCount={data => data.length}
                getItem={(data, index) => ({ id: data[index].id, icon: data[index].cover ? data[index].cover : app.icon_music,
                    title: data[index].fileName, subtitle: data[index].title})}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    list: {
        paddingLeft: 10, 
        paddingRight: 10
    }
});

export default connect(state => ({ app: state.App }))(Music);