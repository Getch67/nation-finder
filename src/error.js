export function showError(container, message) {
  container.innerHTML = `<div class="text-2xl xl:text-4xl absolute">${message}</div>`;
}
