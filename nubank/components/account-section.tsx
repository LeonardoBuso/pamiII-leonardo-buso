import { View, Text, StyleSheet } from 'react-native';

export default function AccountSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saldo em conta</Text>
      <Text style={styles.value}>••••</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  value: {
    marginTop: 8,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});