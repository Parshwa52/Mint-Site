export function fadeInAudio(audio: HTMLAudioElement) {
  audio.volume = 0;
  audio.play();

  const interval = setInterval(() => {
    if (audio.volume < 1) audio.volume = audio.volume + 0.1;
    else {
      clearInterval(interval);
    }
  }, 80);
}

export function fadeOutAudio(audio: HTMLAudioElement) {
  audio.volume = 1;

  const interval = setInterval(() => {
    if (audio.volume >= 0.1) audio.volume = audio.volume - 0.1;
    else {
      audio.pause();
      clearInterval(interval);
    }
  }, 100);
}
