import Services from "../services/Services";
import { hideSpinner, showSpinner } from "./spinner";

const first_player = document.getElementById('first-player');
const second_player = document.getElementById('second-player');
const third_player = document.getElementById('third-player');

const services = new Services();

const comproveId = async(id) => {
  showSpinner();

  if (!id) return window.history.back();

  try {
    
    const strong_first = document.createElement('strong');
    const strong_second = document.createElement('strong');
    const strong_third = document.createElement('strong');
  
    const data = await services.getGameInfo(id);

    strong_first.innerHTML = data.player_1;
    strong_second.innerHTML = data.player_2;
    strong_third.innerHTML = data.player_3;

    first_player.appendChild(strong_first);
    second_player.appendChild(strong_second);
    third_player.appendChild(strong_third);

    return hideSpinner();
  } catch (error) {

    return window.history.back();
  }
}

export default comproveId;
