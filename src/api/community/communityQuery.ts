import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import type { CommunityData, CommunityEditData } from './community'
import type { Ref } from 'vue'

const CommunityPostUpload = async (data: CommunityData) => {
  const formData = new FormData();
  formData.append('id', data.id.toString());
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('chips', JSON.stringify(data.chips));
   // Ha a files objektum tényleges fájlokat tartalmaz, először Blob vagy File típusra kell alakítani
  Object.keys(data.files).forEach(key => {
    const file = data.files[key];

    // Ellenőrizd, hogy a fájl Blob típusú-e, vagy szükséges-e átalakítani
    if (file instanceof File || file instanceof Blob) {
      formData.append('files', file); // Hozzáadjuk a fájlt a FormData-hoz
    }
  });

  const response = await axiosClient.post('http://localhost:3000/community', formData,{
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export const useCommunityPost = (loading: Ref<boolean, boolean>) => {
  return useMutation({
    mutationFn: CommunityPostUpload,
    onMutate: () => {
      loading.value = true
    },
    onSuccess(response) {
      loading.value = false;
    },
    onError: (error: any) => {
      loading.value = false;
    },
  })
}

const CommunityEditPostUpload = async (data: CommunityEditData) => {
  const formData = new FormData();
  formData.append('id', data.id.toString());
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('none_files', JSON.stringify(data.none_files));
  formData.append('new_Chips', JSON.stringify(data.new_Chips));
  formData.append('none_Chips', JSON.stringify(data.none_Chips));
   // Ha a files objektum tényleges fájlokat tartalmaz, először Blob vagy File típusra kell alakítani
  Object.keys(data.files).forEach(key => {
    const file = data.files[key];

    // Ellenőrizd, hogy a fájl Blob típusú-e, vagy szükséges-e átalakítani
    if (file instanceof File || file instanceof Blob) {
      formData.append('files', file); // Hozzáadjuk a fájlt a FormData-hoz
    }
  });

  const response = await axiosClient.patch('http://localhost:3000/community/post-edit', formData,{
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export const useCommunityEditPost = () => {
  return useMutation({  
    mutationFn: CommunityEditPostUpload,
    onMutate: () => {

    },
    onSuccess(response) {

    },
    onError: (error: any) => {

    },
  })
}

const CommunityGetLimitedPosts = async (data: {limit: number, offset: number , id: number | null, filter: Array<Array<string>> | null, tagsArray: Array<number> | null, search: string | null}) => {
  const response = await axiosClient.get('http://localhost:3000/community', {
    params: data,
  });

  return response.data;
}

export const useGetCommunityPost = () => {
  return useMutation({
    mutationFn: CommunityGetLimitedPosts,
    onSuccess(response) {
      
    },
    onError: (error: any) => {
      
    },
  })
}

const CommunityGetLimitedComments = async (data: {limit: number, offset: number , id: number, type: number, userId: number | null}) => {
  const response = await axiosClient.get('http://localhost:3000/community/get-comments', {
    params: data,
  });

  return response.data;
}

export const useGetCommunityComments = () => {
  return useMutation({
    mutationFn: CommunityGetLimitedComments,
    onSuccess(response) {
      
    },
    onError: (error: any) => {
      
    },
  })
}

const CommunityLikeDislikeForPost = async (data: {post_id: number, user_id: number, upload_type: string, type: number}) => {
  const response = await axiosClient.post(`http://localhost:3000/community/post-like`, data);
  return response.data;
}

export const useLikeDislikeForPost = () => {
  return useMutation({
    mutationFn: CommunityLikeDislikeForPost,
    onSuccess(response) {
      
    },
    onError: (error: any) => {
      
    },
  })
}

const CommunityCommentForPost = async (data: {content: string, linkAuthor: string | null, linked_id: number, user_id: number, type: number}) => {
  const response = await axiosClient.post(`http://localhost:3000/community/post-comment`, data);
  return response.data;
}

export const useCommentForPost = () => {
  return useMutation({
    mutationFn: CommunityCommentForPost,
    onSuccess(response) {
      
    },
    onError: (error: any) => {
      
    },
  })
}

const CommunityCommentEdit = async (data: {content: string, comment_id: number}) => {
  console.log(data);
  const response = await axiosClient.patch(`http://localhost:3000/community/comment-edit`, data);
  return response.data;
}

export const useCommentEdit = () => {
  return useMutation({
    mutationFn: CommunityCommentEdit,
    onSuccess(response) {
      
    },
    onError: (error: any) => {
      
    },
  })
}

const CommunityTags = async () => {
  const response = await axiosClient.get(`http://localhost:3000/community/tags`);
  return response.data;
}

export const useCommunityTags = () => {
  return useMutation({
    mutationFn: CommunityTags,
    onSuccess(response) {
      
    },
    onError: (error: any) => {
      
    },
  })
}

const CommunityReports = async (data: {type: boolean, notif_content: string, content_type: boolean, user_id: number, from_user_id: number, content_id: number}) => {
  const response = await axiosClient.post(`http://localhost:3000/community/reports`, data);
  return response.data;
}

export const useSendReports = () => {
  return useMutation({
    mutationFn: CommunityReports,
    onSuccess(response) {
      
    },
    onError: (error: any) => {
      
    },
  })
}