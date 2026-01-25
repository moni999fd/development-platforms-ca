import { supabase } from "./supabaseClient.js";

const form = document.getElementById("loginForm");
const msg = document.getElementById("message");

function setMessage(text, type = "info") {
  if (!msg) return;
  msg.textContent = text;
  msg.className = `message ${type}`;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMessage("Logging in…", "info");

  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    setMessage("Logged in ✅", "success");
    window.location.href = "./index.html";
  } catch (err) {
    setMessage(err?.message || "Login failed. Try again.", "error");
  }
});
