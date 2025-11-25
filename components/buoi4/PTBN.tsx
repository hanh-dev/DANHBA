import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { isNaN } from '../utils/validation';
import React, { useRef, useState } from 'react'

const PTBN = () => {
    const [numA, setNumA] = useState('');
    const [numB, setNumB] = useState('');
    const [result, setResult] = useState('');
    const textRef1 = useRef<TextInput>(null);
    const textRef2 = useRef<TextInput>(null);

    const handleCaculate = ({num1, num2}: {num1: string, num2: string}) => {

        if(isNaN(num1) && isNaN(num2)) {
            textRef1.current?.focus();
            setResult('Vui long nhap so dung cho a va b');
            return;
        };

        if(isNaN(num1)) {
            setResult('Vui long nhap so dung cho a');
            textRef1.current?.focus();
            return;
        }
        if(isNaN(num2)) {
            setResult('Vui long nhap so dung cho b');
            textRef2.current?.focus();
            return;
        }

        const a = parseFloat(num1);
        const b = parseFloat(num2);

        if(a===0) {
            if(b===0) {
                setResult('Phuong trinh vo so nghiem');
            } else {
                setResult('Phuong trinh vo nghiem');
            }
        }else {
            const x = -b/a;
            setResult(`Phuong trinh co nghiem x = ${x}`);
        }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PTBN</Text>
      <TextInput style={styles.text} placeholder='Nhap a' value={numA} onChangeText={setNumA} ref={textRef1} />
      <TextInput style={styles.text} placeholder='Nhap b' value={numB} onChangeText={setNumB} ref={textRef2} />
      <Button title='Tinh' onPress={() => handleCaculate({num1: numA, num2: numB})} />
      <Text style={styles.input}>Ket qua: {result !== '' && <Text>{result}</Text>}</Text>
    </View>
  )
}

export default PTBN

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#80A1BA'
    },
    text: {
        color: '#FFF7DD'
    },
    input: {
        borderWidth: 1,
        borderColor: '#FFF7DD',
        padding: 10,
        color: '#FFF7DD'
    }
})