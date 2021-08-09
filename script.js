/*==========================================================================
-----------------------    Changing Theme Colors   -------------------------
============================================================================*/

const root = document.documentElement;
const themeControlsContainer = document.querySelector(
  ".theme-controls-container"
);

let colorSchemes = {
  theme1: `
    --main-background: hsl(222, 26%, 31%);
    --secondary-background: hsl(223, 31%, 20%);
    --screen-background: hsl(224, 36%, 15%);
    --button-other-background: hsl(225, 21%, 49%);
    --button-other-shadow: hsl(224, 28%, 35%);
    --button-equals-background: hsl(6, 63%, 50%);
    --button-equals-shadow: hsl(6, 70%, 34%);
    --button-main-background: hsl(30, 25%, 89%);
    --button-main-shadow: hsl(28, 16%, 65%);
    --text-main: hsl(221, 14%, 31%);
    --text-other: #fff;
    --text-equals: #fff;
    --text-headers: #fff;`,

  theme2: `
  --main-background: hsl(0, 0%, 90%);
  --secondary-background: hsl(0, 5%, 81%);
  --screen-background: hsl(0, 0%, 93%);
  --button-other-background: hsl(185, 42%, 37%);
  --button-other-shadow: hsl(185, 58%, 25%);
  --button-equals-background: hsl(25, 98%, 40%);
  --button-equals-shadow: hsl(25, 99%, 27%);
  --button-main-background: hsl(45, 7%, 89%);
  --button-main-shadow: hsl(35, 11%, 61%);
  --text-main: hsl(60, 10%, 19%);
  --text-other: #fff;
  --text-equals: #fff;
  --text-headers: hsl(60, 10%, 19%);`,

  theme3: `
  --main-background: hsl(268, 75%, 9%);
  --secondary-background: hsl(268, 71%, 12%);
  --screen-background: hsl(268, 71%, 12%);
  --button-other-background: hsl(281, 89%, 26%);
  --button-other-shadow: hsl(285, 91%, 52%);
  --button-equals-background: hsl(176, 100%, 44%);
  --button-equals-shadow: hsl(177, 92%, 70%);
  --button-main-background: hsl(268, 47%, 21%);
  --button-main-shadow: hsl(290, 70%, 36%);
  --text-main: hsl(52, 100%, 62%);
  --text-other: #fff;
  --text-equals: hsl(198, 20%, 13%);
  --text-headers: hsl(52, 100%, 62%);`,
};

//checked for saved theme in local storage
let savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  //if saved theme apply colors
  root.style.cssText = colorSchemes[savedTheme];
  document.getElementById(`${savedTheme}`).checked = true;
} else {
  //set color theme to browser settings
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.style.cssText = colorSchemes.theme3;
    document.getElementById("theme3").checked = true;
  } else {
    root.style.cssText = colorSchemes.theme2;
    document.getElementById("theme2").checked = true;
  }
}

//Change theme colors on click
themeControlsContainer.addEventListener("click", (e) => {
  root.style.cssText = colorSchemes[e.target.id];
  localStorage.setItem("theme", `${e.target.id}`);
});

/*==========================================================================
------------------------    Calculator Workings  ---------------------------
============================================================================*/
const screen = document.querySelector(".screen-container span");
const screenContainer = document.querySelector(".screen-container");
const calculatorButtonsContainer = document.querySelector(
  ".main-calculator-container"
);

let currentSum = 0;
let currentArithmetic = null;

calculatorButtonsContainer.addEventListener("click", (e) => {
  let click = e.target.innerHTML; //get current button clicked

  /**
   * @description  Take current number on screen and do selected arithmetic
   * @Param screen.innerHTML = number currently shown on calculator screen
   */
  const doArithmetic = () => {
    let number = parseFloat(screen.innerHTML);
    switch (currentArithmetic) {
      case "+":
        currentSum += number;
        break;
      case "-":
        currentSum -= number;
        break;
      case "x":
        currentSum = number * currentSum;
        break;
      case "/":
        currentSum = currentSum / number;
        break;
      default:
        if (currentSum === 0) currentSum += number; //if first number entered into calculator add to currentSum
        break;
    }
  };

  if (/^\d$/.test(click)) {
    //test for digit
    if (screen.innerHTML === "0") {
      screen.innerHTML = click;
    } else {
      screen.innerHTML = screen.innerHTML.concat(click);
    }
  } else if (click === ".") {
    screen.innerHTML = screen.innerHTML.concat(click);
  } else if (click === "=") {
    doArithmetic();
    currentArithmetic = null;
    screen.innerHTML = currentSum;
  } else if (click === "DEL") {
    if (screen.innerHTML.length <= 1) {
      screen.innerHTML = 0;
    } else {
      screen.innerHTML = screen.innerHTML.slice(0, -1);
    }
  } else if (click === "RESET") {
    currentArithmetic = null;
    currentSum = 0;
    screen.innerHTML = 0;
  } else if (click.length === 1) {
    //only run if click occurs on button
    doArithmetic();
    currentArithmetic = click;
    screen.innerHTML = 0;
  }
});
