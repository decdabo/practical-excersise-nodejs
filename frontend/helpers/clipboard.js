const clipboard = document.getElementById('clipboard-modal')
const clipboardInput = document.getElementById('clipboard-input');

const showClipboard = (id) => {
  clipboardInput.value = id;
  clipboard.classList.add('show-modal');
}

export default showClipboard;
