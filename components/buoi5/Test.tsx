import { StyleSheet, Text, View } from 'react-native'

const Test = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Text>Section1</Text>
      </View>
      <View style={styles.section2}>
        <Text>Section2</Text>
      </View>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    section1 :{
        flex: 1,
        backgroundColor: 'blue'
    },
    section2: {
        flex:2,
        backgroundColor: 'red'
    }
})