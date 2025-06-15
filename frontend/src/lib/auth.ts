// All authentication logic is now removed. Only export a dummy hook.
export function useAuth() {
  return { user: null, isLoading: false };
}
export function useRequireAuth() {
  return { user: null, isLoading: false, isAuthenticated: true };
}
