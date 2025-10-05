// src/screens/app/ManagerTask/index.tsx

import { useState, useMemo } from 'react';
import Sidebar from "@/components/ui/CustomSideBar";
import CustomNavBarMobile from "@/components/ui/CustomNavBarMobile";
import Swal from 'sweetalert2'; 
import 'sweetalert2/src/sweetalert2.scss'; 


interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  priority: number;
  dueDate: string;
}

const getPriorityColor = (priority: number): string => {
  switch (priority) {
    case 1:
      return "bg-red-600";
    case 2:
      return "bg-amber-500"; 
    case 3:
      return "bg-sky-500"; 
    default:
      return "bg-gray-400";
  }
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Revisar e aprovar Proposta V.2",
    description: "Verificar todos os dados do cliente.",
    isComplete: false,
    priority: 1,
    dueDate: "2025-10-15",
  },
  {
    id: 2,
    title: "Reunião de alinhamento com a equipe",
    description: "Pauta: Próximos 3 sprints.",
    isComplete: true,
    priority: 3,
    dueDate: "2025-09-30",
  },
];

const PRIMARY_COLOR = "#1C308A"; 
const SECONDARY_COLOR = "#F9A825"; 
const PROGRESS_BAR_BG = "#E5E7EB";

const swalStyles = {
    confirmButton: 'swal2-styled-button-primary',
    cancelButton: 'swal2-styled-button-danger',
    title: 'text-gray-800 font-bold',
    popup: 'shadow-2xl'
};


export default function TasksManager() {
  const [tasks, setTasks] = useState(initialTasks);

  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.isComplete).length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    ));
  };

  const handleDeleteTask = (id: number, title: string) => {
    Swal.fire({
        title: 'Tem certeza?',
        text: `Você realmente deseja excluir a tarefa "${title}"? Esta ação não pode ser desfeita.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: PRIMARY_COLOR, 
        confirmButtonText: 'Sim, Excluir!',
        cancelButtonText: 'Cancelar',
        customClass: swalStyles
    }).then((result) => {
        if (result.isConfirmed) {
            setTasks(tasks.filter(task => task.id !== id));
            Swal.fire('Excluída!', 'A tarefa foi removida com sucesso.', 'success');
        }
    });
  };


  const handleCreateTask = async () => {

    const { value: formValues } = await Swal.fire({
      title: 'Criar Nova Tarefa',
      html: 
        '<input id="swal-input1" class="swal2-input focus:ring-2 focus:ring-blue-500" placeholder="Nome da Tarefa" required>' +
        '<textarea id="swal-input2" class="swal2-textarea focus:ring-2 focus:ring-blue-500" placeholder="Descrição (Opcional)"></textarea>' +
        '<select id="swal-input3" class="swal2-select focus:ring-2 focus:ring-blue-500">' +
          '<option value="1">Prioridade Alta (1)</option>' +
          '<option value="2" selected>Prioridade Média (2)</option>' +
          '<option value="3">Prioridade Baixa (3)</option>' +
        '</select>' +
        '<input type="date" id="swal-input4" class="swal2-input focus:ring-2 focus:ring-blue-500" value="' + new Date().toISOString().substring(0, 10) + '" required>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Criar Tarefa',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: PRIMARY_COLOR, 
      customClass: swalStyles,
      
      preConfirm: () => {
        const title = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const description = (document.getElementById('swal-input2') as HTMLTextAreaElement).value;
        const priority = parseInt((document.getElementById('swal-input3') as HTMLSelectElement).value);
        const dueDate = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!title || !dueDate) {
          Swal.showValidationMessage('O Título e a Data de Vencimento são obrigatórios.');
          return false;
        }

        return { title, description, priority, dueDate };
      }
    });


    if (formValues) {
      const newTask: Task = {
        id: Date.now(),
        title: formValues.title,
        description: formValues.description,
        priority: formValues.priority,
        dueDate: formValues.dueDate,
        isComplete: false,
      };
      setTasks([newTask, ...tasks]);
      Swal.fire('Sucesso!', 'A tarefa foi criada com sucesso!', 'success');
    }
  };
  

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="block lg:hidden w-full">
        <CustomNavBarMobile />
      </div>

      <main className="flex-1 bg-gray-100 p-4 sm:p-6 md:p-10 transition-all duration-300">
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl mb-10 border-t-8 border-t-[#1C308A]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
              Gerenciamento de Tarefas
            </h1>

            <button
              className="text-white px-5 py-2.5 rounded-full shadow-lg transition duration-300 bg-[#1C308A] hover:bg-blue-700 text-base font-semibold transform hover:scale-105"
              onClick={handleCreateTask}
            >
              + Criar Nova Tarefa
            </button>
          </div>

          <p className="text-base text-gray-600 mb-4 font-medium">
            Você completou {progress}% das suas tarefas ({tasks.filter((t) => t.isComplete).length} de {tasks.length}).
          </p>

          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: PROGRESS_BAR_BG }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out shadow-inner"
              style={{
                width: `${progress}%`,
                backgroundColor: PRIMARY_COLOR,
              }}
              role="progressbar"
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3">
            Lista de Tarefas Pendentes e Concluídas
          </h2>

          {tasks.length === 0 ? (
             <p className="text-center text-gray-500 p-8 text-lg font-medium"> 🎉 Nenhuma tarefa por aqui! Crie uma nova para começar. </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex flex-col md:flex-row md:items-center justify-between py-4 transition duration-200 hover:bg-gray-50 rounded-lg px-2 -mx-2"
                >
                  <div className="flex flex-col flex-1 pr-4 mb-3 md:mb-0">
                    
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 text-xs font-bold text-white rounded-full shadow-md ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        P{task.priority}
                      </span>
                      <span
                        className={`text-lg font-semibold ${
                          task.isComplete
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    
                    <div className="mt-1 ml-6 text-sm text-gray-500">
                      {task.description && <span>{task.description}</span>}
                      <span className="ml-3 font-medium text-gray-700">
                        | Vencimento: <strong className="font-semibold">{task.dueDate}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3 items-center flex-shrink-0">
                      <button
                          className={`w-28 py-2 text-sm font-semibold rounded-lg transition duration-200 shadow-md transform hover:scale-105
                          ${
                              task.isComplete
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : `bg-[${SECONDARY_COLOR}] hover:bg-yellow-600 text-gray-900`
                          }`}
                          onClick={() => toggleTask(task.id)}
                      >
                          {task.isComplete ? "Desfazer" : "Concluir"}
                      </button>
                      
                      <button
                          className="p-2 text-sm font-bold rounded-full transition duration-200 shadow-md bg-red-500 hover:bg-red-600 text-white transform hover:scale-105"
                          onClick={() => handleDeleteTask(task.id, task.title)}
                          title="Excluir Tarefa"
                      >
                          <svg 
                              className="h-4 w-4" 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 448 512" 
                              fill="currentColor"
                          >
                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467.4c1.7 30.8 27.6 54.6 58.5 54.6H336.3c30.9 0 56.8-23.8 58.5-54.6L416 128z"/>
                          </svg>
                      </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}