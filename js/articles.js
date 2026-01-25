// js/articles.js
import { supabase } from "./supabaseClient.js";

const articlesEl = document.getElementById("articles");
if (!articlesEl) {
  console.warn("No #articles element found on this page");
} else {
  init();
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, (m) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
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

async function init() {
  // Get current user (for showing delete buttons)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await loadArticles(user);
}

async function loadArticles(user) {
  articlesEl.innerHTML = `<p class="muted">Loading articles…</p>`;

  const { data, error } = await supabase
    .from("articles")
    .select("id, title, body, category, created_at, submitted_by")
    .order("created_at", { ascending: false });

  if (error) {
    articlesEl.innerHTML = `
      <div class="card">
        <p class="notice bad">Could not load articles.</p>
        <pre class="muted">${escapeHtml(error.message)}</pre>
      </div>
    `;
    return;
  }

  if (!data || data.length === 0) {
    articlesEl.innerHTML = `
      <div class="card">
        <p class="muted">No articles yet. Create the first one ✨</p>
      </div>
    `;
    return;
  }

  articlesEl.innerHTML = data
    .map((a) => {
      const title = a.title ?? "";
      const category = a.category ?? "Uncategorized";
      const bodyText = a.body ?? ""; //  prevents crash if body is null
      const preview =
        bodyText.length > 200 ? bodyText.slice(0, 200) + "…" : bodyText;

      const isOwner = user?.id && a.submitted_by === user.id;

      return `
        <article class="article-card">
          <div class="article-meta">
            <div class="meta">
              <span class="badge">${escapeHtml(category)}</span>
              <span class="muted">${escapeHtml(formatDate(a.created_at))}</span>
            </div>

            ${
              isOwner
                ? `<button class="btn btn-danger" data-delete-id="${escapeHtml(
                    a.id
                  )}">Delete</button>`
                : ""
            }
          </div>

          <h3 class="article-title">${escapeHtml(title)}</h3>
          <p class="excerpt">${escapeHtml(preview)}</p>
        </article>
      `;
    })
    .join("");

  // Wire delete buttons (only those rendered)
  articlesEl.querySelectorAll("[data-delete-id]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-delete-id");
      const ok = confirm("Delete this article?");
      if (!ok) return;

      btn.disabled = true;
      btn.textContent = "Deleting…";

      const { error } = await supabase.from("articles").delete().eq("id", id);

      if (error) {
        alert(error.message);
        btn.disabled = false;
        btn.textContent = "Delete";
        return;
      }

      // Reload list after delete
      const {
        data: { user },
      } = await supabase.auth.getUser();
      await loadArticles(user);
    });
  });
}
