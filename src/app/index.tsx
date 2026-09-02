import { useTodos } from "@/hooks/useTodos";
import { useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  // Estado local para guardar o que o usuário digita
  const [textoDigitado, setTextoDigitado] = useState('');

  // Pegamos as 3 ferramentas do nosso hook
  const {query, criarTodo, concluirTodo} = useTodos();
  const {data, isLoading, isError} = query;

  const handlerCriar = () =>{
    if (textoDigitado.trim() === '') return;
    criarTodo.mutate(textoDigitado);
    setTextoDigitado(''); // Limpa o campo
  };

  if (isLoading)
    return
  <ActivityIndicator style={styles.centralizado} />;

  if (isError)
    return
  <Text style={styles.centralizado}>Erro na API</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tarefa (POST e PUT)</Text>

    {/* Resolução: "image_ed7c95.jpg" - Input e Botão */}
    <View style={styles.form}>
      <TextInput
      style={styles.input}
      placeholder="Digite uma nova tarefa"
      value={textoDigitado}
      onChangeText={setTextoDigitado}/>
      <Button title="Cadastrar" onPress={handlerCriar} disabled={criarTodo.isPending}/>
    </View>

    <FlatList
    data={data?.todos}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({item}) =>(
      // Resolução: "image_ed7cb5.jpg" - Transformando o cartão em clicável
      <TouchableOpacity style={styles.cartao} onPress={() => concluirTodo.mutate(item.id)}
      disabled={item.completed}> // Se já estiver concluído, não clica
      <Text style={[styles.texto, item.completed && styles.textoRiscado]}>{item.todo}</Text>
      <Text style={styles.status}>
      {item.completed ? '✅ Concluído' : '❌ Pendente (Clique para concluir)'}
      </Text>
      </TouchableOpacity>
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

  form:{
    flexDirection: 'row',
    marginBottom: 20,
  },

  input:{
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc'
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
