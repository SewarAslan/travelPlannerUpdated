# Travel Planner App

## 📌 Project Overview
This Travel Planner App allows users to:
- Enter a **destination & departure date**.
- Get **real-time weather** and **forecast data**.
- View an **image of the destination**.
- **Save trip details** and view them later.

## 🚀 Technologies Used
- **Frontend:** JavaScript, Webpack, SCSS
- **Backend:** Node.js, Express.js
- **APIs Used:** 
  - 🌍 **GeoNames API** → Get coordinates based on city.
  - ☁️ **Weatherbit API** → Get current & future weather.
  - 📷 **Pixabay API** → Fetch images for the location.

## 🔧 Prerequisites
- Ensure you have **Node.js 18+** installed.  
  Check your version using:
  ```bash
  node -v


## 📜 Installation & Usage
### 1️⃣ Clone the repository:
```bash
git clone https://github.com/SewarAslan/travelPlanner.git
cd travel-planner
2️⃣ Install dependencies:

npm install
3️⃣ Set up .env file with your API keys:

GEONAMES_USERNAME=your_username
WEATHERBIT_API_KEY=your_api_key
PIXABAY_API_KEY=your_api_key
4️⃣ Run the project:
*Development Mode (Live Reload)*
npm run dev
*Production Build*
npm run build
npm start

🎯 Features Implemented
✔️ City search & weather forecast
✔️ Trip countdown
✔️ Image fetching for the city
✔️ Offline mode (Service Workers)
✔️ LocalStorage for saving trips
✔️ Fully responsive UI


👋 Developed by Sewar Aslan | 📧 sewaraslan02@gmail.com
