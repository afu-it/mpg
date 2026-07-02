// Gates the apply section on /contribute behind Clerk sign-in and builds the
// prefilled application email. Clerk itself is loaded globally by auth.ts;
// this script only reads its state. The recipient address is assembled at
// click time to keep it out of the static HTML for scrapers.

const gate = document.getElementById("apply-gate");
const form = document.getElementById("apply-form") as HTMLFormElement | null;
const emailNote = document.getElementById("apply-email");

function render(clerk: any) {
  const signedIn = !!clerk.user;
  if (gate) gate.hidden = signedIn;
  if (form) form.hidden = !signedIn;
  if (emailNote)
    emailNote.textContent = signedIn
      ? (clerk.user.primaryEmailAddress?.emailAddress ?? "")
      : "";
}

const poll = setInterval(() => {
  const clerk = (window as any).Clerk;
  if (clerk?.loaded) {
    clearInterval(poll);
    render(clerk);
    clerk.addListener(() => render(clerk));
  }
}, 300);
setTimeout(() => clearInterval(poll), 20000);

document.getElementById("apply-signup")?.addEventListener("click", () => {
  (window as any).Clerk?.openSignUp?.({
    afterSignUpUrl: "/contribute",
    afterSignInUrl: "/contribute",
  });
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const github = String(data.get("github") ?? "").trim();
  const area = String(data.get("area") ?? "");
  const message = String(data.get("message") ?? "").trim();
  const email =
    (window as any).Clerk?.user?.primaryEmailAddress?.emailAddress ?? "";

  const to = ["afuitdev", "gmail.com"].join("@");
  const subject = "MPG contributor application";
  const body = [
    `GitHub username: ${github}`,
    `Contribution area: ${area}`,
    `Signed-in email: ${email}`,
    "",
    message,
  ].join("\n");

  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
