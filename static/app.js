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

    // Inputs
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const confirmPassword = document.querySelector("#confirmPassword").value.trim();

    // Error elements
    const nameError = document.querySelector("#nameError");
    const emailError = document.querySelector("#emailError");
    const passwordError = document.querySelector("#passwordError");
    const confirmError = document.querySelector("#confirmError");

    // Reset errors
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";

    let valid = true;

    // Name validation
    if (!name) {
        nameError.textContent = "Please enter your name.";
        valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
    }

    // Password validation
    const passwordRules = [
        { test: password.length >= 8, msg: "At least 8 characters" },
        { test: /[A-Z]/.test(password), msg: "At least one uppercase letter" },
        { test: /[a-z]/.test(password), msg: "At least one lowercase letter" },
        { test: /[0-9]/.test(password), msg: "At least one number" },
        { test: /[^A-Za-z0-9]/.test(password), msg: "At least one symbol" }
    ];

    const failedRules = passwordRules.filter(r => !r.test);

    if (failedRules.length > 0) {
        passwordError.textContent = "Password must include: " + failedRules.map(r => r.msg).join(", ");
        valid = false;
    }

    // Confirm password
    if (password !== confirmPassword) {
        confirmError.textContent = "Passwords do not match.";
        valid = false;
    }

    if (!valid) return;

    // Create user
    const { error } = await client.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: name }
        }
    });

    if (error) {
        emailError.textContent = error.message;
        return;
    }

    alert("Signup successful!");
    window.location.href = "index.html";
}


// =========================
// LOGIN
// =========================
async function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    const emailError = document.querySelector("#emailError");
    const passwordError = document.querySelector("#passwordError");

    emailError.textContent = "";
    passwordError.textContent = "";

    let valid = true;

    if (!email.includes("@") || !email.includes(".")) {
        emailError.textContent = "Please enter a valid email.";
        valid = false;
    }

    if (!password) {
        passwordError.textContent = "Please enter your password.";
        valid = false;
    }

    if (!valid) return;

    const { error } = await client.auth.signInWithPassword({ email, password });

    if (error) {
        passwordError.textContent = "Incorrect email or password.";
        return;
    }

    window.location.href = "index.html";
}



// =========================
// LOGOUT
// =========================
async function logout() {
    await client.auth.signOut();
    window.location.href = "login.html";
}

// =========================
// RECOMMENDATION ENGINE
// =========================
function handleRecommendation() {
    const climate = document.querySelector("#climate").value;
    const activity = document.querySelector("#activity").value;
    const resultBox = document.querySelector("#recommendationResult");

    let recommendation = "";

    if (climate === "tropical" && activity === "relaxation") {
        recommendation = "We recommend the Maldives — perfect beaches and luxury resorts.";
    } else if (climate === "mild" && activity === "culture") {
        recommendation = "We recommend Kyoto — serene temples and beautiful gardens.";
    } else if (climate === "cold" && activity === "adventure") {
        recommendation = "We recommend Iceland — glaciers, waterfalls, and northern lights.";
    } else {
        recommendation = "We recommend Bali — a perfect all‑round honeymoon destination.";
    }

    resultBox.textContent = recommendation;
    resultBox.hidden = false;
}

// =========================
// ITINERARY PLANNER
// =========================
function addItineraryItem() {
    const input = document.querySelector("#itineraryItem");
    const list = document.querySelector("#itineraryList");

    if (!input.value.trim()) return;

    const li = document.createElement("li");
    li.textContent = input.value;
    list.appendChild(li);

    input.value = "";
}

// =========================
// NAVBAR LOGIN STATE
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

// =========================
// INITIALIZE EVERYTHING
// =========================
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // SIGNUP FORM
    // =========================
    document.querySelector("#signupForm")?.addEventListener("submit", handleSignup);

    // Real-time password strength check
    document.querySelector("#password")?.addEventListener("input", () => {
        const password = document.querySelector("#password").value;
        const passwordError = document.querySelector("#passwordError");

        const strong =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);

        passwordError.textContent = strong ? "" : "Password is still too weak.";
    });

    // Show/hide password toggle
    document.querySelector("#togglePassword")?.addEventListener("click", () => {
        const input = document.querySelector("#password");
        input.type = input.type === "password" ? "text" : "password";
    });


    // =========================
    // LOGIN FORM
    // =========================
    document.querySelector("#loginForm")?.addEventListener("submit", handleLogin);


    // =========================
    // RECOMMENDATION ENGINE
    // =========================
    document.querySelector("#recommendBtn")?.addEventListener("click", handleRecommendation);


    // =========================
    // ITINERARY PLANNER
    // =========================
    document.querySelector("#addItemBtn")?.addEventListener("click", addItineraryItem);


    // =========================
    // NAVBAR LOGIN STATE
    // =========================
    updateNavbar();
});

