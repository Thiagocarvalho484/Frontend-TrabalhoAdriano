import api from "../api";

type LogoutData = {
    userId: string,
    refreshToken: string
};

interface LogoutProps {
    data: LogoutData
}

interface LogoutReturn {
    message: string 
}

export const Logout = async ({data: LogoutData}: LogoutProps): Promise<LogoutReturn> =>{
    const {data} = await  api.post('/auth/logout', {...LogoutData});

    return data;
}