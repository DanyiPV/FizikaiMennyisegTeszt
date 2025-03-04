import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import type { ProfilPicdata } from "./profile"

const ProfileGetUser = async (data: { token: string | null; id: number }): Promise<any> => {
    try {
        const response = await axiosClient.get('http://localhost:3000/profile', {
        headers: {
            token: data.token,
            id: data.id,
        },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error; // Ha hiba van, továbbítjuk, hogy a hívó kezelhesse
    }
};

export const useProfileGetUser = () => {
    return useMutation({
        mutationFn: ProfileGetUser,
        onSuccess: (user) => {

        },
        onError: (error: any) => {
            console.error('Hiba történt a felhasználó lekérésekor:', error);
        },
        }
    );
}

const ProfilePicUpload = async (data: ProfilPicdata) => {
    const formData = new FormData();
    formData.append('blob', data.pic);  // A fájl blob néven
    formData.append('id', data.id.toString());  // ID
    formData.append('type', data.type.toString());  // type

    try {
        const response = await axiosClient.patch('http://localhost:3000/profile', formData, {
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


const ProfileDarkMode = async (data: Object) => {
    try {
        const response = await axiosClient.patch('http://localhost:3000/profile', data);
    } catch (error: any) {
        console.error('Request failed:', error.response ? error.response.data : error.message);
    }
};

export const useProfileDarkmodeSwitch = () => {
    return useMutation({
        mutationFn: ProfileDarkMode,
        onSuccess: (user) => {

        },
        onError: (error: any) => {
            console.error('Hiba történt a darkmode feltöltése közben :', error);
        },
        }
    );
}