import { View, Text, StyleSheet } from 'react-native';

export default function CardsButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Meus cartões</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2A',
    margin: 20,
    padding: 15,
    borderRadius: 12,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});