const water = document.querySelectorAll('.water');
const tako = document.querySelectorAll('.tako');
const scoreboard = document.querySelector('.scoreboard');
const bonk = document.querySelector('#bonk');
const bgm = document.querySelector('#bgm');
const state = document.querySelector("#state");

let waterBefore;
let done;
let score;

function randomWater(water) {
  const t = Math.floor(Math.random() * water.length);
  const tRandom = water[t];
  if (tRandom == waterBefore) {
    randomWater(water);
  }
  waterBefore = tRandom;
  return tRandom;
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function surface() {
  const tRandom = randomWater(water);
  const wRandom = randomTime(300, 1000);
  tRandom.classList.add('appear');

  setTimeout(() => {
    tRandom.classList.remove('appear');
    if (!done) {
      surface();
    }
  }, wRandom);
}

function start() {
  done = false;
  score = 0;
  scoreboard.textContent = 0;
  bgm.play();
  state.textContent = "Go";
  surface();
  setTimeout(() => {
    done = true;
    bgm.pause();
    state.textContent = "Done";
  }, 10000);
}

function timer() {
  score++;
  this.parentNode.classList.remove('appear');
  bonk.play();
  scoreboard.textContent = score;
}

tako.forEach(t => {
  t.addEventListener('click', timer);
});