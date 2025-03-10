import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'

const getSettingsConfirm = async (data: {email: string, user_name: string, id: number}) => {
    const response = await axiosClient.get('http://localhost:3000/get-confirm-code', {
        params: data,
    });
    return response.data
}

export const useGetSettingsConfirm = () => {
    return useMutation({
        mutationFn: getSettingsConfirm,
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
        onSuccess: (response) => {

        },
        onError: (error) => {

        }
    })
}

const ProfilePicUpload = async (data: {id: number, pic: Blob}) => {
    const formData = new FormData();
    formData.append('blob', data.pic);  // A fájl blob néven
    formData.append('id', data.id.toString());  // ID

    try {
        const response = await axiosClient.patch('http://localhost:3000/set-profilpic', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data
    } catch (error: any) {
        console.error('Request failed:', error.response ? error.response.data : error.message);
    }
};

export const useProfilePicUpload = () => {
    return useMutation({
        mutationFn: ProfilePicUpload,
        onSuccess: (user) => {
            
        },
        onError: (error: any) => {
            console.error('Hiba történt a profilkép feltöltése közben :', error);
        },
        }
    );
}

const getAllUser = async (data: {name: string | null, activated_type: number | null, admin: string | null, token: string}) => {
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
        onSuccess: (response) => {
        },
        onError: (error) => {

        }
    })
}

const setNewClass = async (data: {id: number, osztaly: string, token: string}) => {
    const response = await axiosClient.patch('http://localhost:3000/set-new-class', data, {
        headers:{
            token: data.token
        }
    });
    return response.data
}

export const usesetNewClass = () => {
    return useMutation({
        mutationFn: setNewClass,
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