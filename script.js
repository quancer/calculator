function createTag(tagName, tagClass, tagId) {
  const tag = document.createElement(`${tagName}`);
  if (tagClass != "" && tagClass != undefined) {
    tag.setAttribute("class", `${tagClass}`);
  }
  if (tagId != "" && tagId != undefined) {
    tag.setAttribute("id", `${tagId}`);
  }
  return tag;
}
let a = "3.";
// a = a - ".";

console.log("a=", a[a.length - 1]);
const buttons = [
  "AC",
  "+/-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];
let floatNum = false;
let nest = 0;
let calAction = false;
let calAc;
let count;
const root = document.getElementById("root");
const cal = createTag("div", "calc");
root.appendChild(cal);

const head = createTag("div", "head");
cal.appendChild(head);
const headText = createTag("p", "headText");
headText.innerHTML = "0";
head.appendChild(headText);

const calcb = createTag("div", "calc-body");
cal.appendChild(calcb);

for (let i = 0; i < buttons.length; i++) {
  const btn = createTag("div", "btn", i);
  if (buttons[i] == "AC" || buttons[i] == "+/-" || buttons[i] == "%") {
    btn.setAttribute("class", "btn gray-bg");
  }
  if (
    buttons[i] == "+" ||
    buttons[i] == "-" ||
    buttons[i] == "/" ||
    buttons[i] == "*" ||
    buttons[i] == "="
  ) {
    btn.setAttribute("class", "btn orange-bg");
  }
  if (buttons[i] == "0") {
    btn.setAttribute("class", "btn lg");
  }
  btn.innerText = buttons[i];
  btn.addEventListener("click", (e) => {
    const input = e.target.innerText;
    const k = headText.innerText;
    if (input == "AC" || input == "C") {
      headText.innerText = "0";
      floatNum = false;
      calAction = false;
      nest = 0;
      count = 0;
    } else if (input == "+/-") {
      console.log(k[0]);
      if (k[0] == "-") {
        headText.innerText = Number(k) * -1;
      } else {
        headText.innerText = "-" + k;
      }
    } else if (input == "%") {
      headText.innerText = Number(k) / 100;
    } else if (input == ".") {
      if (floatNum == false) {
        floatNum = true;
        if (calAction == true && count == 0) {
          headText.innerText = "0.";
          count++;
        } else {
          headText.innerText = k + ".";
        }
      } else if (calAction == true && count == 0) {
        headText.innerText = "0.";
        count++;
      }
    } else if (input == "+" || input == "-" || input == "/" || input == "*") {
      nest = Number(k);
      calAction = true;
      calAc = input;
      count = 0;
      console.log("nest=", nest);
      floatNum = false;
    } else if (input == "=") {
      let a = headText.innerText;
      result = nest + Number(a);
      if (calAc == "+") {
        result = add(nest, Number(a));
      } else if (calAc == "-") {
        result = sub(nest, Number(a));
      } else if (calAc == "*") {
        result = multi(nest, Number(a));
      } else if (calAc == "/") {
        result = div(nest, Number(a));
      }

      headText.innerText = result;
    } else if (calAction == false) {
      if (headText.innerText == "0") {
        headText.innerText = e.target.innerText;
        count++;
      } else {
        count++;
        headText.innerText += e.target.innerText;
      }
    } else {
      if (count == 0) {
        count++;
        headText.innerText = e.target.innerText;
      } else {
        count++;
        headText.innerText += e.target.innerText;
      }
    }
  });
  calcb.appendChild(btn);
}

function add(num1, num2) {
  return num1 + num2;
}
function sub(num1, num2) {
  return num1 - num2;
}

function multi(num1, num2) {
  return num1 * num2;
}
function div(num1, num2) {
  return num1 / num2;
}
