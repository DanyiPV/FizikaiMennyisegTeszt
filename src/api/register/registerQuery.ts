import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { Ref } from 'vue'

const registerUser = async (data: {email: string, user_name: string, password: string, osztaly: string}) => {
  const response = await axiosClient.post('http://localhost:3000/register', data)
  return response.data
}

export const useRegisterUser = (loading: Ref<boolean, boolean>,  RegBtnValue: Ref<string, string>) => {
  return useMutation({
    mutationFn: registerUser,
    onMutate: () => {
      // A mutáció indítása előtt beállítjuk a loading-ot true-ra
      loading.value = true
    },
    onSuccess: (response) => {
      RegBtnValue.value = 'Sikeres regisztrálás!';
      loading.value = false;
    },
    onError: (error) => {
      // Hiba esetén is beállítjuk a loading-ot false-ra
      console.log(error);
      RegBtnValue.value = 'Sikertelen';
      loading.value = false
    }
  })
}

const UserActivation = async (token: object) => { 
  const response = await axiosClient.post('http://localhost:3000/success-register', token)
  return response.data
}

export const useUserActivation = () => {
  return useMutation({
    mutationFn: UserActivation,
    onSuccess: (response) => {
    },
    onError: (error) => {
    }
  })
}
