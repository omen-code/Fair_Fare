# FairFare - Ride Comparison App

## Setup Instructions

1. Get a Google Maps API Key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Directions API
   - Create credentials (API key)
   - Add restrictions to your API key (HTTP referrers)

2. Configure Environment Variables:
   - Copy `.env` file and rename it to `.env.local`
   - Replace `your_google_maps_api_key_here` with your actual Google Maps API key

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Features
- Compare ride prices across Uber, Ola, and Rapido
- Real-time location search with Google Places API
- Interactive map with route visualization
- User authentication
- Ride history tracking
- Digital wallet
- Saved locations