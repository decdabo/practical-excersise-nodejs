const spinnerModal = document.getElementById('spinner-modal');

export const showSpinner = () => {
  spinnerModal.classList.add('show-modal');
}

export const hideSpinner = () => {
  spinnerModal.classList.remove('show-modal');
}
