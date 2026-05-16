export default function getRedirectPath(role: string | undefined) {
  if (!role) return '/login';
  if (role === 'admin') return '/admin';
  if (role === 'user') return '/dashboard';
  return '/dashboard';
}
