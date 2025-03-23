import axiosInstance from '../utils/axiosInstance.js';

export const getKnapsackByStudentSolution = async(items, pesoMax) =>{
    const response = await axiosInstance.post('/problems/studentKnapsackSolution', {items, pesoMax})
    return response.data.resultado
}

export const getKnapsackByCommunitySolution = async(items, pesoMax) =>{
    const response = await axiosInstance.post('/problems/comunityKnapsackSolution', {items, pesoMax})
    return response.data.resultado
}
