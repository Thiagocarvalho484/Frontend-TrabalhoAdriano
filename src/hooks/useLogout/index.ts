import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Logout } from "@/services/auth/Logout"; 

export function useLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você será deslogado do sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar",
    }).then(async (result) => { 

      if (result.isConfirmed) {
        
        const userId = localStorage.getItem('userId'); 
        const refreshToken = localStorage.getItem('refreshToken'); 
        
        if (!userId || !refreshToken) {
            console.error("Dados de logout incompletos, realizando apenas logout local.");
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('refreshToken');
            navigate("/login");
            return;
        }

        const logoutData = { userId, refreshToken };

        try {

          const response = await Logout({ data: logoutData });
          
          Swal.fire('Sucesso!', response.message || 'Logout realizado com sucesso.', 'success');
          
        } catch (error) {

          console.error("Erro ao fazer logout no servidor:", error);
          Swal.fire('Erro!', 'Não foi possível desconectar do servidor. Tentando logout local...', 'error');
        } finally {

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('refreshToken'); 
            navigate("/login");
        }
      }
    });
  };

  return handleLogout;
}