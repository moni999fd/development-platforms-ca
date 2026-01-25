// js/ui.js
import { supabase } from "./supabaseClient.js";
import { signOut } from "./authState.js";

const navLogin = document.getElementById("navLogin");
const navRegister = document.getElementById("navRegister");
const navCreate = document.getElementById("navCreate");
const navLogout = document.getElementById("navLogout");
const navUser = document.getElementById("navUser");

function setLoggedOutUI() {
  navLogin?.classList.remove("hidden");
  navRegister?.classList.remove("hidden");
  navCreate?.classList.add("hidden");
  navLogout?.classList.add("hidden");
  navUser?.classList.add("hidden");
  if (navUser) navUser.textContent = "";
}

function setLoggedInUI(email) {
  navLogin?.classList.add("hidden");
  navRegister?.classList.add("hidden");
  navCreate?.classList.remove("hidden");
  navLogout?.classList.remove("hidden");
  navUser?.classList.remove("hidden");
  if (navUser) navUser.textContent = email || "Logged in";
}

async function refreshUI() {
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (!session) {
    setLoggedOutUI();
    return;
  }

  setLoggedInUI(session.user.email);
}

navLogout?.addEventListener("click", async () => {
  await signOut();
  setLoggedOutUI();
  window.location.href = "./index.html";
});

// Update UI now + whenever auth changes
refreshUI();
supabase.auth.onAuthStateChange(() => refreshUI());
