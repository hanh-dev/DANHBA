import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import { BottomTabParamList } from "./types";

const CategoriesStack = HomeStack;
const OrdersStack = HomeStack;

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#F0E491",
        tabBarInactiveTintColor: "#BBC863",
        tabBarStyle: {
          backgroundColor: "#007E6E",
          height: 65,
          paddingTop: 8,
          borderTopWidth: 0,
          borderRadius: 50,
          marginBottom: 0,
        },

        tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case "Home":
              return (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              );

            case "Categories":
              return (
                <MaterialCommunityIcons
                  name={focused ? "view-grid" : "view-grid-outline"}
                  size={size}
                  color={color}
                />
              );

            case "Orders":
              return (
                <Ionicons
                  name={focused ? "cart" : "cart-outline"}
                  size={size}
                  color={color}
                />
              );

            case "Profile":
              return (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={size}
                  color={color}
                />
              );

            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Categories" component={CategoriesStack} />
      <Tab.Screen name="Orders" component={OrdersStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AppTabs;
