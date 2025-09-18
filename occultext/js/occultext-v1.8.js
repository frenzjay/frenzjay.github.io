document.addEventListener("DOMContentLoaded", function() {
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
    const toggleToGenerateBtn = document.getElementById('toggle-to-generate');
    const toggleToDecryptBtn = document.getElementById('toggle-to-decrypt');
    const generateFormContainer = document.getElementById('generate-form-container');
    const decryptFormContainer = document.getElementById('decrypt-form-container');

    toggleToGenerateBtn.addEventListener('click', function() {
        generateFormContainer.style.display = 'block';
        decryptFormContainer.style.display = 'none';
        toggleToGenerateBtn.classList.add('active');
        toggleToDecryptBtn.classList.remove('active');
    });
    toggleToDecryptBtn.addEventListener('click', function() {
        generateFormContainer.style.display = 'none';
        decryptFormContainer.style.display = 'block';
        toggleToGenerateBtn.classList.remove('active');
        toggleToDecryptBtn.classList.add('active');
    });
});
window.onbeforeunload = function(e) {
    localStorage.setItem('scrollpos', window.scrollY);
};
document.getElementById('generate-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    const secretKey = document.getElementById('generate-secret_key').value;
    showLoading();
    fetch('https://frenzvalios.pythonanywhere.com/api/occultext/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word, secret_key: secretKey })
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        if (data.error) {
            displayError(data.error);
        } else {
            displayGenerateResult(data.original_word, data.occultext_word);
            scrollToResults();
        }
    })
    .catch(() => {
        hideLoading();
        displayError('-1 - API error');
    });
});
document.getElementById('decrypt-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const occultext = document.getElementById('occultext').value;
    const secretKey = document.getElementById('decrypt-secret_key').value;
    showLoading();
    fetch(`https://frenzvalios.pythonanywhere.com/api/occultext/decrypt/atlas?occultext=${encodeURIComponent(occultext)}&secret_key=${encodeURIComponent(secretKey)}`)
    .then(response => response.json())
    .then(data => {
        hideLoading();
        if (data.error) {
            displayError(data.error);
        } else {
            displayDecryptResult(data.original_word);
            scrollToResults();
        }
    })
    .catch(() => {
        hideLoading();
        displayError('-1 - API error');
    });
});
function displayGenerateResult(original, occultext) {
    document.getElementById('original-word').textContent = original;
    document.getElementById('occultext-word').textContent = occultext;
    document.getElementById('generate-result').hidden = false;
    document.getElementById('decrypt-result').hidden = true;
    document.getElementById('error-result').hidden = true;
    document.getElementById('results').hidden = false;
}
function displayDecryptResult(decrypted) {
    document.getElementById('decrypted-word').innerHTML = decrypted;
    document.getElementById('decrypt-result').hidden = false;
    document.getElementById('generate-result').hidden = true;
    document.getElementById('error-result').hidden = true;
    document.getElementById('results').hidden = false;
}
function displayError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-result').hidden = false;
    document.getElementById('generate-result').hidden = true;
    document.getElementById('decrypt-result').hidden = true;
    document.getElementById('results').hidden = false;
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}
function scrollToResults() {
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}
function removeSpaces() {
    const occultextTextarea = document.getElementById('occultext');
    let occultext = occultextTextarea.value;

    occultext = occultext.trimEnd();
    occultextTextarea.value = occultext;
}
function removeAllSpaces() {
    const occultextTextarea = document.getElementById('occultext');
    let occultext = occultextTextarea.value;
        occultext = occultext.trimEnd();
        if (occultext.includes('{') && occultext.includes('}')) {
        occultext = occultext.replace(/\s+(?=(?:[^{}]*\{[^{}]*\})*[^{}]*$)/g, function(match) {
            return match.trim() === '' ? '' : ' ';
        });
    }
    occultextTextarea.value = occultext;
}
function clearField(id) {
            const field = document.getElementById(id);
            field.value = "";
            toggleClearButton(id + "-clear", field);
            field.focus();
        }
        function toggleClearButton(btnId, field) {
            const btn = document.getElementById(btnId);
            if (field.value.trim() !== "") {
                btn.style.display = "inline-block";
            } else {
                btn.style.display = "none";
            }
        }
        window.addEventListener("message", (event) => {
            if (event.origin !== "https://frenzjay.github.io/occultext") return;
            if (event.data.type === "resize") {
                document.getElementById("myIframe").style.height = event.data.height + "px";
            }
        });
function showLoading() {
    const loader = document.getElementById('loading');
    loader.classList.add('show');
    document.getElementById('results').hidden = true;
}
function hideLoading() {
    const loader = document.getElementById('loading');
    loader.classList.remove('show');
}
(function () {
  const el = document.getElementById("secret");
  if (!el) return;
  function nextbd(ref = new Date()) {
    let year = ref.getFullYear();
    let target = new Date(year, 9, 5, 0, 0, 0, 0);
    if (target <= ref) target = new Date(year + 1, 9, 5, 0, 0, 0, 0);
    return target;
  }
          let target = nextbd();
  function pad(n) {
    return n.toString().padStart(2, "0");
  }
  function update() {
    const now = new Date();
    let diff = target - now;
    if (diff <= 0) {
      el.textContent = "Secret";
      return;
    }
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    el.textContent = `??? ${days} : ${pad(hours)} : ${pad(minutes)} : ${pad(seconds)} ???`;
  }
  update();
  setInterval(update, 1000);
})();