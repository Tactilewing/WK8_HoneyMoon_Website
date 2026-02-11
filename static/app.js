// Initialize Supabase client
const client = supabase.createClient(
    "https://tauhvazmkwoknexyeqfh.supabase.co",
    "sb-publishable-cPbUr91fgcyXr0R6m34W5w_RVk-wF2O"
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
    const { data } = await client.auth.getSession();

    const navItem = document.querySelector("#authNavItem");
    if (!navItem) return;

    if (data.session) {
        // User is logged in — replace Login with icon
        navItem.innerHTML = `
            <a href="#" onclick="logout()" title="Logout" class="user-icon">👤</a>
        `;
    } else {
        // User is logged out — show Login
        navItem.innerHTML = `<a href="login.html">Login</a>`;
    }
}

updateNavbar();
