import React from 'react';
import { View, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import Home from '../TabNavigation';
import Personal from './Personal';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderDrawer = (props) => (
    <SafeAreaView>
        <View style={{ height: 130, justifyContent: 'center', alignItems: 'center', backgroundColor: '#C7C7C7' }}>
            <Icon name={"music"} size={50} color={"#FFFFFF"} />
            <Text style={{ color: "#FFFFFF" }}>Life Music</Text>
        </View>
        <ScrollView style={{ marginTop: -3 }}>
          <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
);

const AppDrawerNavigation = createDrawerNavigator({
    Home: {
       screen: Home,
       navigationOptions: ({  }) => ({
           drawerIcon: <Icon name={"home"} size={18} color={"#999"} />
       })
    },
    Personal: {
      screen: Personal,
      navigationOptions: ({  }) => ({
          drawerLabel: 'Dados Pessoais',
          drawerIcon: <Icon name={"user"} size={18} color={"#999"} />
      })
    },
    Settings: {
      screen: "Settings",
      navigationOptions: ({  }) => ({
          drawerLabel: 'Configurações',
          drawerIcon: <Icon name={"gear"} size={18} color={"#999"} />
      })
    }
}, {
    drawerPosition: 'right',
    contentComponent: HeaderDrawer
});

export default AppDrawerNavigation;