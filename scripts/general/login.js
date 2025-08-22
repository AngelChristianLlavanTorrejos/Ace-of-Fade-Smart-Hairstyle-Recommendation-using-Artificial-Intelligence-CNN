export const checkSession = async (session) => {
  if (session.length === 0 || session.role !== 'Client') {
    location.href = "../../html/standalone/login.html";
  }
}