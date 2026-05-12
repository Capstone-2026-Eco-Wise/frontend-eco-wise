export default function getRedirectPath(role: string) {
  if (role === "admin") return "/admin";
  if (role === "user") return "/dashboard";
  return "/dashboard";
}