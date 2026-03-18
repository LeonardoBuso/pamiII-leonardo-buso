import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PaymentsScreen() {
  const router = useRouter();

  return (
    
    <View style={styles.container}>
      <TouchableOpacity 
              style={styles.botao_volta}
              onPress={() => router.back()}
            >
              <Text style={styles.circleText}>← Voltar</Text>
            </TouchableOpacity>
      <Text style={styles.title}>Opções de pagamento</Text>

      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.circleButton}>
          <Text style={styles.circleText}>Boleto</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.circleButton}
          onPress={() => router.push('/pix')}
        >
          <Text style={styles.circleText}>Pix</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Mais opções</Text>

      {['Assistente de Pagamentos', 'Débito Automático', 'Contas do Detran', 'Pix por aproximação']
        .map((item, index) => (
          <TouchableOpacity key={index} style={styles.listItem}>
            <Text style={styles.listText}>{item}</Text>
          </TouchableOpacity>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  circleButton: {
    backgroundColor: '#1E1E1E',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    color: '#aaa',
    marginBottom: 15,
  },
  listItem: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  listText: {
    color: 'white',
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