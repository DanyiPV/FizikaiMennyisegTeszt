import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'

const getAllTables = async () => {
    const response = await axiosClient.get('http://localhost:3000/all-tables');
    return response.data
}

export const useGetAllTables = () => {
    return useMutation({
        mutationFn: getAllTables,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}