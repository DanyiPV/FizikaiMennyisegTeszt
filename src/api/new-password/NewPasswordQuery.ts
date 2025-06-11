import axiosClient from '@/lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'

const forgetPassword = async (data: {email: string}) => {
    const response = await axiosClient.post('/forget-password', data)
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

const setNewPassword = async (data: {password: string}) => {
    const response = await axiosClient.patch('/set-new-password', data)
    return response.data
}

export const useSetNewPassword = (loading: Ref<boolean, boolean>,  SetBtnValue: Ref<string, string>) => {
    const { push } = useRouter()
    return useMutation({
        mutationFn: setNewPassword,
        onMutate: () => {
          loading.value = true
        },
        onSuccess: (response) => {
          loading.value = false
          SetBtnValue.value = 'Új jelszó beállítva';
          push({ name: 'home' })
        },
        onError: (error) => {
          loading.value = false
          SetBtnValue.value = 'Sikertelen';
        }
    })
}