import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Header() {
  
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.profileCircle}>
          <Feather name="user" size={20} color="white" />
        </View>

        <View style={styles.icons}>
          <Feather name="eye-off" size={22} color="white" />
          <Feather name="help-circle" size={22} color="white" />
          <Feather name="mail" size={22} color="white" />
        </View>
      </View>

      <Text style={styles.greeting}>Olá, Felipe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#820AD1',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#9B3BDA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    gap: 15,
  },
  greeting: {
    marginTop: 20,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});