// js/authState.js
import { supabase } from "./supabaseClient.js";

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function protectPage() {
  // Call this on pages that REQUIRE login (create article page)
  supabase.auth.getSession().then(({ data }) => {
    if (!data.session) {
      window.location.href = "./login.html";
    }
  });
}
