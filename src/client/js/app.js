export const handleSubmit = async (event) => {
    event.preventDefault();

    const city = document.getElementById("location").value;
    const date = document.getElementById("departure-date").value;

    if (!city || !date) {
        alert("Please enter a destination and date.");
        return;
    }

    try {
        const locationResponse = await fetch("http://localhost:8000/getLocation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city }),
        });
        const locationData = await locationResponse.json();
        const { latitude, longitude, country } = locationData;

        const weatherResponse = await fetch("http://localhost:8000/getWeather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude, date }),
        });
        const weatherData = await weatherResponse.json();

        const imageResponse = await fetch("http://localhost:8000/getImage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city }),
        });
        const imageData = await imageResponse.json();

        updateUI(city, country, date, weatherData, imageData.imageUrl);
        saveTrip(city, country, date, weatherData, imageData.imageUrl);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const updateUI = (city, country, date, weatherData, imageUrl) => {
    document.getElementById("trip-info").innerHTML = `
        <h2>Trip to ${city}, ${country}</h2>
        <p>Departure Date: ${date}</p>
        <p>Temperature: ${weatherData.data[0].temp}°C</p>
        <p>Weather: ${weatherData.data[0].weather.description}</p>
        <img src="${imageUrl}" alt="${city}" width="400">
    `;
};

const saveTrip = (city, country, date, weatherData, imageUrl) => {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.push({ city, country, date, weatherData, imageUrl });
    localStorage.setItem("trips", JSON.stringify(trips));
    loadSavedTrips();
};

const loadSavedTrips = () => {
    const trips = JSON.parse(localStorage.getItem("trips")) || [];
    const tripsContainer = document.getElementById("saved-trips");
    tripsContainer.innerHTML = "";

    trips.forEach((trip, index) => {
        const tripElement = document.createElement("div");
        tripElement.classList.add("trip");
        tripElement.innerHTML = `
            <h3>${trip.city}, ${trip.country}</h3>
            <p>Departure: ${trip.date}</p>
            <p>Weather: ${trip.weatherData.data[0].weather.description} (${trip.weatherData.data[0].temp}°C)</p>
            <img src="${trip.imageUrl}" width="200">
            <button onclick="removeTrip(${index})">Remove</button>
        `;
        tripsContainer.appendChild(tripElement);
    });
};

const removeTrip = (index) => {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.splice(index, 1);
    localStorage.setItem("trips", JSON.stringify(trips));
    loadSavedTrips();
};
window.removeTrip = (index) => {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.splice(index, 1);
    localStorage.setItem("trips", JSON.stringify(trips));
    loadSavedTrips();
};

document.getElementById("travel-form").addEventListener("submit", handleSubmit);
document.addEventListener("DOMContentLoaded", loadSavedTrips);
