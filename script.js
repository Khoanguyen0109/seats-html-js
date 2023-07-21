// Show input error message
const ACTIVE_SEAT = "black";
const bookedSeat = [];

async function getSeatPrice() {
  try {
  } catch (error) {}
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
    return alert("Vui lòng chọn ghế", "error");
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
            `${getFieldName(field_value)} can not be less than 3 letters`
          );
        } else {
          if (input === "phone") {
            showSuccess(field_value);
          }
          let letters = /^[A-Za-z]+$/;
          if (input == "name") {
            if (letters.test(field_value.value.trim())) {
              showSuccess(field_value);
            } else {
              showError(field_value, "Tên không hợp lệ");
            }
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
  const required = checkRequired(["name", "phone", "email"]);
});

const svgFrame = document.getElementById("frame");
const summerPalm = document.querySelector("g");

function showBox(e) {
  let seatId = e.target.parentElement.getAttribute("id");
  if (seatId !== "Stage") {
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

window.onload = function () {
  var w = window.innerWidth;
  console.log("w", w);
  var h = window.innerHeight;
  if (w < 700) {
    const map = document.getElementById("map");

    map.scrollTo(780, 1000);
  }
};

svgFrame.onload = function () {
  // const bookedSeat = ["G02"];
  bookedSeat.forEach((seat) => {
    onFill(seat);
  });
};
