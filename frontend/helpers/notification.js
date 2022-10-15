const notification = document.getElementById('notification');

const showNotification = (msg) => {
  notification.classList.add('show-notification');
 
  const p = document.createElement('p');
  p.innerHTML = msg;

  notification.appendChild(p);
  
  setTimeout(() => {
    notification.classList.remove('show-notification');
    notification.removeChild(p);
  }, 2000);
}

export default showNotification;
