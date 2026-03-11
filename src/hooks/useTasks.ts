
// import { useState, useCallback } from 'react'
import supabase from '../utils/supabase'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function useTasks() {
    
    const queryClient = useQueryClient();

    const { data: tasks = [], isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data, error } = await supabase.from('tasks').select();
            if (error) throw new Error(error.message);
            return data;
        }
    });

    const addTask = useMutation({
        mutationFn: async (task: string) => { 
            const { data: { user } } = await supabase.auth.getUser();
            return supabase.from('tasks').insert({ task, user_id: user?.id });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks']})
    });

    const removeTask = useMutation({
        mutationFn: async (id: number) => supabase.from('tasks').delete().eq('id', id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks']})
    })

    return { tasks, isLoading, error, addTask, removeTask };
}