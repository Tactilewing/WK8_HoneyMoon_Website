// Initialize Supabase client
const client = supabase.createClient(
    "https://tauhvazmkwoknexyeqfh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhdWh2YXpta3dva25leHllcWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjA0MTUsImV4cCI6MjA4NjM5NjQxNX0.EnsEA5jbMYKNvwqGYD3t4q2AnOvwxCWtbUCvKVHafk8"
);

// =========================
// SIGNUP
// =========================
async function handleSignup(event) {
    event.preventDefault();

    const name = document.querySelector("#name")?.value;
    const email = document.querySelector("#email")?.value;
    const password = document.querySelector("#password")?.value;

    const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: name }
        }
    });

    if (error) {
        alert("Signup failed: " + error.message);
        return;
    }

    alert("Signup successful! Redirecting...");
    window.location.href = "index.html";
}

// =========================
// LOGIN
// =========================
async function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector("#email")?.value;
    const password = document.querySelector("#password")?.value;

    const { data, error } = await client.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Login failed: " + error.message);
        return;
    }

    alert("Login successful!");
    window.location.href = "index.html";
}

// =========================
// LOGOUT
// =========================
async function logout() {
    await client.auth.signOut();
    window.location.href = "login.html";
}

// Attach handlers if forms exist on the page
document.querySelector("#signupForm")?.addEventListener("submit", handleSignup);
document.querySelector("#loginForm")?.addEventListener("submit", handleLogin);


// =========================
// UPDATE NAVBAR BASED ON LOGIN STATE
// =========================
async function updateNavbar() {
    const sessionResponse = await client.auth.getSession();
    console.log("SESSION CHECK:", sessionResponse.data.session);

    const navItem = document.querySelector("#authNavItem");
    if (!navItem) return;

    if (sessionResponse.data.session) {
        navItem.innerHTML = `
            <div class="profile-menu">
                <span class="user-icon">👤</span>
                <div class="dropdown hidden">
                    <a href="#" id="profileBtn">Profile</a>
                    <a href="#" onclick="logout()">Logout</a>
                </div>
            </div>
        `;

        const icon = navItem.querySelector(".user-icon");
        const dropdown = navItem.querySelector(".dropdown");

        icon.addEventListener("click", () => {
            dropdown.classList.toggle("hidden");
        });

    } else {
        navItem.innerHTML = `<a href="login.html">Login</a>`;
    }
}

document.addEventListener("DOMContentLoaded", updateNavbar);


