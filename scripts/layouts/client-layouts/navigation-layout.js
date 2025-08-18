export const loadNavLayout = async () => {
  try {
    const res = await fetch('../partials/client-partials/navigation.html');
    const html = await res.text();

    const nav = document.querySelector('.js-nav-container');

    if (!nav) {
      return;
    }

    nav.innerHTML = html;
  }
  catch (error) {
    console.log(error);
  }
}