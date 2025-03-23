import axiosInstance from '../utils/axiosInstance.js';

export const getRouteByStudentSolution = async(locations) =>{
    const response = await axiosInstance.post('/problems/studentSolutionTravelProblem', locations)
    return response.data
}

export const getRouteByCommunitySolution = async(locations) =>{
    const response = await axiosInstance.post('/problems/comunitySolutionTravelProblem', locations)
    return response.data
}
