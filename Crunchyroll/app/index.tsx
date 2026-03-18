import { Text, View,Button,StyleSheet, TouchableOpacity,Image,ImageBackground,Linking } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Feather} from "@expo/vector-icons";
import {router} from "expo-router";

export default function Index() {
  function AdicionarPerfil({ IconComponent, iconName, label}: any) {
  return (
    <TouchableOpacity style={styles.perfil}>
      <View>
        <IconComponent name={iconName} size={50} color="#ffff" justifyContent="center"/>
      </View>
      <Text style={styles.adicionar}>{label}</Text>
    </TouchableOpacity>
  );
}

const abrirTela = () =>{
    router.push("/home");
};

  return (
<ImageBackground
  source={require('../assets/images/frieren.jpg')}
  style={styles.container} 
>
      <Text style={styles.titulo} >Quem vai partir em uma aventura?</Text>
      
      <View style={styles.grid}>
        <View style={styles.linha}>
        
          <View style={styles.profile}>
            <TouchableOpacity style={styles.perfil} onPress={abrirTela}><Image source={require('../assets/images/rocha.png')} style={styles.imagem}/></TouchableOpacity>
            <Text style={styles.nome}>Rocha</Text>
          </View>

          <View style={styles.profile}>
              <TouchableOpacity style={styles.perfil} onPress={abrirTela}><Image source={require('../assets/images/fernando.jpeg')} style={styles.imagem}/></TouchableOpacity>
              <Text style={styles.nome}>Fernando</Text>  
          </View>

          </View>

      <View style={styles.linha}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.perfil} onPress={abrirTela}><Image source={require('../assets/images/buso.png')} style={styles.imagem} /></TouchableOpacity>
          <Text style={styles.nome}>Buso</Text>
        </View>

        <View style={styles.profile}>
          <TouchableOpacity style={styles.perfil} onPress={abrirTela}><Image source={require('../assets/images/pele.jpg')} style={styles.imagem}/></TouchableOpacity>
          <Text style={styles.nome}>Pelesenha</Text>
        </View>
      </View>

        <View style={styles.linha}>
        <AdicionarPerfil
              IconComponent={Feather} 
                iconName="plus" 
              />
        </View>
      </View>
      <Text style={styles.adicionar}>Adicionar um novo perfil</Text>

      </ImageBackground>
  
  );
}
const styles = StyleSheet.create({
  nome:{
  marginTop:6,
  color:"black",
  fontSize:14
},

  profile:{
    alignItems:"center",
    marginHorizontal:15,
  },

  adicionar:{
    color:"#000000",
    fontSize:20,
    marginTop:"-10%",
    
  },

  linha:{
    flexDirection:"row",
    justifyContent:"center",
    marginBottom:"10%",
  },
  
  titulo:{
    textAlign: "center",
    marginTop: "10%",
    fontSize: 25,
    color:"#ffffff",
  },
  
  container:{
    flex:1,
    alignItems:"center",
    marginRight:"0%",
  },

perfil:{
  borderRadius:50,
  width:100,
  height:100,
  marginHorizontal:10,
  overflow:"hidden",
  borderColor:"#ffffff",
  borderWidth:1,
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:"#000000"
},
  
  grid:{
    marginTop:"10%",
  },

  imagem:{
    height:"100%",
    width:"100%",
    resizeMode:"cover",
  }






})