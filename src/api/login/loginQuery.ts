import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'

const loginUser = async (data: {email: string, password: string, rememberMe: boolean}) => {
  const response = await axiosClient.post('http://localhost:3000/login', data); 
  return response.data;
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
