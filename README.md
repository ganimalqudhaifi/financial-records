# Financial Records App

A comprehensive financial records management application built with [Next.js](https://nextjs.org/), React, Redux, Firebase, and Tailwind CSS. This app allows users to manage their financial transactions, track accounts, and visualize data through interactive charts and tables.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Database Integration](#database-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure sign-up and login using Firebase Authentication.
- **Account Management**: Create and manage multiple financial accounts with initial balances.
- **Transaction Records**: Add, edit, delete, and view financial transactions.
- **Search & Filters**: Search transactions and filter them by time range and categories.
- **Pagination**: Navigate through records with customizable items per page.
- **Data Visualization**: Interactive charts to visualize financial data.
- **Demo Mode**: Explore the app with preloaded demo data.
- **Responsive Design**: Fully responsive layout optimized for all devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication & Database**: [Firebase](https://firebase.google.com/)
- **Others**: React, Redux, Firebase Admin SDK

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/financial-records-app.git
   cd financial-records-app
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_firebase_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASURMENT_ID=your_firebase_measurement_id

FIREBASE_TYPE=your_firebase_type
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_CLIENT_ID=your_firebase_client_id
FIREBASE_AUTH_URI=your_firebase_auth_uri
FIREBASE_TOKEN_URI=your_firebase_token_uri
FIREBASE_AUTH_PROVIDER_CERT_URL=your_firebase_auth_provider_cert_url
FIREBASE_CERT_URL=your_firebase_cert_url
FIREBASE_UNIVERSE_DOMAIN=your_firebase_universe_domain

JWT_SECRET=your_jwt_secret
```

**Note**: Replace the placeholder values with your actual Firebase project credentials and a secure JWT secret.

### Running the Application

Start the development server:

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```plaintext
financial-records-app/
├── components/
│   ├── App/
│   │   ├── AppLayout.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── RecordsChart.tsx
│   │   ├── RecordsOrganism.tsx
│   │   ├── EditableAccount.tsx
│   │   ├── AccountsDropdown.tsx
│   │   └── RecordsInformation.tsx
│   ├── Home/
│   │   ├── HomeFooter.tsx
│   │   ├── HomeBanner.tsx
│   │   ├── HomeAboutMe.tsx
│   │   ├── HomePractice.tsx
│   │   ├── HomeUserDropdown.tsx
│   │   └── HomeNavigationDropdown.tsx
│   ├── Modal.tsx
│   └── Logo.tsx
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useDatabaseObserver.tsx
├── lib/
│   ├── firebase/
│   │   ├── admin.ts
│   │   ├── auth.ts
│   │   └── database.ts
│   ├── jwt.ts
│   └── redux/
│       ├── store.ts
│       └── features/
│           ├── accounts/
│           │   └── accountsSlice.ts
│           ├── demo/
│           │   └── demoSlice.ts
│           ├── records/
│           │   └── recordsSlice.ts
│           └── user/
│               └── userSlice.ts
├── pages/
│   ├── api/
│   │   ├── login.ts
│   │   ├── register.ts
│   │   └── user.ts
│   ├── dashboard.tsx
│   └── index.tsx
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── utils/
│   └── templateDate.ts
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## API Routes

The application includes several API routes for authentication and user management:

- **Login**: `POST /api/login`
  - Authenticates a user using email and password.
  - Sets a JWT token in HTTP-only cookies upon successful login.

- **Register**: `POST /api/register`
  - Registers a new user with email and password.
  - Creates a default "Personal" account for the user.
  - Sets a JWT token in HTTP-only cookies upon successful registration.

- **User**: `GET /api/user`
  - Retrieves the authenticated user's information based on the JWT token.

## State Management

The app utilizes [Redux Toolkit](https://redux-toolkit.js.org/) for state management, organized into slices:

- **User Slice (`userSlice.ts`)**
  - Manages user authentication state and fetch status.
  
- **Accounts Slice (`accountsSlice.ts`)**
  - Handles financial accounts data.

- **Records Slice (`recordsSlice.ts`)**
  - Manages financial transaction records.

- **Demo Slice (`demoSlice.ts`)**
  - Controls the demo mode state and data loading status.

The Redux store is configured in `store.ts` and provided to the entire application via the Redux `<Provider>` in `_app.tsx`.

## Authentication

Authentication is handled using Firebase Authentication with email and password. The workflow includes:

1. **Sign Up**: Users can create an account by providing their email and password. Upon successful registration, a default "Personal" account is created, and a JWT token is issued and stored in HTTP-only cookies.

2. **Login**: Existing users can log in with their credentials. A JWT token is issued and stored similarly.

3. **Protected Routes**: API routes and certain pages require authentication. The `AuthContext` and JWT verification ensure that only authenticated users can access protected resources.

## Database Integration

Firebase Realtime Database is used to store and manage user data, including accounts and transaction records. Key aspects include:

- **Database Observer (`useDatabaseObserver.tsx`)**: A custom React hook that listens to changes in the Firebase Realtime Database and updates the Redux store accordingly.

- **Data Structure**:
  - **Users**: Stored under `users/{uid}/` with subpaths for `accounts` and `records`.
  - **Accounts**: Each account has an `id`, `name`, and `initialBalance`.
  - **Records**: Each record includes details like `id`, `date`, `description`, `categoryId`, `amount`, etc.

## Deployment

The application is ready to be deployed on [Vercel](https://vercel.com/), the platform from the creators of Next.js. Follow these steps to deploy:

1. **Push to GitHub**:
   Ensure your project is pushed to a GitHub repository.

2. **Connect to Vercel**:
   Log in to Vercel and import your GitHub repository.

3. **Set Environment Variables**:
   Add all required environment variables in the Vercel dashboard under your project's settings.

4. **Deploy**:
   Vercel will automatically build and deploy your application. Access your live site via the provided URL.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository**

2. **Create a new branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Make your changes**

4. **Commit your changes**

   ```bash
   git commit -m "Add some feature"
   ```

5. **Push to the branch**

   ```bash
   git push origin feature/YourFeature
   ```

6. **Open a Pull Request**

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README further based on additional features or specific instructions related to your project.