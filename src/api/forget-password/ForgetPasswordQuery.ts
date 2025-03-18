import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { Ref } from 'vue'

const forgetPassword = async (email: string) => {
  const response = await axiosClient.post('http://localhost:3000/forget-password', email)
  return response.data
}

export const useForgetPassword = (loading: Ref<boolean, boolean>,  ForgetBtnValue: Ref<string, string>) => {
  return useMutation({
    mutationFn: forgetPassword,
    onMutate: () => {
      loading.value = true
    },
    onSuccess: (response) => {
      loading.value = false
      ForgetBtnValue.value = 'Email elküldve';
    },
    onError: (error) => {
      loading.value = false
      ForgetBtnValue.value = 'Sikertelen';
    }
  })
}
