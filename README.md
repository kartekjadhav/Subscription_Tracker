# Subscription Tracker

A Node.js/Express API for managing and tracking user subscriptions, sending renewal reminders, and handling user authentication. Built with MongoDB, Mongoose, and integrates with Upstash Workflow and Arcjet for advanced features.

## Features
- User authentication (sign up, sign in, sign out)
- Manage subscriptions (CRUD)
- Track upcoming renewals
- Automated email reminders before subscription renewals
- User management
- Security and rate limiting with Arcjet

## Tech Stack
- Node.js, Express.js
- MongoDB, Mongoose
- Upstash Workflow (reminders)
- Arcjet (security, rate limiting)
- Nodemailer (email reminders)
- Day.js (date handling)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env.development.local` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
ARCJET_KEY=your_arcjet_key
QSTASH_TOKEN=your_qstash_token
QSTASH_URL=your_qstash_url
SERVER_URL=http://localhost:3000
EMAIL_PASSWORD=your_email_app_password
```

> **Note:** Never commit your real `.env` files. See `.gitignore` for ignored patterns.

### Running the App
- Development: `npm run dev`
- Production: `npm start`

## API Endpoints

### Auth
- `POST /api/v1/auth/sign-up` — Register a new user
- `POST /api/v1/auth/sign-in` — Login
- `POST /api/v1/auth/sign-out` — Logout

### Users
- `GET /api/v1/users/` — List all users (auth required)
- `GET /api/v1/users/:id` — Get user by ID (auth required)

### Subscriptions
- `GET /api/v1/subscriptions/` — List all subscriptions
- `GET /api/v1/subscriptions/:id` — Get subscription by ID
- `POST /api/v1/subscriptions/` — Create a subscription (auth required)
- `PUT /api/v1/subscriptions/:id` — Update a subscription
- `DELETE /api/v1/subscriptions/:id` — Delete a subscription
- `GET /api/v1/subscriptions/user/:id` — Get subscriptions for a user (auth required)
- `PUT /api/v1/subscriptions/:id/cancel` — Cancel a subscription
- `GET /api/v1/subscriptions/upcoming-renewal` — Get upcoming renewals

### Workflows
- `POST /api/v1/workflows/subscription/reminder` — Trigger subscription renewal reminders

## Data Models

### User
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required)

### Subscription
- `name`: String (required)
- `price`: Number (required)
- `currency`: String (USD, INR, EUR, GBP; default: INR)
- `frequency`: String (daily, weekly, monthly, yearly)
- `category`: String (news, entertainment, lifestyle, finance, technology, shopping, others)
- `status`: String (active, cancelled, expired; default: active)
- `paymentMethod`: String (required)
- `user`: ObjectId (User reference, required)
- `startDate`: Date (required)
- `renewalDate`: Date

## Reminder Workflow
- Automated reminders are sent at 10, 7, 5, 3, and 1 day(s) before renewal.
- Uses Upstash Workflow and Nodemailer for scheduling and sending emails.

## Security
- Arcjet middleware for bot detection, rate limiting, and attack protection.

## License
ISC

---

*For any issues or contributions, please open an issue or pull request.* 