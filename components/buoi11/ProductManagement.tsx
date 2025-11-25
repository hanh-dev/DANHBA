// ProductManagement.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { addProduct, getAllProducts, getCategories, initSampleData } from '@/database/productService';
import { Product } from '@/database/interface/appInterface';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        await initSampleData();
        const all = await getAllProducts();
        console.log('✅ Fetched products:', all);
        setProducts(all);
      } catch (err) {
        console.error('❌ Error initializing data:', err);
      } finally {
      }
    };
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm ({products.length}):</Text>
      {products.length === 0 ? (
        <Text style={styles.emptyText}>Không có sản phẩm nào</Text>
      ) : (
        products.map((p) => (
          <View key={p.id} style={styles.productItem}>
            <Text style={styles.productName}>{p.name}</Text>
            <Text style={styles.productPrice}>${p.price.toFixed(2)}</Text>
            <Text>{p.img}hh</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 20,
  },
});
