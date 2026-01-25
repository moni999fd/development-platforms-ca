import { supabase } from "./supabaseClient.js";

const form = document.getElementById("registerForm");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");
const submitBtn = document.getElementById("submitBtn");

function setLoading(loading) {
  if (!submitBtn) return;
  submitBtn.disabled = loading;
  submitBtn.textContent = loading ? "Creating account…" : "Register";
}

function isNoroffStudentEmail(email) {
  return email.toLowerCase().endsWith("@stud.noroff.no");
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (errorMsg) errorMsg.textContent = "";
  if (successMsg) {
    successMsg.textContent = "";
    successMsg.classList.add("hidden");
  }

  const email = emailEl?.value?.trim() || "";
  const password = passwordEl?.value || "";

  if (!email || !password) {
    if (errorMsg) errorMsg.textContent = "Please enter email and password.";
    return;
  }

  if (!isNoroffStudentEmail(email)) {
    if (errorMsg) errorMsg.textContent = "Email must end with @stud.noroff.no";
    return;
  }

  try {
    setLoading(true);

    // Supabase signup (email confirmation is ON in your settings)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // With email confirmation ON, user must click link in email
    if (successMsg) {
      successMsg.textContent =
        "✅ Account created! Please check your email and confirm your address before logging in.";
      successMsg.classList.remove("hidden");
    }

    form.reset();
  } catch (err) {
    const message = err?.message || "Something went wrong. Please try again.";
    if (errorMsg) errorMsg.textContent = message;
  } finally {
    setLoading(false);
  }
});
