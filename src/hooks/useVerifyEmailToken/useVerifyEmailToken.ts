import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEmailToken } from '@/services/auth/verifyEmailToken'; 
import Swal from 'sweetalert2';
import { isAxiosError } from 'axios';

type VerificationStatus = 'loading' | 'success' | 'error';

export function useVerifyEmail() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('Verificando seu e-mail...');

  const startVerification = async (token: string) => {
    setStatus('loading');
    setMessage('Verificando token...');

    try {
      const response = await verifyEmailToken({ data: { token } });

      console.log('Verificação de e-mail bem-sucedida:', response.message);
      setMessage('E-mail verificado com sucesso! Redirecionando para login...');
      setStatus('success');

      Swal.fire({
        icon: "success",
        title: "E-mail verificado! ",
        text: "Sua conta está ativa. Redirecionando para login...",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => navigate("/login"));

    } catch (error) {
      let errorMessage = 'Falha na verificação. O token pode ser inválido ou ter expirado.';
      
      if (isAxiosError(error) && error.response) {
        const responseData = error.response.data as { message?: string };
        errorMessage = responseData.message || errorMessage;
      }
      
      console.error('Erro na verificação:', errorMessage);
      setMessage(errorMessage);
      setStatus('error');

      Swal.fire({
        icon: 'error',
        title: 'Verificação Falhou',
        text: errorMessage,
      }).then(() => navigate("/login")); 
    }
  };

  return {
    status,
    message,
    startVerification,
  };
}