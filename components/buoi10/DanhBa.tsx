import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const CardContact = ({
  contact,
  setUpdate,
  setEditId,
  onDelete,
}: {
  contact: Contact;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setEditId: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (id: string) => void;
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInfor}>
        <Text>💬</Text>
        <View>
          <Text style={styles.cardName}>{contact.name}</Text>
          <Text style={styles.cardPhoneNumber}>{contact.phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => {
            setUpdate(true);
            setEditId(contact.id);
          }}
        >
          <Text>🖊️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(contact.id)}>
          <Text>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DanhBa = () => {
  const [newContact, setNewContact] = useState<Contact>({
    id: "",
    name: "",
    phoneNumber: "",
  });
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [update, setUpdate] = useState(false);
  const [editId, setEditId] = useState("");
  const textRef1 = useRef<TextInput>(null);
  const textRef2 = useRef<TextInput>(null);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Nguyen Van A", phoneNumber: "0123456789" },
    { id: "2", name: "Tran Thi B", phoneNumber: "0987654321" },
    { id: "3", name: "Le Van C", phoneNumber: "0123456789" },
  ]);

  const handleValidateInput = () => {
    if (newContact.name.trim() === "" && newContact.phoneNumber.trim() === "") {
      Alert.alert("Vui lòng nhập đầy đủ thông tin đây đủ.");
      textRef1.current?.focus();
      return false;
    }
    if (newContact.name.trim() === "") {
      Alert.alert("Vui lòng nhập đầy đủ thông tin tên.");
      textRef1.current?.focus();
      return false;
    }
    if (newContact.phoneNumber.trim() === "") {
      Alert.alert("Vui lòng nhập đầy đủ thông tin số điện thoại.");
      textRef2.current?.focus();
      return false;
    }
    if (!/^\d{10,11}$/.test(newContact.phoneNumber)) {
      Alert.alert("Số điện thoại phải gồm 10–11 chữ số.");
      textRef2.current?.focus();
      return false;
    }
    return true;
  };

  const handleSearch = (text: string) => {
    if (text.trim() === "") {
      setContacts(contacts);
    } else {
      const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(text.toLowerCase())
      );
      if (filteredContacts.length === 0) {
        setResult("Không tìm thấy danh bạ phù hợp!");
      }
      setContacts(filteredContacts);
    }
  };

  const handleSaveNewContact = () => {
    if (!handleValidateInput()) return;

    const newId = (contacts.length + 1).toString();
    const contactToAdd = { ...newContact, id: newId };
    setContacts([...contacts, contactToAdd]);
    setNewContact({ id: "", name: "", phoneNumber: "" });
    Alert.alert("Thêm danh bạ thành công!");
  };

  useEffect(() => {
    if (update) {
      const contactToEdit = contacts.find((c) => c.id === editId);
      if (contactToEdit) {
        setNewContact(contactToEdit);
      }
    }
  }, [update, editId]);

  const handleUpdateContact = () => {
    handleValidateInput();
    const updatedContacts = contacts.map((c) =>
      c.id === newContact.id
        ? { ...c, name: newContact.name, phoneNumber: newContact.phoneNumber }
        : c
    );
    setContacts(updatedContacts);
    setNewContact({ id: "", name: "", phoneNumber: "" });
    Alert.alert("Cập nhật danh bạ thành công!");
  };

  const handleDeleteContact = (id: string) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa danh bạ này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => {
            const updatedContacts = contacts.filter((c) => c.id !== id);
            setContacts(updatedContacts);
            Alert.alert("Đã xóa danh bạ thành công!");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>DANH BẠ</Text>
        <View style={styles.buttonWrapper}>
          <TextInput
            ref={textRef1}
            value={newContact.name}
            onChangeText={(text) =>
              setNewContact({ ...newContact, name: text })
            }
            placeholder="Tên"
            style={styles.input}
          />
          <TextInput
            ref={textRef2}
            value={newContact.phoneNumber}
            onChangeText={(text) =>
              setNewContact({ ...newContact, phoneNumber: text })
            }
            placeholder="Số điện thoại"
            style={styles.input}
          />
          {update ? (
            <TouchableOpacity
              style={[styles.input, styles.buttonAdd]}
              onPress={handleUpdateContact}
            >
              <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.input, styles.buttonAdd]}
              onPress={handleSaveNewContact}
            >
              <Text style={styles.buttonText}>Thêm</Text>
            </TouchableOpacity>
          )}
          <TextInput
            placeholder="Tìm kiếm"
            style={[styles.input, styles.searchInput]}
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              handleSearch(text);
            }}
          />
          {result !== "" && <Text style={styles.resultText}>{result}</Text>}
        </View>
        <View>
          {contacts.map((contact) => (
            <CardContact
              key={contact.id}
              contact={contact}
              setUpdate={setUpdate}
              setEditId={setEditId}
              onDelete={handleDeleteContact}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DanhBa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonWrapper: {
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#0046FF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#001BB7",
    borderRadius: 10,
    backgroundColor: "#F5F1DC",
  },
  buttonAdd: {
    borderWidth: 0,
    padding: 10,
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#FF8040",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#001BB7",
    borderRadius: 14,
    backgroundColor: "#e9e6d7ff",
    paddingHorizontal: 14,
    padding: 8,
    marginBottom: 10,
  },
  resultText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#f6e178ff",
    fontWeight: "bold",
    fontSize: 16,
  },
  //   Card styles
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F1DC",
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardInfor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardName: {
    fontWeight: "bold",
    color: "#FF8040",
  },
  cardPhoneNumber: {
    color: "#001BB7",
  },
  cardActions: {
    flexDirection: "row",
    gap: 8,
  },
});
