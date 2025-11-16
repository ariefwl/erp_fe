export function logout() {
  localStorage.removeItem('user');   // hapus data user
  localStorage.removeItem('token');  // kalau ada token
  sessionStorage.clear()                 // optional
}
