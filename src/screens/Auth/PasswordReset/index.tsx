import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MailOpen } from "lucide-react";
import { useAlertSuccess } from "@/hooks/useSuccess";


export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const { alertSuccessRequestPassword } = useAlertSuccess()
  const [errors, setErrors] = useState<{ email?: string }>({});
  const navigate = useNavigate();

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({})

    alertSuccessRequestPassword()
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm border-none shadow-none bg-gray-100">
          <CardHeader className="flex flex-col items-center">
            <img src="/OrganizationTechLogo.png" alt="OrganizationTech Logo" />
            <h2 className="mt-4 text-lg text-center font-semibold">
              Enviaremos um e-mail para recuperar sua senha
            </h2>
          </CardHeader>

          <form onSubmit={handleRecover}>
            <CardContent className="space-y-3">
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <MailOpen size={18} />
                  </span>
                  <Input
                    type="email"
                    placeholder="Insira seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 h-12 text-base ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <span
                  className={`text-red-500 text-sm mt-1 transition-all duration-300 ease-in-out transform ${
                    errors.email
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  {errors.email || "Campo oculto"}
                </span>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg bg-teal-500 hover:bg-teal-600 text-white"
              >
                Enviar
              </Button>

              <div className="flex justify-center">
                <a
                  onClick={() => navigate("/login")}
                  className="text-sm text-teal-500 hover:text-teal-700 font-medium cursor-pointer"
                >
                  Voltar ao login
                </a>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>

      <div
        className="w-full bg-gradient-to-b hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,48,115,0.772), #2563eb)",
        }}
      />
    </div>
  );
}
