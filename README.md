# KoinX Backend Internship Assignment

## Description

This project is a server-side application built with **Node.js** and **MongoDB**. It performs the following tasks:
1. **Background Job**: Periodically fetches cryptocurrency data (Bitcoin, Ethereum, Matic) and stores it in the database.
2. **RESTful API**:
   - Retrieve the latest cryptocurrency stats.
   - Calculate the standard deviation of cryptocurrency prices from the last 100 records.
   - Trigger manual fetching of the latest cryptocurrency data.

The application is deployed and available at: [KoinX Backend Assignment](https://koinx-assignment-obe8.onrender.com).

---

## Features

### Task 1: Background Job
- Fetches data (current price in USD, market cap, and 24-hour change) for:
  - Bitcoin
  - Ethereum
  - Matic
- Runs every 2 hours using a cron job.
- Data is fetched from the [CoinGecko API](https://docs.coingecko.com/v3.0.1/reference/introduction).

### Task 2: API Endpoints

1. **Fetch Cryptocurrency Stats**
   - **Endpoint**: `GET /api/stats`
   - **Query Params**:
     ```json
     { "coin": "bitcoin" } // Supported values: "bitcoin", "ethereum", "matic-network"
     ```
   - **Response**:
     ```json
     {
       "price": 40000,
       "marketCap": 800000000,
       "24hChange": 3.4
     }
     ```

2. **Standard Deviation of Prices**
   - **Endpoint**: `GET /api/deviation`
   - **Query Params**:
     ```json
     { "coin": "bitcoin" }
     ```
   - **Response**:
     ```json
     { "deviation": 4082.48 }
     ```

3. **Manual Data Fetch**
   - **Endpoint**: `POST /api/fetch-latest`
   - **Response**:
     ```json
     { "message": "Latest data fetched and stored successfully." }
     ```

---

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or hosted instance)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/koinx-backend-assignment.git
   cd koinx-backend-assignment
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following keys:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     PORT=5000
     COINGECKO_API_KEY=<your-coingecko-api-key>
     ```
4. Start the server:
   ```bash
   node index.js
   ```

---




## API Documentation

### Base URL
```
https://koinx-assignment-obe8.onrender.com/api
```

### Endpoints

#### 1. `/stats`
- **Method**: `GET`
- **Description**: Retrieves the latest cryptocurrency stats.
- **Query Parameters**:
  - `coin` (required): `bitcoin`, `ethereum`, or `matic-network`.
- **Response**:
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

#### 2. `/deviation`
- **Method**: `GET`
- **Description**: Calculates the standard deviation of the price for the last 100 records.
- **Query Parameters**:
  - `coin` (required): `bitcoin`, `ethereum`, or `matic-network`.
- **Response**:
  ```json
  { "deviation": 4082.48 }
  ```

#### 3. `/fetch-latest`
- **Method**: `POST`
- **Description**: Manually triggers fetching of the latest cryptocurrency data.
- **Response**:
  ```json
  { "message": "Latest data fetched and stored successfully." }
  ```

---

## Usage

### Start the Server Locally
```bash
node index.js
```

### Test the APIs
- Use tools like **Postman** or **cURL** to interact with the endpoints.
- Example: Fetching Bitcoin stats:
  ```bash
  curl -X GET "https://koinx-assignment-obe8.onrender.com/api/stats?coin=bitcoin"
  ```

---

## Future Enhancements
- Add user authentication to restrict API access.
- Implement rate limiting for public APIs.
- Extend support for more cryptocurrencies.

---



## Contact
For any questions or suggestions, feel free to reach out to [anzarkhan790@gmail.com].

