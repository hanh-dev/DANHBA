import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getOrdersByUserId } from "../buoi12/database";

export const renderOrderItem = ({ order }: { order: any }) => {
  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN")
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "#4CAF50";
      case "CANCELED":
        return "#FF3B30";
      case "PENDING":
        return "#FFC300";
      default:
        return "#007AFF";
    }
  };

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.avatarPlaceholder}>
        <Ionicons name="receipt-outline" size={24} color="#4CAF50" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>Order #{order.id}</Text>
        <Text style={styles.categoryText}>
          Order date: {formatOrderDate(order.order_date)}
        </Text>
        <Text
          style={[
            styles.nameText,
            { fontWeight: "700", color: "red", marginTop: 5 },
          ]}
        >
          ${order.total_amount.toFixed(2)}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={[
            styles.categoryText,
            { color: getStatusColor(order.status), fontWeight: "bold" },
          ]}
        >
          {order.status}
        </Text>
        <TouchableOpacity style={{ marginTop: 5 }}>
          <Ionicons name="chevron-forward-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let userId: number | null = null;
      try {
        const userIdJson = await AsyncStorage.getItem("userId");

        if (userIdJson && userIdJson.trim() !== "") {
          const parsedId = JSON.parse(userIdJson);
          if (typeof parsedId === "number") {
            userId = parsedId;
          }
        }
      } catch (e) {
        console.error("Lỗi khi đọc userId từ AsyncStorage:", e);
      }

      if (userId === null) {
        console.log("Không tìm thấy User ID. Không thể tải đơn hàng.");
        return;
      }

      try {
        const fetchedOrders = await getOrdersByUserId(userId);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.headerText}>Order History</Text>

      {orders.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Ionicons name="basket-outline" size={50} color="gray" />
          <Text style={{ marginTop: 10, color: "gray" }}>
            You have no orders yet.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {orders.map((order, index) => (
            <View key={index}>{renderOrderItem({ order })}</View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    height: 80,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 12,
    color: "#658C58",
  },
});
