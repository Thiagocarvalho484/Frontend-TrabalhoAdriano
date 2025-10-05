import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function useAlertSuccess() {
  const navigate = useNavigate();

  function alertSuccessRequestPassword() {
    Swal.fire({
      icon: "success",
      title: "Email enviado!",
      text: "Verifique sua caixa de entrada para redefinir sua senha.",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/login");
    });
  }

  function alertSuccessRegister() {
    Swal.fire({
      icon: "success",
      title: "Conta criada com sucesso!",
      text: "Redirecionando para login...",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => navigate("/login"));
  }

  function alertSuccessLogin() {
    Swal.fire({
      icon: "success",
      title: "Login realizado com sucesso! ",
      text: "Redirecionando!",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/dashboard");
    });
  }

  function alertSuccessRecoverPassword() {
    Swal.fire({
      icon: "success",
      title: "Link de recuperação enviado! ",
      text: "Verifique sua caixa de entrada e siga as instruções.",
      showConfirmButton: false,
      timer: 3000, 
    }).then(() => navigate("/login"));
  }

  function useLogout(){
    Swal.fire({
      title: "Tem certeza?",
      text: "Você será deslogado do sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar",
    }).then(() => navigate("/login"));
  }

  function useVerifyEmail (){
    Swal.fire({
      icon: "success",
      title: "E-mail verificado! ",
      text: "Sua conta está ativa. Redirecionando para login...",
      showConfirmButton: false,
      timer: 3000,
    }).then(() => navigate("/login"));
  }


  return { alertSuccessRegister, alertSuccessLogin, alertSuccessRecoverPassword, useLogout, useVerifyEmail, alertSuccessRequestPassword };
}
