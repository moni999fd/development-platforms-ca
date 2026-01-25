import { supabase } from "./supabaseClient.js";

const el = document.getElementById("articleDetails");

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (m) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return map[m];
  });
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso || "";
  }
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  el.innerHTML = `<p class="error">Missing article id.</p>`;
} else {
  loadArticle(id);
}

async function loadArticle(articleId) {
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, body, category, created_at")
    .eq("id", articleId)
    .single();

  if (error || !data) {
    el.innerHTML = `
      <p class="error">Could not load article.</p>
      <p class="muted">${escapeHtml(error?.message || "")}</p>
    `;
    return;
  }

  el.innerHTML = `
    <h1 style="margin:0 0 10px 0;">${escapeHtml(data.title)}</h1>
    <p class="muted" style="margin:0 0 16px 0;">
      ${escapeHtml(data.category)} • ${escapeHtml(formatDate(data.created_at))}
    </p>
    <p style="margin:0; white-space:pre-wrap;">${escapeHtml(data.body)}</p>
  `;
}
