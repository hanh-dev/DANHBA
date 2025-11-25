import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { products } from '../../constants/products'
import Card from './Card'
const ProductNew = () => {
  return (
    <View>
      <View>
        {products.map((item, index) => (
            <Card key={index} name={item.name} />
        ))}
      </View>
    </View>
  )
}

export default ProductNew

const styles = StyleSheet.create({})