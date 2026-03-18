import { View, Text, StyleSheet } from 'react-native';

export default function SavingsSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total em Caixinhas</Text>

      <View style={styles.box}>
        <Text style={styles.plus}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    color: '#00D4FF',
    fontSize: 40,
  },
});