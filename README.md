#  MAC News - Frontend

## Description

**MAC News** is a **responsive web application** for:

> **"News Publishing and Consumption Using Artificial Intelligence Based on the UNESCO International Code of Journalistic Ethics (Case Study: El Elector)"**

This frontend provides the user interface for interacting with the platform, enabling different types of users to consume, create, and manage news content efficiently.

---

##  User Roles

The platform supports three main types of users:

###  Readers
- Browse and search news
- Receive personalized recommendations
- Follow channels
- View categorized content
- Interact with content (comments, visits)

---

###  Journalists
- Create and manage news
- Manage channels
- Submit journalist applications
- View performance metrics
- Improve content using AI-powered features

---

### Administrators
- Manage users and roles
- Monitor system activity
- Review reports and analytics
- Oversee content approval workflows

---

##  AI Integration (Frontend Perspective)

The frontend integrates AI-powered features by consuming backend services:

-  Personalized news recommendations
- AI-based comment analysis (user interest metrics)
-  AI-assisted content improvements
-  Ethical validation feedback

These features enhance user experience and decision-making for both readers and journalists.

---

##  Features

Based on the current application routes:

-  Latest news view (`last-news`)
-  News listing and detail (`news`)
-  Intelligent search (`search`)
-  Category filtering (`category`)
-  Specialty-based filtering (`speciality`)
-  Channel-based news (`channel-news`)
-  Journalist channels (`channel-journalist`)
-  Channel creation (`creation-channel`)
-  Journalist application form (`journalistForm`)
-  User profile management (`userData`)
-  Reports and analytics (`report`)
-  Authentication (`enterUser`)

---

## 🛠️ Technologies

- **React** `^19.0.0`
- **Next.js** `15.3.0`
- **Tailwind CSS** `^4.1.4`
- **Axios** `^1.8.4`

---

## 🔗 Backend Integration

The frontend communicates with the backend API using **Axios** and **JWT authentication**.

###  Authentication

- Uses JWT tokens stored in `localStorage`
- Sends token via `Authorization` header:

```ts
Authorization: Bearer <token>
```

### Example API Call

```tsx
import axios from 'axios';

const token = localStorage.getItem('token');

const response = await axios.get(API_URL, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

```

### Endpoint Management
API endpoints are centralized using:
* Utils/EnpointsBackEnd/enpoints

## Installation & Setup
### Install dependencies
* npm install
* npm update

### Run development server
* npm run 

## Project Structure
* src/app/
 * ├── Controller       # Handles API calls and logic
 * ├── Images           # Static assets
 * ├── Model            # Data models / entities
 * ├── pages            # Application routes (Next.js)
 * ├── Styles           # Styling (Tailwind / CSS)
 * ├── Utils            # Utilities and helpers
 * ├── Viuw             # UI components (Views)
 * ├── layout.tsx       # Main layout
 * └── favicon.ico

### Author

Gaston Gutierrez Condori