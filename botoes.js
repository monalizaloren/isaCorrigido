import React, { Component } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Transacao from "../telas/teladetransacao";
import Pesquisa from "../telas/teladepesquisa";

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Transação") {
                iconName = "book";
              } else if (route.name === "Pesquisa") {
                iconName = "search";
              }

              // You can return any component that you like here!
              return (
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            }
          })}
          tabBarOptions={{
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "black",
            style: {
              height: 70,
              borderTopWidth: 0,
              backgroundColor: "#5653d4"
            },
            labelStyle: {
              fontSize: 20
            },
            labelPosition: "beside-icon",
            tabStyle: {
              marginTop: -25,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 30,
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#5653d4"
            }
          }}
        >
          <Tab.Screen name="Transação" component={Transacao} />
          <Tab.Screen name="Pesquisa" component={Pesquisa} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
