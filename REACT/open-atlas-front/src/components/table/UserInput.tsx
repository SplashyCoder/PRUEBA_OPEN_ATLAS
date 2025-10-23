import type { userInputType } from "@src/types/user/UserInput.type";

export const UserInput: React.FC<userInputType> = ({ 
  userId, 
  onUserIdChange, 
  disabled = false 
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Solo permitir números
    if (value === '' || /^\d+$/.test(value)) {
      const numericValue = value === '' ? 1 : parseInt(value, 10);
      onUserIdChange(numericValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevenir caracteres no numéricos
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="userId" className="text-sm font-medium text-gray-700">
        ID de Usuario:
      </label>
      <input
        id="userId"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={userId === 1 ? '' : userId.toString()} // Mostrar vacío para el valor por defecto 1
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        placeholder="1 (por defecto)"
        className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
      />
      {userId === 1 && (
        <span className="text-sm text-gray-500">(Cargando usuario por defecto)</span>
      )}
    </div>
  );
};