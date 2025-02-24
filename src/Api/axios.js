import apiClient from ".";
import toast, { Toaster } from "react-hot-toast";

export const getReq = async (path) => {
  try {
    const responce = await apiClient.get(path);
    toast.success(responce?.data?.message)
    
    return responce;
  } 
  catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message);
      console.log(error)
      return error.response.data?.message;
    } else {
      toast.error(error?.message);
      console.log(error.message)
      return error.message;
    }
  }
};

export const postReq = async (path, data) => {
  try {
    const response = await apiClient.post(path, data);
    toast.success(response?.data?.message);

    return response;
  } 
  catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message);
      return error.response.data?.message;
    } else {
      toast.error(error?.message);
      return error.message;
    }
  }
};

export const deleteReq = async (path) => {
  try {
    const responce = await apiClient.delete(path);
    return responce;
  } catch (error) {
    console.log(error);
  }
};
