export const loadHeaderLayout = async () => {
  try {
    const res = await fetch('../partials/header.html');
    const html = await res.text();

    const header = document.querySelector('.js-header-container');

    if (!header) {
      return;
    }

    header.innerHTML = html;
  }
  catch (error) {
    console.log(error);
  }
}