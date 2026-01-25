import { supabase } from "./supabaseClient.js";

//  Protect page (must be logged in)
const {
  data: { user },
  error: userError,
} = await supabase.auth.getUser();

if (userError) {
  console.log(userError);
}

if (!user) {
  window.location.assign("./login.html");
  throw new Error("Not logged in");
}

const form = document.getElementById("articleForm");
const messageEl = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageEl.textContent = "Publishing…";

  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const category = document.getElementById("category").value.trim();

  if (!title || !body || !category) {
    messageEl.textContent = "Please fill in all fields.";
    return;
  }

  const { data, error } = await supabase
    .from("articles")
    .insert([
      {
        title,
        body,
        category,
        submitted_by: user.id,
      },
    ])
    .select(); //  gives us back the inserted row

  if (error) {
    messageEl.textContent = error.message;
    console.log("Insert error:", error);
    return;
  }

  console.log("Inserted:", data);
  messageEl.textContent = "Article published 🎉 Redirecting…";

  //  Give the message a tiny moment, then redirect
  setTimeout(() => {
    window.location.assign("./index.html");
  }, 600);
});
