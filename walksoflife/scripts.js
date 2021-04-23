const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.onresize = resize;

function resize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function chapter(chapter) {
  document.getElementById(chapter).scrollIntoView();
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
  const exclude = 'daily,hourly,minutely';
  const apiKey = '860ba316b7fd68398c9cab2388b6bbb9';
  // https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}

  console.log(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const weather = data;
      // weather.current.weather[0].main
      // weather.current.weather[0].description
      const fahrenheit = Math.round(
        (weather.current.temp - 273.15) * (9 / 5) + 32
      );
      console.log(fahrenheit);
      const date = new Date(weather.current.sunset * 1000);
      const timeTilSunset = new Date().getHours() - date.getHours();
      console.log(timeTilSunset);
      const iconUrl =
        'http://openweathermap.org/img/w/' +
        weather.current.weather[0].icon +
        '.png';

      document.getElementById('weather-icon').setAttribute('src', iconUrl);
      document.getElementById('fahrenheit').innerText = fahrenheit + '°';
      document.getElementById('weather-main').innerText =
        weather.current.weather[0].main + ': ';
      document.getElementById('weather-description').innerText =
        weather.current.weather[0].description;

      if (timeTilSunset < 0) {
        document.getElementById('timeTilSunset').innerHTML =
          'You have ' + timeTilSunset + ' hours until sunset.';
      } else {
        document.getElementById('timeTilSunset').innerHTML =
          'Darn. We’re already ' + timeTilSunset + ' hours past sunset.';
      }
    });
}
getCurrentWeather();

// console.log(isMobileDevice());

// function speak(message, button, lang) {
//   // chop up long message because android can't handle it
//   message = message + ' [|].';
//   m = message.match(/.{1,3000}\./g);
//   for (let chunk of m) {
//     const msg = new SpeechSynthesisUtterance(chunk.replace(' [|].', ''));
//     window.speechSynthesis.speak(msg, { lang: lang });
//   }

//   document.getElementById('speakbutton'+button).setAttribute('onClick', 'stopSpeaking('+button+')');
//   document.getElementById('speakbutton'+button).innerHTML='<img src=SpeakStopIcon.png title=\'Click to stop speech.\'>';
// }

// function stopSpeaking(button) {
//   window.speechSynthesis.cancel();
//   document
//     .getElementById('speakbutton' + button)
//     .setAttribute(
//       'onClick',
//       "speak(document.getElementById('inscription" +
//         button +
//         "').innerHTML," +
//         button +
//         ');'
//     );
//   document.getElementById('speakbutton' + button).innerHTML =
//     "<img src=SpeakIcon.png title='Click to hear the inscription.'>";
// }

function speak(message, button, lang) {
  const msg = new SpeechSynthesisUtterance(message);
  window.speechSynthesis.speak(msg);

  document
    .getElementById(`${button}-button`)
    .setAttribute('onClick', 'stopSpeaking("' + button + '")');
  document.getElementById(`${button}-button`).innerHTML =
    'Click to stop listening.<svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" /></svg>';
}

// speak(document.getElementById(freedom-button'-inscription').innerHTML,'freedom-button-button','en')

function stopSpeaking(button) {
  window.speechSynthesis.cancel();
  document
    .getElementById(`${button}-button`)
    .setAttribute(
      'onClick',
      'speak(document.getElementById("' +
        button +
        '-inscription").innerHTML,"' +
        button +
        '","en")'
    );
  document.getElementById(`${button}-button`).innerHTML =
    'Click to listen.<svg style="width: 16px; height: 16px" viewBox="0 0 24 24"><path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/></svg>';
}
