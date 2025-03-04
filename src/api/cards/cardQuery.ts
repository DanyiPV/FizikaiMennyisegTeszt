import axios from "axios";
import { useMutation, useQuery } from '@tanstack/vue-query';
import queryClient from "@/lib/queryClient";
import type { Ref } from "vue";
import axiosClient from "@/lib/axios";


// Fetching Cards
const fetchCards = async (offset: number) => { // Accepts a number, not a Ref
  try {
    const response = await axios.get(`/api/tasks/get-cards-info/${offset}`);
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching cards: ${error}`);
    throw error; // Ensure error propagates correctly
  }
};

export const useCards = (offset: Ref<number>) => {
  return useQuery({
    queryFn: () => fetchCards(offset.value),
    queryKey: ['cards', offset.value],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching card data:', error);
    }
  });
};

// Fetching Completion Rates
const fetchCompletionRates = async () => {
  try {
    const response = await axios.get('/api/task_solution/tasks/task-completion-rates');
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching completion rates: ${error}`);
  }
};

export const useCompletionRates = () => {
  return useQuery({
    queryFn: fetchCompletionRates,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching completion rates:', error);
    }
  });
};

// Fetching Task State
const fetchTaskState = async (id: number) => {
  try {
    const response = await axios.get(`/api/task_solution/taskState/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching task state:', error);
    throw error;
  }
};

export const useTaskState = (id: Ref<number>) => {
  return useQuery({
    queryKey: ['taskState', id],
    queryFn: () => fetchTaskState(id),
    onSuccess: (data) => {
      console.log('Task state fetched successfully:', data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task state:', error);
    }
  });
};



// Fetching Solved Task Rates
const fetchSolvedTaskRates = async (id: Ref<string>) => {
  console.log(id.value)
  try {
    const response = await axios.get(`/api/task_solution/solved-tasks-rate/${id.value}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching solved task rates:', error);
  }
};

export const useSolvedTaskRates = (id: Ref<string>) => {
  console.log(id.value)
  return useQuery({
    queryKey:['userId',id],
    queryFn: ()=> fetchSolvedTaskRates(id),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching solved task rates:', error);
    },
    enabled:false
  });
};

const fetchAllTaskCount = async () => {
  try {
    const response = await axios.get(`/api/tasks/taskCount`);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching all task count:', error);
    throw error;
  }
};

export const useAllTaskCount = () => {
  return useQuery({
    queryKey: ['allTaskCount'], // Make sure this is an array
    queryFn: fetchAllTaskCount,
    onSuccess: (data) => {
      console.log('Fetched task count:', data);
    },
    onError: (error) => {
      console.error('Error fetching task count:', error);
    },
  });
};

// Fetching Random Task
const fetchRandomTask = async () => {
  try {
    const response = await axios.get(`/api/tasks/random-task`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching a random task:', error);
  }
};

export const useRandomTask = () => {
  return useQuery({
    queryFn: fetchRandomTask,
    queryKey:['randomTaskId'],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching a random task:', error);
    },
    enabled: false,
  });
};

const fetchTaskWithSearch = async (characters: Ref<string>) => {
  console.log(characters.value); // This will now print the correct value
  try {
    const response = await axios.get(`/api/tasks/task-with-search/${characters.value}`); // Use characters.value
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching task with these characters:', error);
    throw error;
  }
};


export const useTaskWithSearch = (characters: Ref<string>) => {
  return useQuery({
    queryKey: ['tasks', characters.value], // Correct
    queryFn: () => fetchTaskWithSearch(characters),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task with search characters:', error);
    },
    enabled: false,
  });
};

// Fetching Specific Task by Day
const fetchSpecificTask = async (day: Ref<string>) => {
  console.log(day.value)
  try {
    const response = await axios.get(`/api/daily_tasks/get-daily-task/${day.value}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching specific task:', error);
  }
};

export const useSpecificTask = (day: Ref<string>) => {
    console.log(day.value)
  return useQuery({
    queryFn: () => fetchSpecificTask(day),
    queryKey: ["specificDay",day],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching specific task:', error);
    },
    enabled:false,
  });
};

// Fetching Task by Difficulty
// Function to fetch tasks by difficulty
const fetchTaskByDifficulty = async (difficulty: Ref<string>) => {
  try {
    const response = await axios.get(`/api/tasks/task-with-difficulty/${difficulty.value}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching tasks with this difficulty:', error);
    throw new Error('Failed to fetch tasks');
  }
};

// Hook to use the query for tasks by difficulty
export const useTaskByDifficulty = (difficulty: Ref<string>) => {
  return useQuery({
    queryKey: ['difficulty_level', difficulty.value],
    queryFn: () => fetchTaskByDifficulty(difficulty),
    onSuccess: (data) => {
      console.log("Fetched tasks:", data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task with difficulty:', error);
    },
    enabled: false,  // Disable automatic fetching, refetch manually after setting difficulty
  });
};


// Fetching Task by State and User ID
const fetchTaskByState = async (state:Ref<string>, user_id: Number) => {
  try {
    const response = await axios.get(`/api/task_solution/task-by-completion-state/${state.value}/${user_id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching task by state:', error);
  }
};

export const useTaskByState = (state:Ref<string>, user_id: Number) => {
  return useQuery({
    queryKey:['task_info',state,user_id],
    queryFn: () => fetchTaskByState(state, user_id),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching task by state:', error);
    },
    enabled: false,
  });
};

const fetchCardsByThemes = async (themeIds: Ref<string[]>) => {
  console.log('Selected Theme IDs:', themeIds);
  try {
    const themesPath = themeIds.length > 0 ? themeIds.join(';') : 'all';
    console.log('Themespath',themesPath)
    console.log('Formatted Theme IDs:', themesPath);

    const response = await axios.get(`/api/tasks/filter-task-by-themes/${themesPath}`);
   // console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching tasks by themes:', error);
  }
};

export const useCardsByThemes = (themeIds:  Ref<string[]>) => {
  console.log("Fetching with theme IDs:", themeIds);

  return useQuery({
    queryFn: () => fetchCardsByThemes(themeIds.value),
    queryKey: ['filteredByThemes', themeIds.value.join(';')], 
    onSuccess: (data) => {
      console.log("Filtered tasks received:", data);
    },
    onError: (error) => {
      console.error('Error occurred while fetching cards by themes:', error);
    },
    enabled:false,
  });
};


