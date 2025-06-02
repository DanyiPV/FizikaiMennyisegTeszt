import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'

const getNotifications = async (osztaly: string ) => {
    const response = await axiosClient.get('/get-notifications', {
    params: { osztaly }
    });
    return response.data;
};

export const useGetNotifications = () => {
    return useMutation({
        mutationFn: getNotifications,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}

const shownNotification = async (id: number) => {
    const response = await axiosClient.post(
        '/shown-notification',
        { id }
    );
    return response.data;
};

export const useShownNotification = () => {
    return useMutation({
        mutationFn: shownNotification,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}

const getUnReadNotification = async  (osztaly: string ) => {
    const response = await axiosClient.get(
        '/unread-notification',
        {
            params: { osztaly },
        }
    );
    return response.data;
};

export const useGetUnReadNotification = () => {
    return useMutation({
        mutationFn: getUnReadNotification,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}

const getAllNotification = async  (osztaly: string) => {
    const response = await axiosClient.get(
        '/all-notification',
        {
            params: { osztaly },
        }
    );
    return response.data;
};

export const useGetAllNotification = () => {
    return useMutation({
        mutationFn: getAllNotification,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}

const sendReport = async  (data: {message: string, extra: string}) => {
    const response = await axiosClient.post('/send-report',data);
    return response.data;
};

export const useSendReport = () => {
    return useMutation({
        mutationFn: sendReport,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}

const getReports = async  () => {
    const response = await axiosClient.get('/get-reports');
    return response.data;
};

export const useGetReports = () => {
    return useMutation({
        mutationFn: getReports,
        onSuccess: (response) => {

        },
        onError: (error: any) => {
        },
    });
}