let currentMode = "";

function fadeIn(el) {
  el.style.display = "block";
  setTimeout(() => el.classList.add("show"), 10); // delay for transition
}

function fadeOut(el) {
  el.classList.remove("show");
  setTimeout(() => el.style.display = "none", 400); // match CSS transition
}

function showBox(mode) {
  currentMode = mode;
  document.getElementById("choice").style.display = "none";
  document.getElementById("animation").style.display = "none";

  const box = document.getElementById("box");
  fadeIn(box);   

  const btn = document.getElementById("mainBtn");
  if (mode === "encrypt") {
    btn.innerText = "Encrypt";
    btn.onclick = encryptText;
  } else {
    btn.innerText = "Decrypt";
    btn.onclick = decryptText;
  }

  document.getElementById("inputSection").style.display = "block";
  document.getElementById("resultSection").style.display = "none";
}

function encryptText() {
  let text = document.getElementById("input").value.trim();
  if (text === "") return;

  let bits = [];
  for (let ch of text) {
    if (/[a-z]/.test(ch)) {
      let pos = ch.charCodeAt(0) - 96;
      bits.push("00" + pos.toString(2).padStart(5, "0"));
    } else if (/[A-Z]/.test(ch)) {
      let pos = ch.charCodeAt(0) - 64;
      bits.push("11" + pos.toString(2).padStart(5, "0"));
    } else if (/[0-9]/.test(ch)) {
      bits.push("01" + parseInt(ch).toString(2).padStart(4, "0"));
    } else {
      bits.push("10" + ch.charCodeAt(0).toString(2).padStart(8, "0"));
    }
  }

  document.getElementById("output").value = bits.join("");
  document.getElementById("inputSection").style.display = "none";
  document.getElementById("resultSection").style.display = "block";
}

function decryptText() {
  let bin = document.getElementById("input").value.trim();
  if (bin === "") return;

  let i = 0, out = [];
  while (i < bin.length) {
    let t = bin.slice(i, i+2); i += 2;
    if (t === "00") {
      let chunk = bin.slice(i, i+5); i += 5;
      out.push(String.fromCharCode(96 + parseInt(chunk, 2)));
    } else if (t === "11") {
      let chunk = bin.slice(i, i+5); i += 5;
      out.push(String.fromCharCode(64 + parseInt(chunk, 2)));
    } else if (t === "01") {
      let chunk = bin.slice(i, i+4); i += 4;
      out.push(parseInt(chunk, 2).toString());
    } else if (t === "10") {
      let chunk = bin.slice(i, i+8); i += 8;
      out.push(String.fromCharCode(parseInt(chunk, 2)));
    } else {
      out.push("?");
      break;
    }
  }

  document.getElementById("output").value = out.join("");
  document.getElementById("inputSection").style.display = "none";
  document.getElementById("resultSection").style.display = "block";
}

function goBack() {
  const box = document.getElementById("box");
  fadeOut(box);

  document.getElementById("input").value = "";
  document.getElementById("output").value = "";

  setTimeout(() => {
    document.getElementById("choice").style.display = "block";
    document.getElementById("animation").style.display = "block";
  }, 400);
}