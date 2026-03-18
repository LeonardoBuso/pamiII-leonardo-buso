import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PixHeader() {
    const router = useRouter();
  <TouchableOpacity onPress={() => router.back()}>
  <Text style={{ color: 'white', fontSize: 50 }}>
    ← Voltar
  </Text>
</TouchableOpacity>
    return (
        <View>
            <Text style={styles.title}>Área Pix</Text>
            <Text style={styles.description}>Envie e receba pagamentos a qualquer hora e dia de semana, sem pagar nada por isso.</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    title:{
        fontSize: 39,
        color: '#fff',
        fontWeight: 'bold'
    },
    description:{
        fontSize: 27,
        color: '#ababab'
    }
})