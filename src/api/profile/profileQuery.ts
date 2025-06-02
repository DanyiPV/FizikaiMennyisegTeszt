import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'

const ChangeDarkmode = async (type: boolean ) => {
    const response = await axiosClient.post('/change-darkmode',{
        type,
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

const getProfil = async () => {
    const response = await axiosClient.get('/get-user');
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

const checkCookie = async () => {
    const response = await axiosClient.get('/check-cookie');
    return response.data;
};

export const useCheckCookie = () => {
    return useMutation({
        mutationFn: checkCookie,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}

const clearCookie = async () => {
    const response = await axiosClient.get('/clear-cookie');
    return response.data;
};

export const useClearCookie = () => {
    return useMutation({
        mutationFn: clearCookie,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}