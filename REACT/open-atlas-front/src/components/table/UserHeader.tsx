import type { UserHeaderType } from '@src/types/user/UserHeader.type';

export const UserHeader: React.FC<UserHeaderType> = ({ 
  user, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-48"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Usuario no encontrado</h1>
        <p className="text-gray-600 mt-2">No se pudo cargar la información del usuario</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Bienvenido, {user.name} 👋
      </h1>
      <div className="mt-1 text-sm text-gray-500">
        Email: {user.email}
      </div>
    </div>
  );
};