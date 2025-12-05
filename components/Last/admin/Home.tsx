import {
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from "@/components/buoi12/database";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SwipeListView } from "react-native-swipe-list-view";
import Toast from "react-native-toast-message";

const STATUS_DATA = [
  { label: "PENDING", value: "PENDING" },
  { label: "COMPLETED", value: "COMPLETED" },
  { label: "DELIVERED", value: "DELIVERED" },
  { label: "CANCELED", value: "CANCELED" },
];

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
    case "COMPLETED":
      return "#007AFF";
    case "PENDING":
    default:
      return "#FFC300";
  }
};

const OrderItem = ({
  order,
  onDetailPress,
}: {
  order: any;
  onDetailPress: (id: number) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onDetailPress(order.id)}
    >
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
          ${order.total_amount}
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

const AdminHome = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const navigation: any = useNavigation();
  const [orders, setOrders] = useState<any[]>([]);

  const [editingStatus, setEditingStatus] = useState<string | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["50%", "85%"], []);

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await AsyncStorage.getItem("userName");
      setUserName(name);
    };
    const fetchOrders = async () => {
      const result = await getOrders();
      setOrders(result);
    };
    fetchUserName();
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      setEditingStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  const handleOrderDetail = useCallback(
    (id: number) => {
      const found = orders.find((o) => o.id === id);
      if (found) {
        setSelectedOrder(found);
        console.log("Check orders: ", found);
        bottomSheetModalRef.current?.present();
      }
    },
    [orders]
  );

  const handleDismissModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleUpdateStatus = useCallback(async () => {
    if (
      !selectedOrder ||
      !editingStatus ||
      editingStatus === selectedOrder.status
    )
      return;

    let updateSuccess = false;
    try {
      updateSuccess = await updateOrderStatus(selectedOrder.id, editingStatus);
    } catch (error) {
      console.error("DB Update Error:", error);
      updateSuccess = false;
    }

    if (updateSuccess) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: editingStatus }
            : order
        )
      );

      setSelectedOrder((prevOrder) =>
        prevOrder ? { ...prevOrder, status: editingStatus } : null
      );

      Toast.show({
        type: "success",
        text1: `Order #${selectedOrder.id} status updated! 🎉`,
        text2: `New status: ${editingStatus}`,
      });

      handleDismissModal();
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error at udpating new status.",
      });
    }
  }, [selectedOrder, editingStatus, handleDismissModal]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("role");

    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn" }],
    });
  };

  // Delete
  const handleDelete = async (orderId: number) => {
    console.log("Check id: ", orderId);
    const filterOrder = orders.filter((order) => order.id !== orderId);
    setOrders(filterOrder);
    await deleteOrder(orderId);
  };
  const renderHiddenItem = ({ item }: { item: any }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.leftHeader}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={require("../../../assets/grocery/hanh.jpg")}
                    style={styles.image}
                  />
                </View>
                <Text style={styles.textAddress}>
                  Hi! {userName}, Ho Chi Minh
                </Text>
              </View>

              <View style={styles.rightHeader}>
                <TouchableOpacity onPress={handleLogout}>
                  <Ionicons name="log-out-outline" size={25} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            <Text style={styles.titleText}>Management Board</Text>
            <View style={styles.adminContainer}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("UserManagement")}
              >
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={30}
                  color="#FF6B6B"
                />
                <Text style={styles.cardTitle}>Users</Text>
                <Text style={[styles.cardSub, { color: "#FF6B6B" }]}>12</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("CategoryManagement")}
              >
                <MaterialCommunityIcons
                  name="shape-outline"
                  size={30}
                  color="#4D96FF"
                />
                <Text style={styles.cardTitle}>Categories</Text>
                <Text style={[styles.cardSub, { color: "#4D96FF" }]}>14</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("ProductManagement")}
              >
                <MaterialCommunityIcons
                  name="cube-outline"
                  size={30}
                  color="#6BCB77"
                />
                <Text style={styles.cardTitle}>Products</Text>
                <Text style={[styles.cardSub, { color: "#6BCB77" }]}>16</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("OrderManagement")}
              >
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={30}
                  color="#FFD93D"
                />
                <Text style={styles.cardTitle}>Orders</Text>
                <Text style={[styles.cardSub, { color: "#FFD93D" }]}>20</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>New Orders</Text>
            {/* Delete */}
            <SwipeListView
              data={orders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <OrderItem order={item} onDetailPress={handleOrderDetail} />
              )}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-60}
              disableRightSwipe
              contentContainerStyle={styles.listContainer}
            />
          </ScrollView>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={{ backgroundColor: "#ccc" }}
          >
            <BottomSheetView style={styles.bottomSheetView}>
              {selectedOrder ? (
                <>
                  <View style={styles.bottomSheetHeader}>
                    <Text style={styles.bottomSheetTitle}>
                      Order Detail #{selectedOrder.id}
                    </Text>
                    <TouchableOpacity onPress={handleDismissModal}>
                      <Ionicons name="close" size={28} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView contentContainerStyle={styles.detailContent}>
                    <Text style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Date:</Text>{" "}
                      {formatOrderDate(selectedOrder.order_date)}
                    </Text>

                    <Text style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Total:</Text>
                      <Text style={{ color: "red", fontWeight: "bold" }}>
                        {" "}
                        ${selectedOrder.total_amount}
                      </Text>
                    </Text>

                    <View style={styles.statusRow}>
                      <Text style={styles.detailLabel}>Status:</Text>
                      <Dropdown
                        style={styles.dropdown}
                        data={STATUS_DATA}
                        labelField="label"
                        valueField="value"
                        placeholder={selectedOrder.status}
                        value={editingStatus}
                        onChange={(item) => {
                          setEditingStatus(item.value);
                        }}
                        selectedTextStyle={{
                          fontWeight: "bold",
                          color: getStatusColor(
                            editingStatus || selectedOrder.status
                          ),
                        }}
                        renderItem={(item) => (
                          <View style={styles.itemDropdown}>
                            <Text style={{ color: getStatusColor(item.value) }}>
                              {item.label}
                            </Text>
                          </View>
                        )}
                      />
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.saveButton,
                        {
                          opacity:
                            editingStatus === selectedOrder.status ? 0.6 : 1,
                          backgroundColor: "#4CAF50",
                        },
                      ]}
                      onPress={handleUpdateStatus}
                      disabled={editingStatus === selectedOrder.status}
                    >
                      <Text style={styles.saveButtonText}>
                        {editingStatus === selectedOrder.status
                          ? "Status Up-to-date"
                          : `Save New Status (${editingStatus})`}
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.itemsTitle}>Products in Order:</Text>

                    <View style={styles.itemDetailHeader}>
                      <Text style={[styles.itemName, { fontWeight: "bold" }]}>
                        Name
                      </Text>
                      <Text style={[styles.itemUnit, { fontWeight: "bold" }]}>
                        Unit Price
                      </Text>
                      <Text style={[styles.itemQty, { fontWeight: "bold" }]}>
                        Qty
                      </Text>
                      <Text style={[styles.itemPrice, { fontWeight: "bold" }]}>
                        Subtotal
                      </Text>
                    </View>

                    <View style={{ marginTop: 5 }}>
                      {selectedOrder.items &&
                        selectedOrder.items.map((item: any, index: number) => (
                          <View key={index} style={styles.itemDetailCard}>
                            <Text style={styles.itemName}>
                              {item.product_name}
                            </Text>

                            <Text style={styles.itemUnit}>${item.price}</Text>

                            <Text style={styles.itemQty}>x{item.quantity}</Text>

                            <Text style={styles.itemPrice}>
                              ${item.price * item.quantity}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </ScrollView>
                </>
              ) : (
                <Text style={{ textAlign: "center", padding: 20 }}>
                  No order selected.
                </Text>
              )}
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50",
    paddingTop: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginBottom: 26,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  leftHeader: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  imageWrapper: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 32, height: 32, borderRadius: 50 },

  textAddress: { color: "#ffffff", fontSize: 14 },
  rightHeader: { flexDirection: "row", gap: 4 },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 15,
    color: "#4CAF50",
  },
  adminContainer: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    paddingVertical: 22,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cardSub: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "600",
  },
  listContainer: {
    marginHorizontal: 15,
    marginTop: 14,
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

  bottomSheetView: {
    flex: 1,
    paddingHorizontal: 15,
    zIndex: 12,
    position: "absolute",
    elevation: 10,
  },
  bottomSheetBackground: {
    borderRadius: 30,
    backgroundColor: "white",
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 15,
  },
  bottomSheetTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  detailContent: {
    paddingBottom: 20,
  },
  detailRow: {
    fontSize: 16,
    marginTop: 8,
    color: "#333",
  },
  detailLabel: {
    fontWeight: "600",
    color: "#4CAF50",
    marginRight: 10,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    zIndex: 10,
  },
  dropdown: {
    flex: 1,
    height: 45,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  itemDropdown: {
    padding: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  saveButtonText: {
    color: "#ffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemDetailCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  itemName: {
    flex: 3,
    fontSize: 14,
  },
  itemUnit: {
    flex: 2,
    fontSize: 14,
    textAlign: "right",
    color: "#666",
  },
  itemQty: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#666",
  },
  itemPrice: {
    flex: 2,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    color: "#333",
  },
  rowBack: {
    alignItems: "flex-end",
    backgroundColor: "#FF3B30",
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    paddingRight: 12,
    marginBottom: 10,
    // marginRight: 30,
  },
});
