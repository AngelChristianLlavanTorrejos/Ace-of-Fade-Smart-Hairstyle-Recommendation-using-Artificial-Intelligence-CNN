export const removeSession = async (key) => {
  const logout = document.querySelector('.js-logout-button');

  logout.addEventListener('click', () => {
    setTimeout(() => {
      localStorage.removeItem(`${key}`)

      location.href = '../html/standalone/login.html';
    }, 2000);
  })
}