import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'

const Test = () => {
    const [data, setData] = useState({
        name: '',
        age: 0
    });

    const handleChange = (field: 'name' | 'age', value: string) => {
        setData((prevData) => ({
            ...prevData,
            [field]: field === 'age' ? parseInt(value, 10) || 0 : value,
        }));
    }

    return (
        <View>
            <Text>Please fill your information</Text>
            <TextInput
                placeholder="Name"
                value={data.name}
                onChangeText={(text) => handleChange('name', text)}
            />
            <TextInput
                placeholder="Age"
                value={data.age.toString()}
                onChangeText={(text) => handleChange('age', text)}
            />
            <Button title="Press me" onPress={() => alert(`Name: ${data.name}, Age: ${data.age}`)} />
        </View>
    )
}

export default Test

const styles = StyleSheet.create({})