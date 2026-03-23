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

// Form submit -> mailto
const fakeBtn    = document.getElementById("fakeSubmitBtn");
const formStatus = document.getElementById("formStatus");

if (fakeBtn) {
  fakeBtn.addEventListener("click", () => {
    const name    = (document.getElementById("cfName")    || {}).value || "";
    const email   = (document.getElementById("cfEmail")   || {}).value || "";
    const company = (document.getElementById("cfCompany") || {}).value || "";
    const message = (document.getElementById("cfMessage") || {}).value || "";

    if (!name || !email) {
      if (formStatus) {
        formStatus.textContent = "Bitte Name und E-Mail ausfuellen.";
        formStatus.style.color = "#ff6b6b";
      }
      return;
    }

    const subject = encodeURIComponent("Lokal KI Studio - Demo-Anfrage von " + name);
    const body    = encodeURIComponent(
      "Name: " + name + "\n" +
      "E-Mail: " + email + "\n" +
      "Firma/Branche: " + company + "\n" +
      "Interesse: " + message + "\n\n" +
      "---\nGesendet ueber: lokalkistudio.de"
    );

    window.location.href =
      "mailto:studiom360@t-online.de?subject=" + subject + "&body=" + body;

    if (formStatus) {
      formStatus.textContent =
        "Danke! Ihre E-Mail-App oeffnet sich. Wir melden uns innerhalb von 24h.";
      formStatus.style.color    = "var(--neon-500)";
      formStatus.style.textShadow = "var(--neon-glow)";
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
