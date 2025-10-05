import { useState } from 'react';
import { requestPassword, type requestPasswordData } from '@/services/auth/requestPassword';
import { useAlertSuccess } from '@/hooks/useSuccess/index'; 
import Swal from 'sweetalert2'; 
import {  isAxiosError } from 'axios'; 


export function useRequestPasswordForm() {
  const { alertSuccessRecoverPassword } = useAlertSuccess(); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: requestPasswordData) => {
    setIsLoading(true);

    try {
      const response = await requestPassword({ data: formData });
      
      console.log("Solicitação de recuperação de senha bem-sucedida:", response.message);
      
      alertSuccessRecoverPassword(); 

    } catch (error) {
      let errorMessage = 'Ocorreu um erro ao processar a solicitação. Tente novamente.';
      
      if (isAxiosError(error) && error.response) {
          const responseData = error.response.data as { message?: string };
          
          errorMessage = responseData.message || errorMessage;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Falha na Solicitação',
        text: errorMessage,
      });

    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading
  };
}