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
let nowClick = true;
const root = document.getElementById("root");
const cal = createTag("div", "calc");
root.appendChild(cal);
let c = 1;
const head = createTag("div", "head", "disp");
cal.appendChild(head);
const headText = createTag("p", "headText", "headId");
headText.innerText = "0";
head.appendChild(headText);

const calcb = createTag("div", "calc-body");
cal.appendChild(calcb);

for (let i = 0; i < buttons.length; i++) {
  const btn = createTag("input", "btn", i + 1);
  btn.setAttribute("type", "button");
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
  btn.value = buttons[i];
  btn.addEventListener("click", (e) => {
    const input = e.target.value;
    const k = headText.innerText;
    c++;
    document.getElementById("headId").style.fontSize = `${
      100 - document.getElementById("headId").length
    }px`;
    if (input == "AC" || input == "C") {
      nowClick = true;
      document.getElementById("1").value = "AC";
      headText.innerText = "0";
      floatNum = false;
      calAction = false;
      nest = 0;
      count = 0;
    } else if (input == "+/-") {
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
      if (nowClick) {
        nest = Number(k);
        calAction = true;
        calAc = input;
        count = 0;

        floatNum = false;
        nowClick = false;
      }
    } else if (input == "=") {
      nowClick = true;
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
        headText.innerText = e.target.value;
        document.getElementById("1").value = "C";
        count++;
      } else {
        count++;
        headText.innerText += e.target.value;
        document.getElementById("1").value = "C";
        // console.log("btn");
      }
    } else {
      if (count == 0) {
        count++;
        headText.innerText = e.target.value;
        document.getElementById("1").value = "C";
      } else {
        count++;
        headText.innerText += e.target.value;
        document.getElementById("1").value = "C";
        // console.log("btn", btn[0]);
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
