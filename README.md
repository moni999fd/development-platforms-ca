# News Platform (Supabase)

A simple news platform where users can browse news articles and authenticated users can publish and delete their own articles.

This project was built as part of the **Development Platforms** course assignment.

---

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript (ES Modules)
- Supabase (Authentication, Database, Row Level Security)

---

## Installation & Running the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/moni999fd/development-platforms-ca.git
   ```
2. Open the project folder in VS Code.
3. Run the project using Live Server or another local development server.

---

## Supabase Configuration

This project uses Supabase.

Update the file below with your own project credentials:

```js
export const supabase = createClient(
  "YOUR_SUPABASE_PROJECT_URL",
  "YOUR_SUPABASE_ANON_KEY",
);
```

---

### Supabase features used:

Email/password authentication with email confirmation

PostgreSQL database

Row Level Security (RLS)

---

## Features

### Public Access

Anyone can view all published news articles

Articles display:

Title

Body preview

Category

Submission date

---

### Authentication

User registration with email and password

User login

Email confirmation required

---

### Article Management

Only authenticated users can create articles

Articles are automatically linked to the logged-in user

Users can delete only their own articles

Create Article page is protected (redirects if not logged in)

---

### UI & UX

Responsive design (mobile & desktop)

Navigation updates based on authentication state

Error and success messages shown in the UI

---

## Motivation

I chose the Supabase option because I wanted to build a complete full-stack application without creating a custom backend API. I enjoyed working with Supabase authentication and Row Level Security, because it made managing permissions much easier.

The most challenging part of the project was configuring authentication correctly and debugging file paths and module loading during development. However, this also helped me better understand how modern frontend applications interact with cloud-based backend services.

Using Supabase is very effective for fast development, while a custom API provides more flexibility and control. For this project, Supabase was a great choice.

---

## AI Usage

AI tools were used during this project as a learning resource to explain concepts, debug issues, and help structure the application. All code was reviewed, tested, and understood by me. AI was not used to blindly generate code without comprehension.

