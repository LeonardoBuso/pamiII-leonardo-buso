import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PixHeader from '../components/pix-header';
import { useRouter } from 'expo-router';

export default function PixScreen() {
  const router = useRouter();
    
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.botao_volta}
        onPress={() => router.back()}
      >
        <Text style={styles.circleText}>← Voltar</Text>
      </TouchableOpacity>
      <PixHeader />
      <View style={styles.grid}>
        {['Transferir', 'Programar', 'Ler QR code',
          'Pix Copia e Cola', 'Cobrar', 'Depositar',]
          .map((item, index) => (
            <TouchableOpacity key={index} style={styles.circle}onPress={()=>alert('Esse botão ainda não é utilizavel')}>
              <Text style={styles.circleText}>{item}</Text>
            </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  circle: {
  backgroundColor: '#1E1E1E',
  width: '30%', 
  height: 120,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
},
  circleText: {
    color: 'white',
    textAlign: 'center',
  },
  botao_volta:{
  backgroundColor: '#1E1E1E',
  width: '30%', 
  height: 120,
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  
  }
});