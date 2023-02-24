const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
export const width = parseInt(style.width);
export const height = parseInt(style.height);
