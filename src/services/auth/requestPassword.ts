import api from '../api';

export type requestPasswordData = {
    email: string
}

interface requestPasswordProps {
    data: requestPasswordData
}

interface requestPasswordReturn {
    message: string
}

export const requestPassword = async ({data: requestPasswordData}: requestPasswordProps): Promise<requestPasswordReturn> => {
    const { data } = await api.post('/auth/requestPassword', {...requestPasswordData});

    return data;
} 
