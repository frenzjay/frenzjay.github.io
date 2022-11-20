var audio = new Audio('http://frenzjay.github.io/audio/Kinikilig.mp3');
var btn = document.createElement('button');
btn.innerHTML = 'YES';
btn.onclick = function() {
  audio.play();
  var iloveu = document.createElement('div');
  iloveu.innerHTML = 'iloveu';
  document.body.appendChild(iloveu);
  var bg = document.getElementsByTagName('body')[0];
  var colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'black', 'white'];
  var rand = Math.floor(Math.random() * colors.length);
  bg.style.backgroundColor = colors[rand];
  setInterval(function() {
    var rand = Math.floor(Math.random() * colors.length);
    bg.style.backgroundColor = colors[rand];
  }, 200);
};
document.body.appendChild(btn);
var btn2 = document.createElement('button');
btn2.innerHTML = 'NO';
btn2.onclick = function() {
  var x = Math.floor(Math.random() * window.innerWidth);
  var y = Math.floor(Math.random() * window.innerHeight);
  btn2.style.position = 'absolute';
  btn2.style.left = x + 'px';
  btn2.style.top = y + 'px';
};
document.body.appendChild(btn2);
