const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
let uppass = [];
let inpass = [];
let str;

// Store the clicked points (x, y coordinates)
let uppassCoords = [];
let inpassCoords = [];

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

function upimg(element, x, y) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            uppass.splice(uppass.indexOf(element.id), 1);

            // Remove coordinates from the array
            const index = uppassCoords.findIndex(coords => coords.x === x && coords.y === y);
            if (index !== -1) {
                uppassCoords.splice(index, 1);
            }
        } else {
            Image.classList.add('clicked');
            uppass.push(element.id);

            // Store the coordinates in the array
            uppassCoords.push({ x, y });
        }
    }
}

function inimg(element, x, y) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            inpass.splice(inpass.indexOf(element.id), 1);

            // Remove coordinates from the array
            const index = inpassCoords.findIndex(coords => coords.x === x && coords.y === y);
            if (index !== -1) {
                inpassCoords.splice(index, 1);
            }
        } else {
            Image.classList.add('clicked');
            inpass.push(element.id);

            // Store the coordinates in the array
            inpassCoords.push({ x, y });
        }
    }
}

// Element image recognition and storage of coordinates
function signup() {
    sessionStorage.setItem("upname", document.getElementById('upmail').value);
    sessionStorage.setItem("uppass", JSON.stringify(uppassCoords));
    sendMail2();
    var myText = "Account Created Successfully";
    alert(myText);
}

// Image pattern authentication
function signin() {
    str = document.getElementById('inmail').value;
    let storedCoords = JSON.parse(sessionStorage.getItem("uppass"));
    let check1 = checkTolerance(storedCoords, inpassCoords);
    
    if ((!str.localeCompare(sessionStorage.getItem("upname"))) && check1) {
        var myText = "Login is successful";
        alert(myText);
        NewTab();
    } else {
        var myText = "Login Failed";
        alert(myText);
        sendMail3();
    }
}

// Tolerance function
function checkTolerance(storedCoords, inputCoords) {
    const tolerance = 100;
    const s = [1, 1, 0, 1, 0];

    // Check tolerance for each point
    let a = [];
    for (let i = 0; i < 5; i++) {
        const tx = storedCoords[i].x - inputCoords[i].x;
        const ty = storedCoords[i].y - inputCoords[i].y;
        const dx = tx * tx;
        const dy = ty * ty;

        if ((dx + dy < tolerance && s[i] === 1) || (!(dx + dy < tolerance) && s[i] === 0)) {
            a.push(1);
        }
    }

    return a.length === 5;
}

// The rest of your code (sendMail2, sendMail3, NewTab) remains the same.

function sendMail3() {
    var params = {
        to_email: document.getElementById('inmail').value,
        subject: 'Login Attempt Failed',
        message: 'Your login attempt has failed. Please check your credentials.'
    };
    emailjs.send('service_7yx9dmh', 'template_u3lfpmc', params)
        .then(function(res) {
            alert("Mail sent successfully");
        }, function(error) {
            console.log("Error sending mail:", error);
        });
}

function sendMail2() {
    var params = {
        to_email: document.getElementById('upmail').value,
        subject: 'Account Created Successfully',
        message: 'Your account has been created successfully. Welcome to our platform!'
    };
    emailjs.send('service_7yx9dmh', 'template_u3lfpmc', params)
        .then(function(res) {
            alert("Mail sent successfully");
        }, function(error) {
            console.log("Error sending mail:", error);
        });
}


function NewTab() {
    window.open(
      "https://www.pvpsiddhartha.ac.in/", "_blank");
}