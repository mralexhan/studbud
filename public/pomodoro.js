//import "./components/navmenu";

/*javascript for the nav bar to be able to activate. Code from https://codepen.io/robdongas/pen/MWvKMRp*/
const toggler = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

/*
 * Toggles on and off the 'active' class on the menu
 * and the toggler button.
 */
toggler.addEventListener('click', () => {
  toggler.classList.toggle('active');
  menu.classList.toggle('active');
})