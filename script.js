// Show input error message
const ACTIVE_SEAT = "black";
const DISABLE_SEAT = "grey";
let bookedSeat = [];
let seats = [];
let showTimes = [];
let total = 0;
let voucher = 0;
let bookedSeatLoaded = [];

var body = document.getElementsByTagName("body")[0];
function disableBodyScroll() {
  body.style.overflowY = "hidden";
}
function enableBodyScroll() {
  body.style.overflowY = "auto";
}

const API_ENDPOINT = "https://heroku.goappscript.com/booking";
async function getBookedSeats(id_xuat_chieu) {
  try {
    const res = await fetch(`${API_ENDPOINT}/booked-seats/${id_xuat_chieu}`);
    bookedSeat.concat(res.data.data);
  } catch (error) {
    console.log("error", error);
  }
}

async function getSeats() {
  try {
    const res = await fetch(`${API_ENDPOINT}/seats`).then((response) =>
      response.json()
    );
    seats = res.data;
  } catch (error) {
    console.log("error", error);
  }
}

async function getBanner() {
  try {
    const res = await fetch(`${API_ENDPOINT}/banner`).then((response) =>
      response.json()
    );
    const bannerSrc = res.banner;
    $("#banner").attr("src", bannerSrc);
  } catch (error) {
    console.log("error", error);
  }
}

async function getVoucher(body) {
  try {
    const res = await fetch(`${API_ENDPOINT}/check-voucher`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    return res;
  } catch (error) {
    return error;
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
    bookedSeatLoaded.forEach((id) => onUnFill(id));
    bookedSeatLoaded = response.data;
    if (bookedSeatLoaded.length > 0) {
    }
    bookedSeatLoaded.forEach((id) => {
      onFillBooked(id);
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

async function submitSeat(body) {
  try {
    const res = await fetch(`${API_ENDPOINT}/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    console.log("res", res);
    return res;
  } catch (error) {
    return error;
  }
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

function calculate() {
  let subtotal = 0;
  total = 0;
  var carttable = "";

  bookedSeat.forEach((seat) => {
    const nameSeat = seat.replaceAll("_", "-");
    const item = seats.find((item) => item.ma_ghe === seat);
    const price = parseFloat(item.gia_ve.replaceAll(",", ""));
    carttable += "<tr><td>" + nameSeat + "</td><td>" + price + "</td></tr>";
    total += price;
    subtotal = total;
  });

  const preTotal = total - voucher;
  if (preTotal >= 0) {
    total = preTotal;
  } else {
    total = 0;
  }
  document.getElementById("subtotal").innerHTML =
    new Intl.NumberFormat().format(subtotal);

  document.getElementById("carttable").innerHTML = carttable;
  document.getElementById("total").innerHTML = new Intl.NumberFormat().format(
    total
  );
}

const onFill = (seat) => {
  const gBox = document.getElementById(seat);
  if (gBox) {
    const box = gBox.childNodes[1];
    const color = ACTIVE_SEAT;
    box.setAttribute("fill", color);
    const item = seats.find((item) => item.ma_ghe === seat);
    if (item) {
      calculate();
    }
  }
};

const onFillBooked = (seat) => {
  const gBox = document.getElementById(seat);
  if (gBox) {
    const box = gBox.childNodes[1];
    const color = DISABLE_SEAT;
    box.setAttribute("fill", color);
    gBox.setAttribute("pointer-events", "none");
    const item = seats.find((item) => item.ma_ghe === seat);
    if (item) {
      calculate();
    }
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
    const item = seats.find((item) => item.ma_ghe === seat);
    if (item) {
      calculate();
    }
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
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const button = document.getElementById("submit");

  const inputFields = ["name", "phone", "email", "play"];
  const required = checkRequired(inputFields);
  const body = {};
  inputFields.forEach((field) => {
    body[field] = document.getElementById(field).value.trim();
  });
  if (!required) {
    button.setAttribute("disabled", "");
    button.innerText = "Đang xử lý... ";
    const res = await submitSeat({
      seats: bookedSeat,
      tong_tien: total,
      ...body,
    });
    button.removeAttribute("disabled");
    button.innerText = "Đăng ký";

    if (res.data) {
      return go();
    }
    if (res.booked) {
      const message = document.getElementById("error-message");
      const message2 = document.getElementById("sub-error-message");

      bookedSeat = [];
      res?.booked.forEach((item) => onFillBooked(item));
      message.innerHTML = `Ghế bạn đặt đã không còn: ${res.booked.toString()}`;
      message2.innerHTML = "Vui lòng chọn lại ghế";
    }
    return goError();
  }
});

function showBox(e) {
  let seatId = e.target.parentElement.getAttribute("id");
  if (
    seatId !== "main_container" &&
    !seatId.includes("Group") &&
    !seatId.includes("frame") &&
    !seatId.includes("Frame")
  ) {
    if (bookedSeat.includes(seatId)) {
      const index = bookedSeat.indexOf(seatId);
      if (index > -1) {
        // only splice array when item is found
        bookedSeat.splice(index, 1); // 2nd parameter means remove one item only
      }
      onUnFill(seatId);
    } else {
      bookedSeat.push(seatId);
      onFill(seatId);
    }
  }
}

$("#ok").click(function () {
  go();
  location.reload();
});

$("#close").click(function () {
  goError();
  $(".fullscreen-container").fadeOut(200);
  bookedSeat = [];
});

function go() {
  $(".fullscreen-container").fadeTo(200, 1);
  $(".message").toggleClass("comein");
  $(".check").toggleClass("scaledown");
  const name = $("#name").val();
  console.log("name", name);
  const phoneValue = $("#phone").val();
  const total = $("#total").text();
  $("#payment-detail").val(` ${name} -  ${phoneValue}`);
  $("#total-payment").text(`Số tiền: ${total}`);
}

function goError() {
  $(".message-error").toggleClass("comein");
  $(".check-error").toggleClass("scaledown");
}

async function onFindVoucher(selectObject) {
  var value = selectObject;
  let field_value = document.getElementById("voucher");
  const formControl = field_value.parentElement;

  if (value === "") {
    formControl.className = "form-control";
    const small = formControl.querySelector("small");
    small.innerText = "";
    document.getElementById("discount").innerHTML = 0;
    return;
  } else {
    const res = await getVoucher({ voucher: value });
    if (res.status === 200 && res.discount) {
      const discount = parseFloat(res.discount.replaceAll(",", ""));
       const small = formControl.querySelector("small");
      small.innerText = "";
      showSuccess(field_value)
      voucher = discount;
      document.getElementById("discount").innerHTML = discount;

      calculate();
    } else {
      voucher = 0;
      calculate();
      document.getElementById("discount").innerHTML = 0;
      showError(field_value, `Voucher không tìm thấy`);
    }
  }
}

$(document).ready(function () {
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w < 700) {
    const map = document.getElementById("map");

    map.scrollTo(780, 1000);
  }
  // put Ajax here.
  getSeats();
  getBanner();
  getShowTimes();
});

let copyText = document.querySelector(".copy-text");
copyText.querySelector("button").addEventListener("click", function () {
  let input = document.getElementById("payment-detail");
  input.select();
  document.execCommand("copy");
  copyText.classList.add("active");
  window.getSelection().removeAllRanges();
  setTimeout(function () {
    copyText.classList.remove("active");
  }, 2500);
});

let url = "./seats.svg";
d3.svg(url).then((xml) => {
  let width = parseInt(d3.select("body").style("width"));
  let height = parseInt(d3.select("body").style("height"));

  document
    .querySelector("#map")
    .appendChild(xml.documentElement.cloneNode(true));
  document
    .querySelector("#minimap")
    .appendChild(xml.documentElement.cloneNode(true));

  let minimapsize = 200;

  var w = window.innerWidth;
  if (w < 700) {
    minimapsize = 140;
  }
  const summerPalm = document.querySelector("g");
  summerPalm.addEventListener("click", showBox);
  let map = d3.select("#map").select("svg");
  let minimap = d3
    .select("#minimap")
    .select("svg")
    .attr("width", minimapsize)
    .attr("height", minimapsize);

  let minimapRect = minimap.append("rect").attr("id", "minimapRect");

  let transform = d3.zoomIdentity.translate(-375, -500).scale(2);
  let zoom = d3.zoom().scaleExtent([1, 3]).on("zoom", zoomed);

  map.call(zoom).call(zoom.transform, transform);

  function zoomed() {
    let transform = d3.event.transform;
    let modifiedTransform = d3.zoomIdentity
      .scale(1 / transform.k)
      .translate(-transform.x, -transform.y);

    let mapMainContainer = map
      .select("#main_container")
      .attr("transform", transform);

    minimapRect
      .attr("width", mapMainContainer.node().getBBox().width)
      .attr("height", mapMainContainer.node().getBBox().height)
      .attr("stroke", "red")
      .attr("stroke-width", 10 / modifiedTransform.k)
      .attr("stroke-dasharray", 10 / modifiedTransform.k)
      .attr("fill", "none")
      .attr("transform", modifiedTransform);
  }
});

/* Calculate Cart Total */
