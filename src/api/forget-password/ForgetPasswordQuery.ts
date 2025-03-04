import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { ForgetPasswordData } from './ForgetPassword'
import type { Ref } from 'vue'

const forgetPassword = async (data: ForgetPasswordData) => {
  const response = await axiosClient.post('http://localhost:3000/forget-password', data)
  return response.data
}

export const useForgetPassword = (loading: Ref<boolean, boolean>,  ForgetBtnValue: Ref<string, string>) => {
  return useMutation({
    mutationFn: forgetPassword,
    onMutate: () => {
      // A mutáció indítása előtt beállítjuk a loading-ot true-ra
      loading.value = true
    },
    onSuccess: (response) => {
      // A művelet sikeres befejezéséig, beállítjuk a loading-ot false-ra
      loading.value = false
      ForgetBtnValue.value = 'Email elküldve';
    },
    onError: (error) => {
      // Hiba esetén is beállítjuk a loading-ot false-ra
      loading.value = false
      ForgetBtnValue.value = 'Sikertelen';
    }
  })
}
