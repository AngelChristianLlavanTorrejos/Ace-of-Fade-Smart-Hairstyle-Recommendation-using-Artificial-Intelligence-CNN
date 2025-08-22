export const loadHeaderLayout = async (sessionData) => {
  try {
    const res = await fetch('../partials/header.html');
    const html = await res.text();

    const header = document.querySelector('.js-header-container');

    if (!header) {
      return;
    }

    header.innerHTML = html;

    if (sessionData) {
      populateHeaderData(sessionData);
    }
  }
  catch (error) {
    console.log(error);
  }
}

const populateHeaderData = (sessionData) => {
  const nameElement = document.querySelector('.js-name');
  const roleElement = document.querySelector('.js-role');
  
  if (nameElement && sessionData.name) {
    nameElement.textContent = `${sessionData.name}`;
  }
  
  if (roleElement && sessionData.role) {
    roleElement.textContent = sessionData.role;
  } 
}