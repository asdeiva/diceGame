let arr = [];
let randomSum = 0;

let fname = document.querySelector("#fname");
let uname = document.querySelector("#uname");
let subReg = document.getElementById("regBtn");
let regForm = document.getElementById("user_Reg_Form");
let userinfo = document.getElementById("user_info");
let dice = document.getElementById("dice");
let diceBtn = document.getElementById("diceBtn");
let coupon_section = document.getElementById("coupon_section");
let badluck = document.getElementById("badluck");
let btn1 = document.getElementById("sec1");
let btn2 = document.getElementById("sec2");
let btn3 = document.getElementById("sec3");
let btn4 = document.getElementById("sec4");

btn2.disabled = true;
btn3.disabled = true;
btn4.disabled = true;

btn1.onclick = function () {
  fn1();
};
btn2.onclick = function () {
  fn2();
};
btn3.onclick = function () {
  fn3();
};
btn4.onclick = function () {
  fn4();
};
diceBtn.onclick = function () {
  rollDice();
};
subReg.onclick = function () {
  regist();
};

function regist() {
  console.log("submit clicked");
  let fullname = fname.value;
  let username = uname.value;
  let obj = { fullname, username };
  console.log(fullname, username);
  regForm.innerHTML = "Registerd Successfully";
  arr.push(obj);
  localStorage.setItem("data", JSON.stringify(arr));
  enableButton(btn2);
  disableButton(btn1);
}

let clickCount = 0;

function fn1() {
  clickCount++;
  disableButton(btn1);
  if (clickCount <= 1) {
    clickCount++;
    let style = regForm.style;
    enableDisplay(style);
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;
  } else {
    clickCount++;
  }
  console.log("fn1 called", clickCount);
}

function fn2() {
  disableButton(btn2);
  data = JSON.parse(localStorage.getItem("data"));
  disableDisplay(regForm.style);
  enableDisplay(userinfo.style);
  let myObj = data[0];
  let fname = myObj["fullname"];
  let uname = myObj["username"];
  // disableButton(img1)
  document.getElementById("full_name").innerHTML = "Full Name : " + fname;
  document.getElementById("user_name").innerHTML = "User Name : " + uname;
  enableButton(btn3);
}

function fn3() {
  disableButton(btn3);
  console.log("fn3 called");
  let style = dice.style;
  // disableDisplay(userinfo.style)
  disableButton(btn2);
  enableDisplay(style);
}

function fn4() {
  enableDisplay(dice.style);
  disableButton(btn1);
  enableDisplay(coupon_section.style);
  let coupon = document.getElementById("couponGen");
  coupon.innerHTML = "Your Coupon : " + generateToken();
  disableButton(btn4);
}
let roll = 0;
let attempt = 1;
function rollDice() {
  // let randomSum = 0
  let randomnum = document.getElementById("rndNum");
  let randsum = document.getElementById("rndNumSum");
  roll++;
  if (roll <= 3 && attempt <= 2) {
    let rand = Math.floor(Math.random() * 6) + 1;
    randomnum.innerHTML = rand;
    randomSum += rand;
    randsum.innerHTML = "Your Score : " + randomSum;
    console.log("roll : " + roll, "attempt : " + attempt);
    if (randomSum > 10) {
      disableButton(diceBtn);
      winner();
    }
  } else {
    roll = 0;
    if (attempt <=2) {
      let tryYes = prompt("Do you want to try again? type YES to continue");
      switch (tryYes) {
        case "YES":
          randomSum = 0;
          attempt++;
          rollDice();
          break;
        default:
          endGame();
      }
    } else endGame();
  }
}

function endGame() {
  badluck.innerHTML = "BaD LucK";
  enableDisplay(badluck.style);
  disableDisplay(dice.style);
  disableButton(btn3);
  disableButton(diceBtn);
}

function winner() {
  // disableDisplay(dice.style)
  disableButton(btn3);
  enableButton(btn4);
}

function disableButton(btn) {
  console.log("btn disabled");
  btn.disabled = true;
}

function enableButton(btn) {
  console.log("btn enabled");
  btn.disabled = false;
}

function enableDisplay(style) {
  style.display = "block";
}

function disableDisplay(style) {
  style.display = "none";
}

function generateToken() {
  let capital_digit = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let small_digit = "abcdefghijklmnopqrstuvwxyz";
  let number = "0123456789";
  let special = "!@#$%^&*()_+";

  let characters = capital_digit + small_digit + number + special;

  let token = "";
  for (let i = 0; i < 12; i++) {
    let random = Math.floor(Math.random() * characters.length);
    token = token + characters[random];
  }
  return token;
}
