// Lokal KI Studio - MIT License

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const el = document.querySelector(targetId);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
    mobileCloseMenu();
  });
});

// Web3Forms submit
const demoForm = document.getElementById("demo-form");
const formStatus = document.getElementById("formStatus");

if (demoForm) {
  demoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = (document.getElementById("cfName") || {}).value?.trim() || "";
    const email = (document.getElementById("cfEmail") || {}).value?.trim() || "";

    if (!name || !email) {
      if (formStatus) {
        formStatus.textContent = "Bitte Name und E-Mail ausfuellen.";
        formStatus.style.color = "#ff6b6b";
        formStatus.style.textShadow = "none";
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = "Anfrage wird gesendet ...";
      formStatus.style.color = "var(--text-300)";
      formStatus.style.textShadow = "none";
    }

    const submitButton = demoForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    try {
      const formData = new FormData(demoForm);
      const payload = Object.fromEntries(formData.entries());

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (formStatus) {
          formStatus.textContent = "Danke! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24h.";
          formStatus.style.color = "var(--neon-500)";
          formStatus.style.textShadow = "var(--neon-glow)";
        }
        demoForm.reset();
      } else {
        throw new Error(result.message || "Senden fehlgeschlagen.");
      }
    } catch (error) {
      console.error(error);
      if (formStatus) {
        formStatus.textContent = "Fehler beim Senden. Bitte pruefen Sie Ihre Eingaben oder schreiben Sie direkt an lokal-ki-studio@t-online.de.";
        formStatus.style.color = "#ff6b6b";
        formStatus.style.textShadow = "none";
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

// Mobile nav
const burgerBtn    = document.getElementById("burgerBtn");
const mobileMenu   = document.getElementById("mobileMenu");
const mobileCloseBtn = document.getElementById("mobileClose");

function mobileOpenMenu()  { if(mobileMenu){ mobileMenu.classList.add("active");    document.body.style.overflow = "hidden"; } }
function mobileCloseMenu() { if(mobileMenu){ mobileMenu.classList.remove("active"); document.body.style.overflow = ""; } }

if (burgerBtn) burgerBtn.addEventListener("click", mobileOpenMenu);
if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", mobileCloseMenu);
