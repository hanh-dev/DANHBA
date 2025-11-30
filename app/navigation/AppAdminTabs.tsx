import ProductManagement from "@/components/Last/admin/ProductManagement";
import UserManagement from "@/components/Last/admin/UserManagement";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React from "react";
import CategoryAdminStack from "./CategoryAdminStack";
import HomeAdminStack from "./HomeAdminStack";
import { AdminTabParamList } from "./types";

const Tab = createBottomTabNavigator<AdminTabParamList>();

const AppAdminTabs = () => {
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

            case "Users":
              return (
                <Ionicons
                  name={focused ? "people" : "people-outline"}
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

            case "Products":
              return (
                <Ionicons
                  name={focused ? "cube" : "cube-outline"}
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
      <Tab.Screen
        name="Home"
        component={HomeAdminStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

          if (
            routeName === "UserManagement" ||
            routeName === "ProductsByCategory" ||
            routeName === "ProductManagement" ||
            routeName === "CategoryManagement" ||
            routeName === "Filter"
          ) {
            return {
              tabBarStyle: { display: "none" },
            };
          }

          return {
            tabBarStyle: {
              backgroundColor: "#007E6E",
              height: 65,
              paddingTop: 8,
              borderTopWidth: 0,
              borderRadius: 50,
              marginBottom: 0,
            },
          };
        }}
      />
      <Tab.Screen
        name="Users"
        component={UserManagement}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

          if (routeName === "Users" || routeName === "ProductByCategory") {
            return {
              tabBarStyle: { display: "none" },
            };
          }

          return {
            tabBarStyle: {
              backgroundColor: "#007E6E",
              height: 65,
              paddingTop: 8,
              borderTopWidth: 0,
              borderRadius: 50,
              marginBottom: 0,
            },
          };
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryAdminStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

          if (routeName === "Categories" || routeName === "ProductByCategory") {
            return {
              tabBarStyle: { display: "none" },
            };
          }

          return {
            tabBarStyle: {
              backgroundColor: "#007E6E",
              height: 65,
              paddingTop: 8,
              borderTopWidth: 0,
              borderRadius: 50,
              marginBottom: 0,
            },
          };
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductManagement}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

          if (routeName === "Products" || routeName === "ProductsByCategory") {
            return {
              tabBarStyle: { display: "none" },
            };
          }

          return {
            tabBarStyle: {
              backgroundColor: "#007E6E",
              height: 65,
              paddingTop: 8,
              borderTopWidth: 0,
              borderRadius: 50,
              marginBottom: 0,
            },
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default AppAdminTabs;
