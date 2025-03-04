import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { Ref } from 'vue'

const getSettingsConfirm = async (data: {email: string, user_name: string, id: number}) => {
    const response = await axiosClient.get('http://localhost:3000/get-confirm-code', {
        params: data,
    });
    return response.data
}

export const useGetSettingsConfirm = () => {
    return useMutation({
        mutationFn: getSettingsConfirm,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const setNewSettings = async (data: {content: string[], code: number, id: number, type: string}) => {
    const response = await axiosClient.patch('http://localhost:3000/set-settings', data);
    return response.data
}

export const useSetSettings = () => {
    return useMutation({
        mutationFn: setNewSettings,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}


const getAllReports = async (token: string) => {
    const response = await axiosClient.get('http://localhost:3000/get-all-reports', {
        headers: {
            token: token,
        },
    });
    return response.data
}

export const useGetAllReports = () => {
    return useMutation({
        mutationFn: getAllReports,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const closeReport = async (data: {id: number, user_id: number, admin_id: number, content: string, content_id: string | null, content_type: boolean | null, token: string}) => {
    const response = await axiosClient.post('http://localhost:3000/close-report', data, {
        headers: {
            token: data.token,
        },
    });
    return response.data
}

export const useCloseReport = () => {
    return useMutation({
        mutationFn: closeReport,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const getAllNotif = async () => {
    const response = await axiosClient.get('http://localhost:3000/get-all-notif');
    return response.data
}

export const useGetAllNotif = () => {
    return useMutation({
        mutationFn: getAllNotif,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const getAllUser = async (data: {name: string | null, activated_type: number | null, admin: boolean | null, token: string}) => {
    const response = await axiosClient.get('http://localhost:3000/get-all-users', {
        params: data,
        headers: {
            token: data.token,
        },
    });    
    return response.data
}

export const useGetAllUser = () => {
    return useMutation({
        mutationFn: getAllUser,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const setUserNewSettings = async (data: {content: string, id: number, type: number, token: string}) => {
    const response = await axiosClient.patch('http://localhost:3000/set-user-settings', data, {
        headers:{
            token: data.token
        }
    });
    return response.data
}

export const useSetUserNewSettings = () => {
    return useMutation({
        mutationFn: setUserNewSettings,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const setNewUserRoles = async (data: {id: number, type: number, token: string}) => {
    const response = await axiosClient.patch('http://localhost:3000/set-user-roles', data, {
        headers:{
            token: data.token
        }
    });
    return response.data
}

export const useSetUserRoles = () => {
    return useMutation({
        mutationFn: setNewUserRoles,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const getAllNotifs = async (id: number) => {
    const response = await axiosClient.get('http://localhost:3000/get-all-notifs', {
        params: {
            id
        }
    });
    return response.data
}

export const useGetAllNotifs = () => {
    return useMutation({
        mutationFn: getAllNotifs,
        onMutate: () => {

        },
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}