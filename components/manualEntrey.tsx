import { useState } from "react";


//@ts-expect-error
const ManualEntry = ({ onManualEntry }) => {
  const [studentId, setStudentId] = useState(""); // Estado para armazenar o ID digitado
  const [error, setError] = useState(""); // Mensagem de erro, caso o ID não seja válido

  const handleSubmit = () => {
    if (!studentId.trim()) {
      setError("O ID do aluno não pode estar vazio.");
      return;
    }
    // Chama a função de callback que foi passada por props para registrar a entrada
    onManualEntry(studentId);
    setStudentId(""); // Limpa o campo de texto após o envio
    setError(""); // Limpa a mensagem de erro
  };

  return (
    <div className="my-4 p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Registrar Entrada Manualmente</h2>
      <div>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Digite o ID do aluno"
        />
        <button
          onClick={handleSubmit}
          className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Registrar Entrada
        </button>
      </div>
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
};

export default ManualEntry;
