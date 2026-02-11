// Destination Recommendation Engine
document.getElementById("recommendBtn").addEventListener("click", () => {
    const climate = document.getElementById("climate").value;
    const activity = document.getElementById("activity").value;

    let destination = "";

    if (climate === "tropical" && activity === "relaxation") {
        destination = "Maldives — Overwater villas, turquoise lagoons, and pure serenity.";
    } else if (climate === "tropical" && activity === "adventure") {
        destination = "Bali — Waterfalls, volcano hikes, and vibrant culture.";
    } else if (climate === "mild" && activity === "culture") {
        destination = "Kyoto — Temples, gardens, and peaceful traditional charm.";
    } else if (climate === "cold" && activity === "relaxation") {
        destination = "Iceland — Hot springs, cosy lodges, and breathtaking landscapes.";
    } else {
        destination = "Seychelles — A perfect blend of beaches, nature, and romance.";
    }

    const resultBox = document.getElementById("recommendationResult");
    resultBox.hidden = false;
    resultBox.textContent = destination;
});

// Itinerary Planner
document.getElementById("addItemBtn").addEventListener("click", () => {
    const itemText = document.getElementById("itineraryItem").value.trim();
    if (!itemText) return;

    const li = document.createElement("li");
    li.innerHTML = `${itemText} <button class="removeBtn">Remove</button>`;

    document.getElementById("itineraryList").appendChild(li);
    document.getElementById("itineraryItem").value = "";

    li.querySelector(".removeBtn").addEventListener("click", () => {
        li.remove();
    });
});
