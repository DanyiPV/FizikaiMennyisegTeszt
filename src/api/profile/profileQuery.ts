import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'

const ChangeDarkmode = async (data: { token: string; type: boolean }) => {
    const response = await axiosClient.post('http://localhost:3000/change-darkmode',{
        type: data.type,
    }, 
    {
        headers: {
            token: data.token,
        }
    });
    return response.data;
};

export const useChangeDarkmode = () => {
    return useMutation({
        mutationFn: ChangeDarkmode,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}

const getProfil = async (token: string) => {
    const response = await axiosClient.get('http://localhost:3000/get-user',{
        headers: {
            token: token,
        }
    });
    return response.data;
};

export const useGetProfil = () => {
    return useMutation({
        mutationFn: getProfil,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}