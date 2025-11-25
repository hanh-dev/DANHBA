import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
interface Student {
  id: string;
  name: string;
  age: string;
  grade: string;
}

const ArrayPractice = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [studentId, setStudentId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Ho Van Hanh", age: "10", grade: "7" },
    { id: "2", name: "Ho Van Hieu", age: "20", grade: "8" },
    { id: "3", name: "Ho Van Tu", age: "30", grade: "9" },
    { id: "4", name: "Ho Hieu Do", age: "20", grade: "8" },
    { id: "5", name: "Ho Do Cong", age: "30", grade: "9" },
  ]);

  const openAddStudentForm = () => {
    setUpdate(false);
    setAdd(true);
  };

  const handleSearch = (text: string) => {
    const filteredStudents = students.filter((s) =>
      s.name.toLowerCase().includes(text.toLowerCase())
    );
    setStudents(filteredStudents);
  };

  const openUpdateStudentForm = (studentId: string) => {
    console.log("studentId", studentId);
    setAdd(false);
    setStudentId(studentId);
    setUpdate(true);
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setName(student.name);
      setAge(student.age);
      setGrade(student.grade);
    }
  };

  const handleUpdateStudent = () => {
    const updatedStudents = students.map((s) =>
      s.id === studentId ? { ...s, name, age, grade } : s
    );
    setStudents(updatedStudents);
    setName("");
    setAge("");
    setGrade("");
    setStudentId("");
    setUpdate(false);
  };

  const handleSaveStudent = () => {
    const newStudent: Student = {
      id: (students.length + 1).toString(),
      name: name,
      age: age,
      grade: grade,
    };
    setStudents([...students, newStudent]);
    setName("");
    setAge("");
    setGrade("");
    setAdd(false);
  };

  const handleDeleteStudent = (studentId: string) => {
    const deletedStudents = students.filter((s) => s.id !== studentId);
    setStudents(deletedStudents);
    Alert.alert("Delete student successfully");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Class Management</Text>
      <View style={styles.searchWrapper}>
        <TextInput
          value={searchText}
          placeholder="Search by name"
          onChangeText={setSearchText}
          style={[styles.input, { flex: 1, marginRight: 10 }]}
        />
        <TouchableOpacity style={[styles.input, { padding: 10, backgroundColor: "#DDDDDD" }]} onPress={() => handleSearch(searchText)}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: "#EEEEEE" }}
        onPress={() => openAddStudentForm()}
      >
        <Text style={styles.text2}>{update ? "Update" : "Add"} Student</Text>
        {(add || update) && (
          <View style={styles.addFormWrapp}>
            <TextInput
              style={styles.input}
              placeholder="Student Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Student Age"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Student Grade"
              value={grade}
              onChangeText={(text) => setGrade(text)}
            />
            {add && (
              <TouchableOpacity
                onPress={handleSaveStudent}
                style={[styles.input, styles.buttonWrapp]}
              >
                <Text style={styles.text2}>Save</Text>
              </TouchableOpacity>
            )}
            {update && (
              <TouchableOpacity
                onPress={handleUpdateStudent}
                style={[styles.input, styles.buttonWrapp]}
              >
                <Text style={styles.text2}>Update</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
      <Text>Số lượng học sinh trên 8 điểm là: {(students.filter((s) => Number(s.grade) > 8)).length}</Text>
      <FlatList
        style={{ marginTop: 20 }}
        data={students}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.inforWrapp}>
            <View>
              <Text>Name: {item.name}</Text>
              <Text>Age: {item.age}</Text>
              <Text>Grade: {item.grade}</Text>
            </View>
            <View style={styles.buttonWrapp}>
              <TouchableOpacity
                style={[styles.input, styles.buttonUpdate]}
                onPress={() => openUpdateStudentForm(item.id)}
              >
                <Text style={styles.text3}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.input, styles.buttonDelete]}
                onPress={() => handleDeleteStudent(item.id)}
              >
                <Text style={styles.text3}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ArrayPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  addFormWrapp: {
    gap: 4,
    marginTop: 10,
  },
  inforWrapp: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#FF8040",
    padding: 4,
    alignItems: "center",
  },
  buttonWrapp: {
    gap: 4,
    padding: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E9D484",
    borderRadius: 4,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6E8CFB",
    textAlign: "center",
  },
  text2: {
    color: "#FF9013",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonUpdate: {
    backgroundColor: "#BF092F",
    borderWidth: 0,
    color: "#fff",
    padding: 4,
  },
  buttonDelete: {
    backgroundColor: "#F5AD18",
    borderWidth: 0,
    padding: 4,
  },
  text3: {
    color: "#fff",
  },
});
