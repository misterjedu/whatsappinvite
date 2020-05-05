// Get input element

let displayLinks = document.getElementById("links-group");
let shortLinkVal = document.getElementById("short-link");
let longTextVal = document.getElementById("long-text");
let copyText = document.getElementById("copy-text");
let copyLink = document.getElementById("copy-link");
const link = "https://wa.me/2348087362433?text=";
const text = `Get exclusive fun, news, information, entertainment🤸🤸, match-making💑💑, go on dates❤️❤️, frequent gifts and give-aways🛍️🛍️, business ideas🎩🎩, training, skill acquisition and so much more, join thousands of beautiful people on IBTV.

Just click the link, send us your name, and save our contact on your phone. Join now, using this link`;

document
  .getElementById("generate-link")
  .addEventListener("submit", generateLInk);

function generateLInk(e) {
  let inputVal = document.getElementById("your-name").value;
  if (!inputVal) {
    alert("Please, enter your Name or Username");
  } else {
    const text = `Hi, I am interested in joining Ibtv. I was invited by ${inputVal}. My name is ...`;
    const longLink = link + text.replace(/\s/g, "%20");
    shortenUrl(longLink);
    e.preventDefault();
    return longLink;
  }
}

function shortenUrl(url) {
  fetch(" https://rel.ink/api/links/", {
    method: "POST",
    body: JSON.stringify({
      url: url,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (!response) {
        alert("Error Occured. Make sure your internet is on");
      }
      return response.json();
    })
    .then((data) => {
      shortLinkVal.value = `https://rel.ink/${data.hashid}`;
      longTextVal.value = ` ${text}  https://rel.ink/${data.hashid}`;
      displayLinks.style.display = "block";
    })
    .catch((err) => {
      alert("Error Occured. Make sure your internet is on and try again");
    });
}

copyLink.addEventListener("click", (e) => {
  shortLinkVal.select();
  document.execCommand("copy");
  e.preventDefault();
  copyLink.className = "btn btn-primary mt-3";
  copyLink.innerText = "Copied";
});

copyText.addEventListener("click", (e) => {
  longTextVal.select();
  document.execCommand("copy");
  e.preventDefault();
  copyText.className = "btn btn-primary mt-3";
  console.log(copyLink.className);
  copyText.innerText = "Copied";
});
