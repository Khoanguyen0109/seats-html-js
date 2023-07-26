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

window.onload = () => {
  const collection = document.getElementsByTagName("g");
  const arr = [];
  Array.from(collection).forEach((g) => {
    console.log("g", g);
    arr.push(g.getAttribute("id"));
  });
  console.log("arr", arr);
};

[
  "3_G_17",
  "3_G_15",
  "3_G_13",
  "3_G_11",
  "3_G_09",
  "3_G_07",
  "3_G_05",
  "3_G_03",
  "3_G_01",
  "3_G_02",
  "3_G_04",
  "3_G_06",
  "3_G_08",
  "3_G_10",
  "3_G_12",
  "3_G_14",
  "3_G_16",
  "3_G_18",
  "3_F_31",
  "3_F_29",
  "3_F_27",
  "3_F_25",
  "3_F_23",
  "3_F_21",
  "3_F_19",
  "3_F_17",
  "3_F_15",
  "3_F_13",
  "3_F_11",
  "3_F_09",
  "3_F_07",
  "3_F_05",
  "3_F_03",
  "3_F_01",
  "3_E_31",
  "3_E_29",
  "3_E_27",
  "3_E_25",
  "3_E_23",
  "3_E_21",
  "3_E_19",
  "3_E_17",
  "3_E_15",
  "3_E_13",
  "3_E_11",
  "3_E_09",
  "3_E_07",
  "3_E_05",
  "3_E_03",
  "3_E_01",
  "3_D_31",
  "3_D_29",
  "3_D_27",
  "3_D_25",
  "3_D_23",
  "3_D_21",
  "3_D_19",
  "3_D_17",
  "3_D_15",
  "3_D_13",
  "3_D_11",
  "3_D_09",
  "3_D_07",
  "3_D_05",
  "3_D_03",
  "3_D_01",
  "3_C_31",
  "3_B_31",
  "3_A_31",
  "3_A_33",
  "1_K_31",
  "1_J_31",
  "1_I_31",
  "1_H_31",
  "1_G_31",
  "1_F_31",
  "1_E_31",
  "1_D_31",
  "1_C_31",
  "1_B_31",
  "1_A_31",
  "3_C_29",
  "3_B_29",
  "3_A_29",
  "1_K_29",
  "1_J_29",
  "1_I_29",
  "1_H_29",
  "1_G_29",
  "1_F_29",
  "1_E_29",
  "1_D_29",
  "1_C_29",
  "1_B_29",
  "1_A_29",
  "3_C_27",
  "3_B_27",
  "3_A_27",
  "1_O_27",
  "1_N_27",
  "1_M_27",
  "1_L_27",
  "1_K_27",
  "1_J_27",
  "1_I_27",
  "1_H_27",
  "1_G_27",
  "1_F_27",
  "1_E_27",
  "1_D_27",
  "1_C_27",
  "1_B_27",
  "1_A_27",
  "3_C_25",
  "3_B_25",
  "3_A_25",
  "1_O_25",
  "1_N_25",
  "1_M_25",
  "1_L_25",
  "1_K_25",
  "1_J_25",
  "1_I_25",
  "1_H_25",
  "1_G_25",
  "1_F_25",
  "1_E_25",
  "1_D_25",
  "1_C_25",
  "1_B_25",
  "1_A_25",
  "3_C_23",
  "3_B_23",
  "3_A_23",
  "1_O_23",
  "1_N_23",
  "1_M_23",
  "1_L_23",
  "1_K_23",
  "1_J_23",
  "1_I_23",
  "1_H_23",
  "1_G_23",
  "1_F_23",
  "1_E_23",
  "1_D_23",
  "1_C_23",
  "1_B_23",
  "1_A_23",
  "3_C_21",
  "3_B_21",
  "3_A_21",
  "1_O_21",
  "1_N_21",
  "1_M_21",
  "1_L_21",
  "1_K_21",
  "1_J_21",
  "1_I_21",
  "1_H_21",
  "1_G_21",
  "1_F_21",
  "1_E_21",
  "1_D_21",
  "1_C_21",
  "1_B_21",
  "1_A_21",
  "3_C_19",
  "3_B_19",
  "3_A_19",
  "1_O_19",
  "1_N_19",
  "1_M_19",
  "1_L_19",
  "1_K_19",
  "1_J_19",
  "1_I_19",
  "1_H_19",
  "1_G_19",
  "1_F_19",
  "1_E_19",
  "1_D_19",
  "1_C_19",
  "1_B_19",
  "1_A_19",
  "3_C_17",
  "3_B_17",
  "3_A_17",
  "1_O_17",
  "1_N_17",
  "1_M_17",
  "1_L_17",
  "1_K_17",
  "1_J_17",
  "1_I_17",
  "1_H_17",
  "1_G_17",
  "1_F_17",
  "1_E_17",
  "1_D_17",
  "1_C_17",
  "1_B_17",
  "1_A_17",
  "3_C_15",
  "3_B_15",
  "3_A_15",
  "1_O_15",
  "1_N_15",
  "1_M_15",
  "1_L_15",
  "1_K_15",
  "1_J_15",
  "1_I_15",
  "1_H_15",
  "1_G_15",
  "1_F_15",
  "1_E_15",
  "1_D_15",
  "1_C_15",
  "1_B_15",
  "1_A_15",
  "3_C_13",
  "3_B_13",
  "3_A_13",
  "1_O_13",
  "1_N_13",
  "1_M_13",
  "1_L_13",
  "1_K_13",
  "1_J_13",
  "1_I_13",
  "1_H_13",
  "1_G_13",
  "1_F_13",
  "1_E_13",
  "1_D_13",
  "1_C_13",
  "1_B_13",
  "1_A_13",
  "3_C_11",
  "3_B_11",
  "3_A_11",
  "1_O_11",
  "1_N_11",
  "1_M_11",
  "1_L_11",
  "1_K_11",
  "1_J_11",
  "1_I_11",
  "1_H_11",
  "1_G_11",
  "1_F_11",
  "1_E_11",
  "1_D_11",
  "1_C_11",
  "1_B_11",
  "1_A_11",
  "3_C_09",
  "3_B_09",
  "3_A_09",
  "1_O_09",
  "1_N_09",
  "1_M_09",
  "1_L_09",
  "1_K_09",
  "1_J_09",
  "1_I_09",
  "1_H_09",
  "1_G_09",
  "1_F_09",
  "1_E_09",
  "1_D_09",
  "1_C_09",
  "1_B_09",
  "1_A_09",
  "3_C_07",
  "3_B_07",
  "3_A_07",
  "1_O_07",
  "1_N_07",
  "1_M_07",
  "1_L_07",
  "1_K_07",
  "1_J_07",
  "1_I_07",
  "1_H_07",
  "1_G_07",
  "1_F_07",
  "1_E_07",
  "1_D_07",
  "1_C_07",
  "1_B_07",
  "1_A_07",
  "3_C_05",
  "3_B_05",
  "3_A_05",
  "1_O_05",
  "1_N_05",
  "1_M_05",
  "1_L_05",
  "1_K_05",
  "1_J_05",
  "1_I_05",
  "1_H_05",
  "1_G_05",
  "1_F_05",
  "1_E_05",
  "1_D_05",
  "1_C_05",
  "1_B_05",
  "1_A_05",
  "3_C_03",
  "3_B_03",
  "3_A_03",
  "1_O_03",
  "1_N_03",
  "1_M_03",
  "1_L_03",
  "1_K_03",
  "1_J_03",
  "1_I_03",
  "1_H_03",
  "1_G_03",
  "1_F_03",
  "1_E_03",
  "1_D_03",
  "1_C_03",
  "1_B_03",
  "1_A_03",
  "3_C_01",
  "3_B_01",
  "3_A_01",
  "1_P_13",
  "1_P_11",
  "1_P_09",
  "1_P_07",
  "1_P_05",
  "1_P_03",
  "1_P_01",
  "1_O_01",
  "1_N_01",
  "1_M_01",
  "1_L_01",
  "1_K_01",
  "1_J_01",
  "1_I_01",
  "1_H_01",
  "1_G_01",
  "1_F_01",
  "1_E_01",
  "1_D_01",
  "1_C_01",
  "1_B_01",
  "1_A_01",
  "3_F_02",
  "3_F_04",
  "3_F_06",
  "3_F_08",
  "3_F_10",
  "3_F_12",
  "3_F_14",
  "3_F_16",
  "3_F_18",
  "3_F_20",
  "3_F_22",
  "3_F_24",
  "3_F_26",
  "3_F_28",
  "3_F_30",
  "3_F_32",
  "3_E_02",
  "3_E_04",
  "3_E_06",
  "3_E_08",
  "3_E_10",
  "3_E_12",
  "3_E_14",
  "3_E_16",
  "3_E_18",
  "3_E_20",
  "3_E_22",
  "3_E_24",
  "3_E_26",
  "3_E_28",
  "3_E_30",
  "3_E_32",
  "3_D_02",
  "3_D_04",
  "3_D_06",
  "3_D_08",
  "3_D_10",
  "3_D_12",
  "3_D_14",
  "3_D_16",
  "3_D_18",
  "3_D_20",
  "3_D_22",
  "3_D_24",
  "3_D_26",
  "3_D_28",
  "3_D_30",
  "3_D_32",
  "3_C_02",
  "3_B_02",
  "1_O_02",
  "1_N_02",
  "1_M_02",
  "1_L_02",
  "1_K_02",
  "1_J_02",
  "1_I_02",
  "1_H_02",
  "1_G_02",
  "1_F_02",
  "1_E_02",
  "1_D_02",
  "1_C_02",
  "1_B_02",
  "1_A_02",
  "3_C_04",
  "3_B_04",
  "1_O_04",
  "1_N_04",
  "1_M_04",
  "1_L_04",
  "1_K_04",
  "1_J_04",
  "1_I_04",
  "1_H_04",
  "1_G_04",
  "1_F_04",
  "1_E_04",
  "1_D_04",
  "1_C_04",
  "1_B_04",
  "1_A_04",
  "3_C_06",
  "3_B_06",
  "1_O_06",
  "1_N_06",
  "1_M_06",
  "1_L_06",
  "1_K_06",
  "1_J_06",
  "1_I_06",
  "1_H_06",
  "1_G_06",
  "1_F_06",
  "1_E_06",
  "1_D_06",
  "1_C_06",
  "1_B_06",
  "1_A_06",
  "3_C_08",
  "3_B_08",
  "1_O_08",
  "1_N_08",
  "1_M_08",
  "1_L_08",
  "1_K_08",
  "1_J_08",
  "1_I_08",
  "1_H_08",
  "1_G_08",
  "1_F_08",
  "1_E_08",
  "1_D_08",
  "1_C_08",
  "1_B_08",
  "1_A_08",
  "3_C_10",
  "3_B_10",
  "1_O_10",
  "1_N_10",
  "1_M_10",
  "1_L_10",
  "1_K_10",
  "1_J_10",
  "1_I_10",
  "1_H_10",
  "1_G_10",
  "1_F_10",
  "1_E_10",
  "1_D_10",
  "1_C_10",
  "1_B_10",
  "1_A_10",
  "3_C_12",
  "3_B_12",
  "1_O_12",
  "1_N_12",
  "1_M_12",
  "1_L_12",
  "1_K_12",
  "1_J_12",
  "1_I_12",
  "1_H_12",
  "1_G_12",
  "1_F_12",
  "1_E_12",
  "1_D_12",
  "1_C_12",
  "1_B_12",
  "1_A_12",
  "3_C_14",
  "3_B_14",
  "1_P_02",
  "1_P_04",
  "1_P_06",
  "1_P_08",
  "1_P_10",
  "1_P_12",
  "1_P_14",
  "1_O_14",
  "1_N_14",
  "1_M_14",
  "1_L_14",
  "1_K_14",
  "1_J_14",
  "1_I_14",
  "1_H_14",
  "1_G_14",
  "1_F_14",
  "1_E_14",
  "1_D_14",
  "1_C_14",
  "1_B_14",
  "1_A_14",
  "3_C_16",
  "3_B_16",
  "1_O_16",
  "1_N_16",
  "1_M_16",
  "1_L_16",
  "1_K_16",
  "1_J_16",
  "1_I_16",
  "1_H_16",
  "1_G_16",
  "1_F_16",
  "1_E_16",
  "1_D_16",
  "1_C_16",
  "1_B_16",
  "1_A_16",
  "3_C_18",
  "3_B_18",
  "1_O_18",
  "1_N_18",
  "1_M_18",
  "1_L_18",
  "1_K_18",
  "1_J_18",
  "1_I_18",
  "1_H_18",
  "1_G_18",
  "1_F_18",
  "1_E_18",
  "1_D_18",
  "1_C_18",
  "1_B_18",
  "1_A_18",
  "3_C_20",
  "3_B_20",
  "1_O_20",
  "1_N_20",
  "1_M_20",
  "1_L_20",
  "1_K_20",
  "1_J_20",
  "1_I_20",
  "1_H_20",
  "1_G_20",
  "1_F_20",
  "1_E_20",
  "1_D_20",
  "1_C_20",
  "1_B_20",
  "1_A_20",
  "3_C_22",
  "3_B_22",
  "1_O_22",
  "1_N_22",
  "1_M_22",
  "1_L_22",
  "1_K_22",
  "1_J_22",
  "1_I_22",
  "1_H_22",
  "1_G_22",
  "1_F_22",
  "1_E_22",
  "1_D_22",
  "1_C_22",
  "1_B_22",
  "1_A_22",
  "3_C_24",
  "3_B_24",
  "1_O_24",
  "1_N_24",
  "1_M_24",
  "1_L_24",
  "1_K_24",
  "1_J_24",
  "1_I_24",
  "1_H_24",
  "1_G_24",
  "1_F_24",
  "1_E_24",
  "1_D_24",
  "1_C_24",
  "1_B_24",
  "1_A_24",
  "3_C_26",
  "3_B_26",
  "1_O_26",
  "1_N_26",
  "1_M_26",
  "1_L_26",
  "1_K_26",
  "1_J_26",
  "1_I_26",
  "1_H_26",
  "1_G_26",
  "1_F_26",
  "1_E_26",
  "1_D_26",
  "1_C_26",
  "1_B_26",
  "1_A_26",
  "3_C_28",
  "3_B_28",
  "1_O_28",
  "1_N_28",
  "1_M_28",
  "1_L_28",
  "1_K_28",
  "1_J_28",
  "1_I_28",
  "1_H_28",
  "1_G_28",
  "1_F_28",
  "1_E_28",
  "1_D_28",
  "1_C_28",
  "1_B_28",
  "1_A_28",
  "3_C_30",
  "3_B_30",
  "1_K_30",
  "1_J_30",
  "1_I_30",
  "1_H_30",
  "1_G_30",
  "1_F_30",
  "1_E_30",
  "1_D_30",
  "1_C_30",
  "1_B_30",
  "1_A_30",
  "3_C_32",
  "3_B_32",
  "2_R2A_31",
  "2_R2A_33",
  "2_R2A_35",
  "2_R2A_29",
  "2_R2A_27",
  "2_R2A_25",
  "2_R2A_23",
  "2_R2A_21",
  "2_R2A_19",
  "2_R2A_17",
  "2_R2A_15",
  "2_R2A_13",
  "2_R2A_11",
  "2_R2A_09",
  "2_R2A_07",
  "2_R2A_05",
  "2_R2A_03",
  "2_R2A_01",
  "2_R2B_15",
  "2_R2B_13",
  "2_R2B_11",
  "2_R2B_09",
  "2_R2B_07",
  "2_R2B_05",
  "2_R2B_03",
  "2_R2B_01",
  "2_L2A_02",
  "2_L2A_04",
  "2_L2A_06",
  "2_L2A_08",
  "2_L2A_10",
  "2_L2A_12",
  "2_L2A_14",
  "2_L2A_16",
  "2_L2A_18",
  "2_L2A_20",
  "2_L2A_22",
  "2_L2A_24",
  "2_L2A_26",
  "2_L2A_28",
  "2_L2A_30",
  "2_L2A_32",
  "2_L2A_34",
  "2_L2A_36",
  "2_L2B_02",
  "2_L2B_04",
  "2_L2B_06",
  "2_L2B_08",
  "2_L2B_10",
  "2_L2B_12",
  "2_L2B_14",
  "2_L2B_16",
  "3_A_02",
  "3_A_04",
  "3_A_06",
  "3_A_08",
  "3_A_10",
  "3_A_12",
  "3_A_14",
  "3_A_16",
  "3_A_18",
  "3_A_20",
  "3_A_22",
  "3_A_24",
  "3_A_26",
  "3_A_28",
  "3_A_30",
  "1_K_32",
  "1_J_32",
  "1_I_32",
  "1_H_32",
  "1_G_32",
  "1_F_32",
  "1_E_32",
  "1_D_32",
  "1_C_32",
  "1_B_32",
  "1_A_32",
];
