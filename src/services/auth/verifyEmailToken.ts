import api from '../api';

export type verifyEmailTokenData = {
    token: string
} 

interface verifyEmailTokenProps {
    data: verifyEmailTokenData
}

interface verifyEmailTokenReturn{
    message: string
}

export const verifyEmailToken = async ({data: verifyEmailTokenData}: verifyEmailTokenProps): Promise<verifyEmailTokenReturn> => {
    const { data } = await api.post('/auth/verifyEmailToken', {...verifyEmailTokenData});

    return data;
}

