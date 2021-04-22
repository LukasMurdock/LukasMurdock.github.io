const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.onresize = resize;

function resize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// function isMobileDevice() {
//   return (
//     typeof window.orientation !== 'undefined' ||
//     navigator.userAgent.indexOf('IEMobile') !== -1
//   );
// }

if (
  typeof window.orientation !== 'undefined' ||
  navigator.userAgent.indexOf('IEMobile') !== -1
) {
  document.getElementById('computer-img').src = './images/cat-gloves-1200.jpg';
  document.getElementById('computer-text').innerText =
    'I’m glad you’ve chosen to read this on a mobile device. Now, before we mobilize…';
  console.log('mobile');
}

function getCurrentWeather() {
  const lat = '39.50';
  const lon = '-84.73';
  const exclude = '';
  const apiKey = '860ba316b7fd68398c9cab2388b6bbb9';
  // https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}

  console.log(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  // fetch(
  //   `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
}

// console.log(isMobileDevice());
