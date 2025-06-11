import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'

const getAllTables = async () => {
    const response = await axiosClient.get('/all-tables');
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
    const response = await axiosClient.get('/full-categories');
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
    const response = await axiosClient.post('/full-subcategories', idList);
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
    const response = await axiosClient.post('/traning-tables', settings);
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

const getFinalStats = async (stats: {tables: Array<object>, tablak: string , time: number, diff: number, def_time: number, tpont: number, exam_id: number | null}) => {
    const response = await axiosClient.post('/get-final-stats', stats);
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

const getResults = async (exam: boolean) => {
    const response = await axiosClient.get('/get-results',{
        params:{
            exam
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

const getOsztalyok = async () => {
    const response = await axiosClient.get('/get-osztalyok');
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

const getUserResults = async (data: {search: string | null, osztaly: string | null, last: number, exam: boolean}) => {
    const response = await axiosClient.post('/get-user-result', data);
    return response.data
}

export const usGetUserResults = () => {
    return useMutation({
        mutationFn: getUserResults,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const setNewExam = async (data: {tableidList: Array<number>, message: string, sorok: number, time: number, diff: number, osztaly: string, kezdet: string}) => {
    const response = await axiosClient.post('/set-new-exam', data);
    return response.data
}

export const useSetNewExam = () => {
    return useMutation({
        mutationFn: setNewExam,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const getExams = async () => {
    const response = await axiosClient.get('/get-exam');
    return response.data
}

export const useGetExams = () => {
    return useMutation({
        mutationFn: getExams,
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}