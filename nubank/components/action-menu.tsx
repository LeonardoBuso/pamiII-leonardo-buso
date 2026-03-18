import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


function ActionItem({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.circle}>
        <Feather name={icon} size={22} color="white" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function ActionMenu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ActionItem 
        onPress={() => router.push('/pix')} 
        icon="repeat" 
        label="Área Pix" 
      />
      <ActionItem
      onPress={() => router.push('/payments')}
      icon="barcode" label="Pagar" />
      <ActionItem icon="grid" label="Pix QR" />
      <ActionItem icon="smartphone" label="Recarga" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    width: 80,
  },
  circle: {
    backgroundColor: '#2A2A2A',
    width: 65,
    height: 65,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
  },
}); 
