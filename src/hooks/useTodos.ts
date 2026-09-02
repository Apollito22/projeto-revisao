import { TodoResponse } from "@/types/todo.response";
import { api } from "@/utils/api";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// READ
const fetchTodos = async () => {
    const resposta = await api.get<TodoResponse>('/Todos');
    return resposta.data;
};

// CREATE (POST - pic)
// A DummyJSON exige que passemos o texto, status e um userId válido
const postTodo = async (novoTodo: string) => {
    const resposta = await api.post('/todos/add', {
        todo:novoTodo,
        completed: false,
        userId: 5,
    });
    return resposta.data
};

// UPDATE (PUT - pic)
// Passamos o ID na URL e avisamos que o status mudou para true
const putTodo = async (todoId: number) =>{
    const resposta = await api.put(`/todos/${todoId}`, {
        completed: true,
    });
    return resposta.data;
};

// O Hook Principal que exportamos
export function useTodos(){
    const queryClient = useQueryClient();

    // A busca da lista
    const query = useQuery({
        queryKey: ['lista-todos'],
        queryFn: fetchTodos,
    });

    // A função de Criar
    const criarTodo = useMutation({
        mutationFn: postTodo,
        // Quando criar com sucesso, avisamos o React Query para recarregar a lista
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['lista-todos'] });
            alert("Tarefa criada com sucesso") //feedback visual
        }
    });

    // A função de Atualizar
    const concluirTodo =useMutation({
        mutationFn: putTodo,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['lista-todos'] });
            alert("Tarefa marcada como concluida")
        }
    });

    // Exportamos tudo para a tela usar
    return{
        query,
        criarTodo,
        concluirTodo
    };
}