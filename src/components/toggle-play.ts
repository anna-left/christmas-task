import { settings } from '../index';

function togglePlay() {
  const myPlayer = document.querySelector('#audio') as HTMLAudioElement;
  if (myPlayer.paused) {
    myPlayer.play();
    settings.music = true;
  } else {
    myPlayer.pause();
    settings.music = false;
  }
  localStorage.setItem('settings', JSON.stringify(settings));
}

export default togglePlay;
