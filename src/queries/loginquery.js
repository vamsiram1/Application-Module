import axiosInstance from "../axiosInstance";

const LOGIN_URL = "/sc/emp"

const AUTH_URL ="/api/common/auth/token"

const loginDto = (values) =>({
    email: values.emailId,
    password: values.password,
});


const loginSubmit = async(formValues) =>{
    const response = await axiosInstance.post(`${LOGIN_URL}/login`, loginDto(formValues));
    return response.data;
}


const getScreenPermissions = async()=>{
    const response = await axiosInstance.get(`${AUTH_URL}`);
    return response.data;
}

const getScreenPermissions2 = async(accessToken, tokenType= "Bearer")=>{
    const response = await axiosInstance.get(`${AUTH_URL}`,{
        headers:{Authorization: `${tokenType} ${accessToken}`}
    })

    return response.data;
}

export  {loginSubmit, getScreenPermissions, getScreenPermissions2};