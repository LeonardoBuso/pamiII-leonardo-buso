import { Text, View, TouchableOpacity, Image, StyleSheet, ImageBackground, FlatList, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";

const { width } = Dimensions.get("window");

export default function Inicio() {
  const flatListRef = useRef(null);
  const [indexAtual, setIndexAtual] = useState(0);

  const Destaques = [
    { id: "1", imagem: require('../assets/images/mob.jpg'), titulo: "Mob Psycho 100" },
    { id: "2", imagem: require('../assets/images/silencio.jpg'), titulo: "A Voz do Silêncio" },
    { id: "3", imagem: require('../assets/images/violet.jpg'), titulo: "Violet Evergarden" },
    { id: "4", imagem: require('../assets/images/hunter.png'), titulo: "Hunter X Hunter" },
    { id: "5", imagem: require('../assets/images/titan.png'), titulo: "Attack on Titan" },
  ];

  const emAlta = [
    { id: "1", imagem: require('../assets/images/jujutsu.jpg') },
    { id: "2", imagem: require('../assets/images/hell.jpg') },
    { id: "3", imagem: require('../assets/images/piece.jpeg') },
    { id: "4", imagem: require('../assets/images/chain.jpg') },
    { id: "5", imagem: require('../assets/images/gachi.png') },
  ];

  const Comedia =[
    {id:"1", imagem: require('../assets/images/piece.jpeg')},
    {id:"2", imagem: require('../assets/images/spy.png')},
    {id:"3", imagem: require('../assets/images/stone.jpg')},
    {id:"4", imagem: require('../assets/images/punch.jpg')},
    {id:"5", imagem: require('../assets/images/magia.jpg')},
  ];

 useEffect(() => {
  const intervalo = setInterval(() => {
    setIndexAtual((indexAnterior) => {
      let proximoIndex = indexAnterior + 1;
      if (proximoIndex >= Destaques.length) proximoIndex = 0;

      flatListRef.current?.scrollToIndex({ index: proximoIndex, animated: true });
      return proximoIndex;
    });
  }, 2500);

  return () => clearInterval(intervalo);
}, []);

  const abrirLink = () => router.push("/");

  return (
    <View style={styles.container}>

      {/*FlatList vertical*/}
      <FlatList
        data={emAlta} 
        keyExtractor={(item) => item.id}
        
        ListHeaderComponent={

          <>
            {/*Destaques*/}
            <FlatList
              ref={flatListRef}
              data={Destaques}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              snapToInterval={width * 0.9}
              decelerationRate="fast"
              keyExtractor={(item) => item.id}
                getItemLayout={(data, index) => (
                 {length: width * 0.9, offset: width * 0.9 * index, index}
                    )}
                    
                    onScrollToIndexFailed={() => {
                        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
                    }}
              renderItem={({ item }) => (
                <View style={styles.destaque}>
                  <ImageBackground source={item.imagem} style={styles.imagemDestaque} imageStyle={{ borderRadius: 30 }}>
                    <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.gradiente}>
                      <Text style={styles.titulo}>{item.titulo}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </View>
              )}
            />

            {/*emAlta*/}
            <View style={styles.secao}>
            <Text style={styles.nomesecao}>Em Alta</Text>
            <FlatList
              data={emAlta}
              horizontal
              showsHorizontalScrollIndicator={true}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <Image source={item.imagem} style={styles.capaAlta} />
                </View>
              )}
            />
            </View>

            <View style={styles.secao}>
              <Text style={styles.nomesecao}>Comédia</Text>
              <FlatList
              data={Comedia}
              horizontal
              showsHorizontalScrollIndicator={true}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <View>
                    <Image source ={item.imagem} style={styles.capaAlta}></Image>
                </View>

              )}
              />
            </View>

          </>
        }
      />

      {/* Barra Superior */}
      <LinearGradient colors={["#000000", "transparent"]} style={styles.barraSuperior}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Feather name="search" size={35} color="#fff" style={styles.search} />
        <Feather name="cast" size={35} color="#fff" />
      </LinearGradient>

      {/* Barra Inferior */}
      <View style={styles.barraInferior}>
        <View style={styles.label}>
          <Feather name="home" size={25} color="#c05702" />
          <Text style={styles.labelText}>Inicio</Text>
        </View>
        <View style={styles.label}>
          <Feather name="bookmark" size={25} color="#fff" />
          <Text style={styles.labelText}>Listas</Text>
        </View>
        <View style={styles.label}>
          <Feather name="command" size={25} color="#fff" />
          <Text style={styles.labelText}>Explorar</Text>
        </View>
        <View style={styles.label}>
          <Feather name="star" size={25} color="#fff" />
          <Text style={styles.labelText}>Simulcasts</Text>
        </View>
        <View style={styles.label}>
          <TouchableOpacity style={styles.perfil} onPress={abrirLink}>
            <ImageBackground source={require('../assets/images/tavares.jpeg')} style={styles.imagemPerfil} />
          </TouchableOpacity>
          <Text style={styles.labelText}>Trocar conta</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
    secao:{
    paddingTop:0,
    paddingHorizontal:10,
    marginTop:15,
    },

  nomesecao:{
    fontSize:25,
    fontWeight:"bold",
    color:"#ffff",
    marginBottom:0,
  },

  capaAlta: {
    width: 150,
    height: 250,
    marginRight: 15,
    borderRadius: 10,
    resizeMode: "cover",
  },

  destaque: {
    width: width * 0.9,
    height: 310,
    marginHorizontal: 5,
    borderRadius: 30,
    overflow: "hidden",
  },

  imagemDestaque: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  gradiente: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    borderRadius: 30,
  },

  titulo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  barraSuperior: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 10,
  },

  logo: { height: 65, width: 65 },
  search: { marginLeft: 100 },

  barraInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#262626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 15,
    zIndex: 10,
  },

  label: { alignItems: "center" },
  labelText: { color: "#fff", fontSize: 10 },

  perfil: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
  },

  imagemPerfil: { width: "100%", height: "100%", resizeMode: "cover" },
});