import { TodoResponse } from "@/types/todo.response";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchTodos = async () => {
//'api' pré-configurada e avisamos que o formato esperado é o 'TodoResponse'
    const resposta = await api.get<TodoResponse>('/Todos');
    return resposta.data;
};

export function useTodos(){
    return useQuery({
        queryKey: ['lista-todos'], // Etiqueta para o cache
        queryFn: fetchTodos, // Função que busca os dados
    });
}