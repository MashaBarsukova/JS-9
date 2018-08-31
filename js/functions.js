const lang = {
  en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./"
};

const html = document.querySelector("#keyboard-tpl").textContent.trim();
const parent = document.querySelector("#keyboard-container");

function Rows(str) {
  const arrLetters = str.split('');
  this.top = arrLetters.slice(0, 12);
  this.middle = arrLetters.slice(12, 23);
  this.bottom = arrLetters.slice(23);
  this.space = ["space"];
}

function renderKeyboard(tpl, obj, parent) {
  const rows = new Rows(obj.en);
  const compiled = _.template(tpl);
  const rowsKeys = Object.keys(rows);

  let resultHtml = '';

  rowsKeys.forEach(i => {
    resultHtml += compiled(rows[i]);
  })

  parent.innerHTML = resultHtml;
}

renderKeyboard(html, lang, parent);
parent.lastElementChild.firstElementChild.classList.add('keyboard__btn--space');

const buttons = Array.from(document.querySelectorAll("button"));

const activeBtn = {
  node: null
};

const keyDown = (event) => {
  if (activeBtn.node !== null) {
      activeBtn.node.classList.remove("keyboard__btn--active");
    }
  if (event.key === " ") {
      const spaceBtn = document.querySelector(".keyboard__btn--space");
      spaceBtn.classList.add("keyboard__btn--active");
      activeBtn.node = spaceBtn;
  }
  else {
    for (let item in buttons) {
      if (event.key === buttons[item].textContent) {
        buttons[item].classList.add("keyboard__btn--active");
        activeBtn.node = buttons[item];
      }
    }
  }
}

window.addEventListener("keydown", keyDown);

const onClick = (event) => {
  if (activeBtn.node !== null) {
    activeBtn.node.classList.remove("keyboard__btn--active");
  }
  if (event.target !== event.currentTarget && !event.target.classList.contains("keyboard__row")) {
    event.target.classList.add("keyboard__btn--active");
    activeBtn.node = event.target;
  } else {
    activeBtn.node.classList.remove("keyboard__btn--active");
    activeBtn.node = event.target;
  }
}
const keyboard = document.querySelector('#keyboard-container');
keyboard.addEventListener('click', onClick);
