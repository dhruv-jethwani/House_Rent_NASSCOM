# 🏠 House Rent: A Web-Based House Rental Platform

## 1. Overview

**House Rent** is a centralized digital ecosystem designed to replace outdated, high-friction, and low-trust property rental processes.

Traditional rental markets rely heavily on brokers, manual listings, and scattered information. House Rent eliminates these inefficiencies by providing a structured platform where renters and property owners can interact transparently.

The system enables:

* Direct owner–renter interaction
* Transparent booking workflows
* Secure role-based access
* Centralized property management

By integrating structured data management, financial tracking, and administrative oversight, the platform significantly reduces operational chaos and improves the reliability of property rentals.

---

# 2. Core Features

## Role-Based Dashboards

House Rent implements strict **role-based access control** with separate dashboards:

* **Admin** – Platform oversight and verification
* Admin User made on running the backend code, credentials-
  Username: Admin
  Password: admin_password
* **Owner** – Property listing and booking management
* **Renter** – Property discovery and booking requests

Each role interacts with a customized interface designed for their responsibilities.

---

## Dynamic Search & Filtering

The platform provides an advanced filtering engine that allows renters to search properties without refreshing the entire page.

Available filters include:

* **State / Location**
* **Property Type** (Residential or Commercial)
* **Price Range**

This enables renters to quickly identify properties that match their requirements.

---

## Real-Time Status Synchronization

Property availability is synchronized across the platform.

Possible statuses include:

* Available
* Unavailable

Whenever a property is booked or disabled by the owner or admin, its status immediately updates for renters browsing the platform.

---

## Booking Lifecycle Engine

The platform manages the entire booking process through a structured pipeline.

Booking states include:

* Pending
* Booked
* Rejected

Visual indicators such as status badges and dynamic action buttons allow users to clearly understand the current state of each booking.

---

## Integrated Wallet System

Renters maintain an internal **wallet balance** inside the platform.

This system enables:

* Transparent booking payments
* Simplified financial transactions
* Clear tracking of booking expenses

The wallet model also prevents disputes by recording every transaction performed on the platform.

---

## Administrative Gateway

To prevent fraudulent property listings, owners must be verified by the **Admin** before they can publish properties.

This verification step ensures:

* Authentic property listings
* Platform credibility
* Reduced financial risk

---

# 3. System Architecture

House Rent is built using the **MERN Stack**:

* **MongoDB** – NoSQL database for storing application data
* **Express.js** – Backend framework for API development
* **React.js** – Frontend library for building user interfaces
* **Node.js** – Runtime environment for server-side execution

This architecture provides scalability, flexibility, and efficient communication between the frontend and backend systems.

---

## Backend Architecture (MVC Pattern)

The backend follows the **Model-View-Controller (MVC)** architecture.

Instead of monolithic routing, the backend separates responsibilities into distinct layers:

**Models**
Define MongoDB schemas and data structure.

**Controllers**
Contain business logic for handling API requests.

**Routes**
Expose RESTful endpoints used by the frontend.

This separation improves maintainability and simplifies debugging.

---

## Frontend Architecture (Component-Based)

The React frontend follows a **component-based structure**.

The application is divided into reusable components organized by module:

* Authentication Components
* Property Listing Components
* Booking Management Components
* Admin Dashboard Components

This modular structure prevents large unmanageable files and improves development efficiency.

---

## State Management

The application uses React Hooks to manage component state.

Primary hooks used:

* `useState`
* `useEffect`

Derived state logic reduces unnecessary API calls and ensures smooth user interface updates.

---

# 4. Prerequisites

Before running the project, ensure the following tools are installed:

* **Node.js** (Version 14 or higher)
* **MongoDB Atlas** account or local MongoDB instance
* **Git**
* **VS Code or any preferred IDE**

---

# 5. Installation & Setup

## Step 1: Clone the Repository

Run the following commands:
```bash
git clone https://github.com/[your-username]/House_Rent_NASSCOM.git
cd House_Rent_NASSCOM
```
---

## Step 2: Backend Configuration

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file inside the **server directory** and add:
```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```
---

## Step 3: Frontend Configuration

Navigate to the client folder and install dependencies:
```bash
cd ../client
npm install
```
---

# 6. Running the Application

## Start the Backend Server

Inside the server folder run:
```bash
npm start
```
Important note:
When the backend runs for the first time, it automatically creates a **default Administrator account** inside the database to allow platform management.

---

## Start the Frontend Client

Inside the client folder run:
```bash
npm start
```
---

## Access the Platform

Open your browser and navigate to:
```bash
http://localhost:3000
```
---

# 7. Technical Implementation Details

## Security

The system uses **JSON Web Token (JWT) authentication**.

JWT middleware protects API routes and ensures that only authenticated users can access restricted resources.

---

## Data Integrity

The system implements dynamic fallback logic to prevent UI errors.

Example:
If an owner deletes a property that has existing booking records, the renter’s booking history will display:
```bash
"Property Deleted"
```
instead of breaking the interface.

---

## API Reusability

All API endpoints are centralized in a single configuration file in the frontend.

This allows developers to easily update API routes if the backend server URL changes.

---

# 8. Project Progress & Tracking

## Development Timeline

The project was completed during a **17-day accelerated development sprint**.

Start Date: February 20, 2026
Completion Date: March 8, 2026

---

## Tracking Tools

**Skillwallet Platform**
Used to track project milestones and submission progress.

**GitHub Projects Kanban Board**
Used for agile task management including:

* Task distribution
* Bug tracking
* Feature implementation
* Sprint monitoring

---

# Future Enhancements

Potential improvements for future versions include:

* Google Maps integration for property locations
* Real-time messaging between renters and owners
* AI-based property recommendation system
* Mobile application support
* Notification system for booking updates

---

# License

This project was developed for educational and internship purposes as part of the **NASSCOM Project Program**.

---

# Author

Developed as part of the **NASSCOM Internship Project – House Rent Platform**.
