// Show input error message
const ACTIVE_SEAT = "black";
const bookedSeat = [];
let seats = [];
let showTimes = [];
const API_ENDPOINT = "https://heroku.goappscript.com/booking";
async function getBookedSeats(id_xuat_chieu) {
  try {
    const res = await fetch(`${API_ENDPOINT}/booked-seats/${id_xuat_chieu}`);
    console.log("res", res);
    bookedSeat.concat(res.data.data);
  } catch (error) {
    console.log("error", error);
  }
}

async function getSeats() {
  try {
    const res = await fetch(`${API_ENDPOINT}/seats`).then((res) => res.json());
    seats = res.data.data;
  } catch (error) {
    console.log("error", error);
  }
}

async function getShowTimes() {
  try {
    const response = await fetch(`${API_ENDPOINT}/show-times`).then((res) =>
      res.json()
    );
    showTimes = response.data;
    const states = document.getElementById("play");
    showTimes.forEach((state) => {
      const option = document.createElement("option");
      option.value = state.id_xuat_chieu;
      option.innerHTML =
        state.ten_phim_kich +
        " - " +
        state.ngay_chieu +
        " - " +
        state.gio_chieu;
      states.appendChild(option);
    });
  } catch (error) {
    console.log("error", error);
  }
}

async function bookingSeats(id_xuat_chieu) {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/booked-seats/${id_xuat_chieu}`
    ).then((res) => res.json());
    const bookedSeats = response.data;
    bookedSeats.forEach((id) => {
      onFill(id);
    });
    console.log("first", response);
  } catch (error) {
    console.log("error", error);
  }
}

async function onChangePlay(selectObject) {
  var value = selectObject.value;
  bookingSeats(value);
}

async function submitSeat() {
  try {
  } catch (error) {}
}
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check required fields
function checkRequired(inputArr) {
  if (bookedSeat.length === 0) {
    alert("Vui lòng chọn ghế", "error");
    return true;
  }
  let isRequired = false;
  inputArr.forEach(function (input) {
    let field_value = document.getElementById(input);
    if (field_value.value.trim() === "") {
      document.getElementById(input).placeholder = "";
      showError(field_value, `Trường không được bỏ trống`);
      isRequired = true;
    } else {
      if (input == "name" || input == "phone") {
        if (field_value.value.length < 3) {
          showError(
            field_value,
            `${getFieldName(field_value)} không dược dưới 3 kí tự`
          );
        } else {
          if (input === "phone") {
            showSuccess(field_value);
          }
          let letters = /^[A-Za-z]+$/;
          if (input == "name") {
            // if (letters.test(field_value.value.trim())) {
            showSuccess(field_value);
            // } else {
            // showError(field_value, "Tên không hợp lệ");
            // }
          }
        }
      } else if (input == "email") {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (re.test(field_value.value.trim())) {
          showSuccess(field_value);
        } else {
          showError(field_value, "Email không hợp lệ");
        }
      }
      if (input === "play") {
        showSuccess(field_value);
      }
    }
  });

  return isRequired;
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

const onFill = (seat) => {
  const gBox = document.getElementById(seat);
  if (gBox) {
    const box = gBox.childNodes[1];
    const color = ACTIVE_SEAT;
    box.setAttribute("fill", color);
  }
};

const onUnFill = (seat) => {
  const rowMapColor = {};
  const floor = seat.split("_")[0];
  let color = "";
  switch (floor) {
    case "3":
      color = "#EAB308";
      break;
    case "2":
      color = "#3B82F6";
      break;
    case "1":
      color = "#991B1B";
      break;
    default:
      break;
  }
  const gBox = document.getElementById(seat);
  if (gBox) {
    const box = gBox.childNodes[1];
    box.setAttribute("fill", color);
  }
};

const checkAbleToFill = () => {};

function alert(text, type) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
  let color = "";
  switch (type) {
    case "success":
      color = "#04aa6d";
      break;
    case "error":
      color = "#991B1B";
      break;
    default:
      break;
  }
  x.style.backgroundColor = color;
  x.innerHTML = text;
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const required = checkRequired(["name", "phone", "email", "play"]);
  if (!required) {
    go();
  }
});

const svgFrame = document.getElementById("frame");
const summerPalm = document.querySelector("g");

function showBox(e) {
  let seatId = e.target.parentElement.getAttribute("id");
  if (
    seatId !== "Stage" &&
    !seatId.includes("Group") &&
    !seatId.includes("frame")
  ) {
    if (bookedSeat.includes(seatId)) {
      onUnFill(seatId);
      const index = bookedSeat.indexOf(seatId);
      if (index > -1) {
        // only splice array when item is found
        bookedSeat.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      onFill(seatId);
      bookedSeat.push(seatId);
    }
  }
  const seatBox = document.getElementById("seats");
  const textSeatBox = bookedSeat.join(", ");
  seatBox.innerHTML = "<p>" + textSeatBox + "</p>";
}
summerPalm.addEventListener("click", showBox);

svgFrame.onload = function () {
  // const bookedSeat = ["G02"];
  bookedSeat.forEach((seat) => {
    onFill(seat);
  });
};

shape = document.getElementsByTagName("svg")[0];
//shape.setAttribute("viewBox", "-250 -250 500 750");

//shape = document.getElementsByTagName("h1")[0];
//shape.innerHTML = "testing jscript";

var mouseStartPosition = { x: 0, y: 0 };
var mousePosition = { x: 0, y: 0 };
var viewboxStartPosition = { x: 0, y: 0 };
var viewboxPosition = { x: 0, y: 0 };
var viewboxSize = { x: 480, y: 480 };
var viewboxScale = 1.0;

var mouseDown = false;

shape.onmouseover = () => {
  shape.addEventListener("mousemove", mousemove);
  shape.addEventListener("mousedown", mousedown);
  shape.addEventListener("wheel", wheel);
};

shape.onmouseout = () => {
  shape.removeEventListener("mousemove", mousemove);
  shape.removeEventListener("mousedown", mousedown);
  shape.removeEventListener("wheel", wheel);
};

function mousedown(e) {
  mouseStartPosition.x = e.pageX;
  mouseStartPosition.y = e.pageY;

  viewboxStartPosition.x = viewboxPosition.x;
  viewboxStartPosition.y = viewboxPosition.y;

  window.addEventListener("mouseup", mouseup);

  mouseDown = true;
}

function setviewbox() {
  var vp = { x: 0, y: 0 };
  var vs = { x: 0, y: 0 };

  vp.x = viewboxPosition.x;
  vp.y = viewboxPosition.y;

  vs.x = viewboxSize.x * viewboxScale;
  vs.y = viewboxSize.y * viewboxScale;

  shape = document.getElementsByTagName("svg")[0];
  shape.setAttribute("viewBox", vp.x + " " + vp.y + " " + vs.x + " " + vs.y);
}

function mousemove(e) {
  mousePosition.x = e.offsetX;
  mousePosition.y = e.offsetY;

  if (mouseDown) {
    viewboxPosition.x =
      viewboxStartPosition.x + (mouseStartPosition.x - e.pageX) * viewboxScale;
    viewboxPosition.y =
      viewboxStartPosition.y + (mouseStartPosition.y - e.pageY) * viewboxScale;

    setviewbox();
  }

  var mpos = {
    x: mousePosition.x * viewboxScale,
    y: mousePosition.y * viewboxScale,
  };
  var vpos = { x: viewboxPosition.x, y: viewboxPosition.y };
  var cpos = { x: mpos.x + vpos.x, y: mpos.y + vpos.y };

  shape = document.getElementsByTagName("h1")[0];
  shape.innerHTML = mpos.x + " " + mpos.y + " " + cpos.x + " " + cpos.y;
}

function mouseup(e) {
  window.removeEventListener("mouseup", mouseup);

  mouseDown = false;
}

function wheel(e) {
  var scale = e.deltaY < 0 ? 0.9 : 1.08;
  console.log("scale", scale);
  if (viewboxScale * scale < 1.5 && viewboxScale * scale > 1 / 100) {
    var mpos = {
      x: mousePosition.x * viewboxScale,
      y: mousePosition.y * viewboxScale,
    };
    var vpos = { x: viewboxPosition.x, y: viewboxPosition.y };
    var cpos = { x: mpos.x + vpos.x, y: mpos.y + vpos.y };

    viewboxPosition.x = (viewboxPosition.x - cpos.x) * scale + cpos.x;
    viewboxPosition.y = (viewboxPosition.y - cpos.y) * scale + cpos.y;
    viewboxScale *= scale;

    setviewbox();
  }
}

$("#ok").click(function () {
  go();
  location.reload();
});

function go() {
  $(".message").toggleClass("comein");
  $(".check").toggleClass("scaledown");
}

$(document).ready(function () {
  var w = window.innerWidth;
  console.log("w", w);
  var h = window.innerHeight;
  if (w < 700) {
    const map = document.getElementById("map");

    map.scrollTo(780, 1000);
  }
  // put Ajax here.
  getSeats();
  getShowTimes();
});
