// js/auth.js
import { supabase } from "./supabaseClient.js";

const navLogin = document.getElementById("navLogin");
const navRegister = document.getElementById("navRegister");
const navCreate = document.getElementById("navCreate");
const navLogout = document.getElementById("navLogout");
const navUser = document.getElementById("navUser");

function show(el) {
  if (!el) return;
  el.hidden = false;
}

function hide(el) {
  if (!el) return;
  el.hidden = true;
}

async function updateNavbar() {
  const { data } = await supabase.auth.getSession();
  const session = data?.session;

  if (session?.user) {
    //  logged in
    hide(navLogin);
    hide(navRegister);
    show(navCreate);
    show(navLogout);
    show(navUser);

    navUser.textContent = session.user.email || "";
  } else {
    //  logged out
    show(navLogin);
    show(navRegister);
    hide(navCreate);
    hide(navLogout);
    hide(navUser);

    if (navUser) navUser.textContent = "";
  }
}

if (navLogout) {
  navLogout.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "./index.html";
  });
}

// Run once
updateNavbar();

// Update automatically on login/logout
supabase.auth.onAuthStateChange(() => {
  updateNavbar();
});
