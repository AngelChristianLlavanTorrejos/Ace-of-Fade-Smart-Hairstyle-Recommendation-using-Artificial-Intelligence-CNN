export const checkSession = async (session) => {
  if (session.length === 0 || session.role !== 'Administrator') {
    location.href = "../../html/standalone/login.html";
  }
}