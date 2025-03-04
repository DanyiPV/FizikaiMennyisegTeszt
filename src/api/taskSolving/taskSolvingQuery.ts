import axiosClient from '../../lib/axios';
import { useMutation, useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';

const GetTaskData = async (id: number) => {
    console.log(id);
    const response = await axiosClient.get(`/api/tasks/get-one-card/${id}`);
    console.log(response.data)
    return response.data;
}

export const UseGetTaskData = (id: number | null) => {
    return useQuery({
        queryKey: ['TaskData', id], // Include id in queryKey
        queryFn: () => (id ? GetTaskData(id) : Promise.resolve(null)), // Pass id properly
        enabled: !!id, // Only run query if id is valid
        onSuccess: (data) => {
            console.log('Task data:', data);
        },
        onError: (error: any) => {
            console.error('Error occurred while fetching task data:', error);
        },
    });
};

