import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { LoginData } from './login'

const loginUser = async (data: LoginData) => {
  const response = await axiosClient.post('http://localhost:3000/login', data); 
  return response.data; // Sikeres válasz
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess(user) {
      
    },
    onError: (error: any) => {
      
    },
  })
}
