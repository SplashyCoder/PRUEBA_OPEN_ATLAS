import type { userInputType } from '@src/types/user/UserInput.type';

export const UserInput: React.FC<userInputType> = ({ 
  onUserIdChange, 
  onSearch,
  loading = false, 
  disabled = false 
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '' || /^\d+$/.test(value)) {
      const numericValue = value === '' ? 1 : parseInt(value, 10);
      onUserIdChange(numericValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
      return;
    }
    
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handleSearchClick = () => {
    onSearch();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="userId" className="text-sm font-medium text-gray-700 whitespace-nowrap">
          ID de Usuario:
        </label>
        <input
          id="userId"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          // value={userId === 1 ? '' : userId.toString()}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={disabled || loading}
          // placeholder="1"
          className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>
      
      <button
        onClick={handleSearchClick}
        disabled={loading || disabled}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center min-w-24"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Buscando...
          </>
        ) : (
          'Buscar Usuario'
        )}
      </button>
    </div>
  );
};