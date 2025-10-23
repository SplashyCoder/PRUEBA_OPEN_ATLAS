export type userInputType = {
  userId?: number;
  onUserIdChange: (userId: number) => void;
  onSearch: () => void;
  loading?: boolean;
  disabled?: boolean;
}
