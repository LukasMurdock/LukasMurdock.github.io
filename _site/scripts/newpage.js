var things = null;
console.log(things);
document.addEventListener('DOMContentLoaded', init);



const colors = ['#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#47B275', '#FFC043', '#F25138', '#99644C', '#FF7D49', '#7356BF', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000'];
let data = null;

function init() {
        data = things;
        setThing();
        setupEvents();
    }



function setupEvents() {
    document.addEventListener('mouseover', (e) => {
        if (e.target.id == 'moreBtn') {
            document.querySelector('.thing-title').style.opacity = 0;
            document.querySelector('.thing-descr').style.opacity = 1;
        }

    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.id == 'moreBtn') {
            document.querySelector('.thing-title').style.opacity = 1;
            document.querySelector('.thing-descr').style.opacity = 0;
        }
    });
}

function setThing() {

    var match = document.querySelector('.thing-title').innerHTML;
    var number = 1;

    min = Math.ceil(0);
    max = Math.floor(50);
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    

    /*
    let match = data.find((thing) => {
        return thing.id == number;
    })
*/
    let sizeClass = match.length > 40 ? 'small' : 'big';
    //document.querySelector('.thing-index').innerHTML = pad(match.id);
    document.querySelector('.thing-title').innerHTML = match + '<br /><div id="moreBtn" class="more-btn">More -></div>';
    document.querySelector('.thing-title').classList.remove('small');
    document.querySelector('.thing-title').classList.add(sizeClass);
    //document.querySelector('.thing-descr').innerHTML = match.description;

    //set colors    
    number = random;
    let color = colors[random];
    let textColor = '#ffffff';

    //reverse black & white if needed
    if (color == '#ffffff' || color == '#FFC043')
        textColor = '#000000';

    document.querySelector('#container').style.backgroundColor = color;
    document.querySelector('.thing-container').style.color = textColor;
    document.querySelector('#arrow-svg').setAttribute('fill', textColor);
    document.querySelector('#container').style.opacity = 1;

}

/*
function getThings(callback) {

    var things = null;


        response.json().then(function (data) {
            return callback(data.content.things);
        });
        
//
    fetch('./_data/data.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    return callback(data.content.things);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
//
}

*/
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}