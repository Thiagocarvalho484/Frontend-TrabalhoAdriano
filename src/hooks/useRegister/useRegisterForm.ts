import { useState } from 'react';
import { register, type RegisterData } from '@/services/auth/register'; 
import { useAlertSuccess } from '@/hooks/useSuccess/index'; 
import Swal from 'sweetalert2'; 
import {  isAxiosError } from 'axios'; 


export function useRegisterForm() {
  const { alertSuccessRegister } = useAlertSuccess();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: RegisterData) => {
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Erro de validação',
        text: 'A senha e a confirmação de senha não coincidem.',
      });
      setIsLoading(false);
      return;
    }

    const apiData: RegisterData = formData; 

    try {
      const response = await register({ data: apiData });
      
      console.log("Usuário registrado com sucesso:", response.user);
      
      alertSuccessRegister();

    } catch (error) {
      let errorMessage = 'Ocorreu um erro desconhecido durante o registro.';
      
      if (isAxiosError(error) && error.response) {
          const responseData = error.response.data as { message?: string };
          
          errorMessage = responseData.message || errorMessage;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Falha no Registro',
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