# Bookshelves Application

**Bookshelves** is a Node.js-based backend application for managing a book inventory system. It supports functionalities for creating, retrieving, updating, and deleting books, placing orders, and calculating revenue generated from orders.

---

## Features

### Book Management

- Add new books to the inventory.
- Retrieve all books or search by title, author, or category.
- Retrieve a specific book by ID.
- Update book details.
- Delete a book from the inventory.

### Order Management

- Place an order for a book, specifying quantity and total price.
- Automatically reduce inventory quantity upon order placement.
- Set the book's `inStock` status to `false` if the stock reaches zero.
- Handle insufficient stock scenarios with meaningful error responses.

### Revenue Calculation

- Aggregate total revenue generated from all orders.

### Error Handling

- Comprehensive validation and error handling for missing data, invalid inputs, and not found resources.
- Clear and descriptive error messages for better user feedback.

---

## Technologies Used

- **Node.js**: Backend framework.
- **Express.js**: Web server framework.
- **TypeScript**: Type-safe JavaScript.
- **MongoDB**: NoSQL database for storing books and orders.
- **Mongoose**: ODM for MongoDB.
- **ESLint** and **Prettier**: Code quality and formatting tools.
- **dotenv**: Environment variable management.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or above)
- **npm** (v8 or above) or **yarn**
- **MongoDB** (running locally or on the cloud)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rabby9898/bookshelves.git
cd bookshelves
```

### 2. Install Dependencies

Install the required Node.js dependencies using:

```bash
npm install
```

or

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and provide the following environment variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookshelves
```

### 4. Run the Application

- **Development Mode**:

  ```bash
  npm run start:dev
  ```

  This uses `ts-node-dev` for live-reloading during development.

- **Production Mode**:
  ```bash
  npm run build
  npm run start:prod
  ```

### 5. API Endpoints

| Endpoint              | Method | Description                         |
| --------------------- | ------ | ----------------------------------- |
| `/api/books`          | POST   | Add a new book                      |
| `/api/books`          | GET    | Retrieve all books or search books  |
| `/api/books/:id`      | GET    | Retrieve a specific book by ID      |
| `/api/books/:id`      | PUT    | Update a specific book by ID        |
| `/api/books/:id`      | DELETE | Delete a specific book by ID        |
| `/api/orders`         | POST   | Place a new order                   |
| `/api/orders/revenue` | GET    | Calculate total revenue from orders |

### 6. Test the Application

Use tools like **Postman** or **cURL** to test the API endpoints.

---

## Development Scripts

- `npm run start:dev`: Run the application in development mode.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm run start:prod`: Start the compiled application in production mode.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run lint:fix`: Automatically fix lint issues.
- `npm run prettier`: Format code using Prettier.

---
