import { hideSpinner, showSpinner } from './helpers/spinner';

import Services from './services/Services';
import showNotification from './helpers/notification';
import showClipboard from './helpers/clipboard';
import './syles/styles.css';

const indexGameForm = document.getElementById('index-start-game-form');
const createGameForm = document.getElementById('create-game-form');
const startGameForm = document.getElementById('start-game-form');
const clipboardButton = document.getElementById('clipboard-button');
const clipboardInput = document.getElementById('clipboard-input');

if (indexGameForm) {
  localStorage.removeItem('idGame');
  indexGameForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const services = new Services()
    showSpinner();
    
    try {
      const data = await services.getGameInfo(indexGameForm['index-input'].value);
      if (data.error) {
        hideSpinner();
  
        return showNotification(data.message);
      } 
      
      window.localStorage.setItem('idGame', indexGameForm['index-input'].value);
      hideSpinner();
      window.history.pushState({}, '', '/startGame.html');
      
      return location.reload();
    } catch (error) {
      console.log(error);
      showNotification(error.message);
    }
  });
}

if (createGameForm) {
  createGameForm.addEventListener('submit', async(e) => {
    const services = new Services();
    e.preventDefault();
    showSpinner();
    
    try {
      const data = await services.createGame({
        player_1: createGameForm['player_1'].value,
        player_2: createGameForm['player_2'].value,
        player_3: createGameForm['player_3'].value
      });
  
      hideSpinner();
      if (data.message) return showNotification(data.message);

      localStorage.setItem('idGame', data._id);
      return showClipboard(data._id);
    } catch (error) {
      hideSpinner();
      showNotification(error.message);
    }
  });
}

if (startGameForm) {
  const id = localStorage.getItem('idGame');
  startGameForm.addEventListener('submit', async(e) => {
    const services = new Services();
    
    e.preventDefault();
    showSpinner();

    try {
      const data = services.makeBet(id, {
        player_1: startGameForm['player_1'].value,
        player_2: startGameForm['player_2'].value,
        player_3: startGameForm['player_3'].value
      });
      
      if (data.error) {
        hideSpinner();
  
        return showNotification(data.error.message);
      }
      window.history.pushState({}, '', `/winner/${id}`);
  
      return location.reload();
    } catch (error) {
      console.log(error.message);
      showNotification('Error with backend');
    }
  });
}

if (clipboardButton) {
  clipboardButton.addEventListener('click', () => {
    navigator.clipboard.writeText(clipboardInput.value);
    alert(`Code copy: ${clipboardInput.value}`);
  });
}
