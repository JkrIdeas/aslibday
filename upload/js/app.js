// Hamburger toggle
const hamburger = document.querySelector('.header_hamburger');
const header = document.querySelector('.header');

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle('open');
    header.classList.toggle('active');
});

// Formatowanie czasu
function ten(x) {
    return x < 10 ? "0" + x : x;
}

// Elementy w HTML
const dy = document.getElementById("y");
const dm = document.getElementById("m");
const d = document.getElementById("d");
const dhr = document.getElementById("hr");
const dmin = document.getElementById("min");
const dsec = document.getElementById("sec");

// Funkcja licz¹ca czas od 26.11.2023
function getCurrentTime() {
    // Strefa czasowa Turcji: Europe/Istanbul
    const timeZone = "Europe/Istanbul";

    // Data startowa w Turcji
    const startDate = new Date(Date.UTC(2023, 10, 26, 0, 0, 0)); // UTC
    const startDateInTurkey = new Date(startDate.toLocaleString("en-US", { timeZone }));

    // Teraz w Turcji
    const nowInTurkey = new Date(new Date().toLocaleString("en-US", { timeZone }));

    // Lata
    let years = nowInTurkey.getFullYear() - startDateInTurkey.getFullYear();

    // Miesi¹ce
    let months = nowInTurkey.getMonth() - startDateInTurkey.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }

    // Dni
    let days = nowInTurkey.getDate() - startDateInTurkey.getDate();
    if (days < 0) {
        months--;
        if (months < 0) {
            months += 12;
            years--;
        }
        const prevMonth = new Date(nowInTurkey.getFullYear(), nowInTurkey.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Godziny, minuty, sekundy
    const startOfDay = new Date(nowInTurkey.getFullYear(), nowInTurkey.getMonth(), nowInTurkey.getDate());
    let ms = nowInTurkey - startOfDay;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    // Wstawiamy do HTML
    dy.innerText = ten(years);
    dm.innerText = ten(months);
    d.innerText = ten(days);
    dhr.innerText = ten(hours);
    dmin.innerText = ten(minutes);
    dsec.innerText = ten(seconds);
}

window.setInterval(getCurrentTime, 1000);

// Scroll
const scroll = document.querySelector(".scroll");
window.addEventListener('scroll', function () {
    const h = document.documentElement.clientHeight * 0.5;
    if (window.scrollY > h) {
        scroll.classList.remove('inactive-scroll');
        scroll.classList.add('active-scroll');
    } else {
        scroll.classList.remove('active-scroll');
        scroll.classList.add('inactive-scroll');
    }
});

// Spinner
const spinner = document.querySelector('.spinning');
const spinBtn = document.querySelector('.spin-con button');
let deg = 0;
let newDeg = null;
let prize;

spinBtn.addEventListener('click', spinWheel);

function spinWheel() {
    let rotateDeg = deg + ((Math.random() * 1000) + 3333);
    let pureDeg = rotateDeg % 360;
    pureDeg = changeDeg(pureDeg, rotateDeg);
    checkDeg(pureDeg);

    if (newDeg) rotateDeg = newDeg;

    spinBtn.removeEventListener('click', spinWheel);
    spinner.style.transform = `rotate(${rotateDeg}deg)`;
    deg = rotateDeg;
    newDeg = null;

    setTimeout(function () {
        let winner = document.querySelector(`.spin-con_content:nth-of-type(${prize})`);
        let infoSpin = document.querySelector('.spin-info');
        winner.classList.add('won');
        let wItem = winner.children[0].innerText;
        if (wItem.length < 6) wItem = 'a ' + wItem;
        infoSpin.innerText = `Congrats Bae, you will get ${wItem}!`;
    }, 5000);
}

function changeDeg(deg, rotateD) {
    let degArr = [20.5, 69.5, 114, 159, 203, 249, 293, 339.5];
    for (let i = 0; i < degArr.length; i++) {
        if (deg > degArr[i] && deg < (degArr[i] + 3)) {
            newDeg = rotateD + 8;
            return deg + 8;
        }
        if (deg < degArr[i] && deg > (degArr[i] - 3)) {
            newDeg = rotateD - 8;
            return deg - 8;
        }
    }
    return deg;
}

function checkDeg(deg) {
    if (deg > 20.5 && deg < 69.5) prize = '8';
    else if (deg > 69.5 && deg < 114) prize = '7';
    else if (deg > 114 && deg < 159) prize = '6';
    else if (deg > 159 && deg < 203) prize = '5';
    else if (deg > 203 && deg < 249) prize = '4';
    else if (deg > 249 && deg < 293) prize = '3';
    else if (deg > 293 && deg < 339.5) prize = '2';
    else prize = '1';
}

// Gallery zoom
const photosArr = document.querySelectorAll('.gal-box span');
const galOv = document.querySelector('.gal-big');
const galOvImg = document.querySelector('.gal-big img');

galOv.addEventListener('click', function (e) {
    if (e.target == this) {
        galOv.classList.remove('show-galbig');
    }
});

photosArr.forEach((p) => {
    p.addEventListener('click', function () {
        let src = p.children[0].getAttribute('src');
        galOvImg.setAttribute('src', src);
        galOv.classList.add('show-galbig');
    });
});
