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

const getCategories = async () => {
    const response = await axiosClient.get('http://localhost:3000/full-categories');
    return response.data
}

export const useGetCategories = () => {
    return useMutation({
        mutationFn: getCategories,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const getSubcategories = async (idList: Array<number>) => {
    const response = await axiosClient.post('http://localhost:3000/full-subcategories', idList);
    return response.data
}

export const useGetSubcategories = () => {
    return useMutation({
        mutationFn: getSubcategories,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}