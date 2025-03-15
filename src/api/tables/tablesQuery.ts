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

const getTraningTables = async (settings: {alkatIds: Array<number>, sorok: number, diff: number}) => {
    const response = await axiosClient.post('http://localhost:3000/traning-tables', settings);
    return response.data
}

export const useGetTraningTables = () => {
    return useMutation({
        mutationFn: getTraningTables,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const getFinalStats = async (stats: {tables: Array<object>, tablak: string , time: number, diff: number, def_time: number, tpont: number, exam_id: number | null, token: string}) => {
    const response = await axiosClient.post('http://localhost:3000/get-final-stats', stats);
    return response.data
}

export const useGetFinalStats = () => {
    return useMutation({
        mutationFn: getFinalStats,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const getResults = async (token: string) => {
    const response = await axiosClient.get('http://localhost:3000/get-results',{
        headers:{
            token: token
        }
    });
    return response.data
}

export const useGetResults = () => {
    return useMutation({
        mutationFn: getResults,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const getOsztalyok = async (token: string) => {
    const response = await axiosClient.get('http://localhost:3000/get-osztalyok',{
        headers:{
            token: token
        }
    });
    return response.data
}

export const useGetOsztalyok = () => {
    return useMutation({
        mutationFn: getOsztalyok,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}