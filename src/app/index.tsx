import { useTodos } from "@/hooks/useTodos";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const {data,isLoading,isError} = useTodos();
  
  if (isLoading){
    return(
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#0000ff"/>
        <Text>Carregadno tarefa da prova...</Text>
      </View>
    )
  }
  if (isError){
    return(
      <View style={styles.centralizado}>
      <Text>Ops deu algo de errado </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tarefa (DummyJSON)</Text>

    <FlatList
    data={data?.todos}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({item}) =>(
      <View style={styles.cartao}>
        <Text style={[styles.texto, item.completed && styles.textoRiscado]}>
          {item.todo}
        </Text>
        <Text style={styles.status}>
        </Text>
      </View>
    )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    backgroundColor:'#f0f0f0'
  },

  centralizado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  cartao:{
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },

  texto:{
    fontSize: 16,
  },

  textoRiscado:{
    textDecorationColor: 'line-through',
    color: '#999',
  },

  status:{
    marginTop: 8,
    fontSize: 12,
    fontWeight: 'bold',
  }
});
