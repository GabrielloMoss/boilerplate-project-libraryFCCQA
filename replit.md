# Personal Library

## Overview

A Personal Library management system built as a FreeCodeCamp Quality Assurance project. This application provides a RESTful API for managing a collection of books and their associated comments. Users can add books, view book details, add comments to books, and delete books or the entire library. The project includes functional tests and a simple frontend interface for interacting with the API.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture

**Framework**: Express.js server handling HTTP requests and serving both static files and API endpoints.

**Routing Structure**: The application uses a modular routing approach with separate route handlers:
- `/routes/api.js` - Handles all book-related API endpoints
- `/routes/fcctesting.js` - Special routes for FreeCodeCamp automated testing
- Static file serving from `/public` directory for frontend assets
- Main HTML view served from `/views` directory

**API Design**: RESTful API with the following endpoints:
- `GET /api/books` - Retrieve all books with comment counts
- `POST /api/books` - Create a new book
- `DELETE /api/books` - Delete all books
- `GET /api/books/:id` - Get specific book with comments
- `POST /api/books/:id` - Add comment to a book
- `DELETE /api/books/:id` - Delete a specific book

### Data Layer

**Database**: MongoDB with Mongoose ODM for data modeling and validation.

**Schema Design**: Single collection architecture with embedded comments:
```javascript
{
  title: String (required),
  comments: [String]
}
```

**Design Rationale**: Embedded comments array within book documents optimizes for read performance (common use case) and maintains data locality. This approach is suitable given the expected small-to-moderate number of comments per book.

**Data Access Pattern**: Async/await pattern for all database operations with try-catch error handling.

### Frontend Architecture

**Technology Stack**: jQuery-based SPA (Single Page Application) for dynamic UI updates without page reloads.

**User Interface Components**:
- Book listing with comment counts
- Detailed book view with comment display
- Forms for adding books and comments
- Delete functionality for individual books and entire library

**Client-Server Communication**: AJAX requests using jQuery's `$.ajax()` and `$.getJSON()` methods for asynchronous data exchange.

### Testing Infrastructure

**Framework**: Mocha test runner with Chai assertion library and chai-http for API testing.

**Test Organization**: 
- Functional tests in `/tests/2_functional-tests.js`
- Automated test runner (`test-runner.js`) for FreeCodeCamp validation
- Tests cover CRUD operations and edge cases (missing fields, invalid IDs)

**Test Execution**: Tests run automatically when `NODE_ENV=test` environment variable is set.

### Configuration Management

**Environment Variables**: dotenv package manages configuration:
- `DB` - MongoDB connection string
- `PORT` - Server port (defaults to 5000)
- `NODE_ENV` - Environment mode (triggers test execution when set to 'test')

### Middleware Stack

**Body Parsing**: body-parser middleware handles JSON and URL-encoded request bodies.

**CORS**: Permissive CORS policy (`origin: '*'`) enabled for FreeCodeCamp testing requirements.

**Error Handling**: Custom 404 middleware catches unmatched routes and returns appropriate error response.

## External Dependencies

### Database
- **MongoDB** - NoSQL document database for storing books and comments
- **Mongoose** (v9.0.1) - ODM providing schema validation and query building

### Core Framework
- **Express** (v4.14.0) - Web application framework
- **body-parser** (v1.15.2) - Request body parsing middleware
- **cors** (v2.8.1) - Cross-Origin Resource Sharing middleware
- **dotenv** (v8.2.0) - Environment variable management

### Testing Libraries
- **Mocha** (v3.2.0) - Test framework
- **Chai** (v4.2.0) - Assertion library
- **chai-http** (v4.3.0) - HTTP integration testing
- **Zombie** (v5.0.5) - Headless browser testing

### Frontend
- **jQuery** - Client-side JavaScript library (loaded via CDN in HTML)
- **Bootstrap** - CSS framework (implied by form styling classes)

### FreeCodeCamp Integration
- Custom testing routes and assertion analyzer for automated project validation
- Special middleware exposes source files for FreeCodeCamp's test runner