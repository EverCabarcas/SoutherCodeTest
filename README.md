# Southern Code Test

The Generic Motors (GM) car company has a terrible API. It returns badly structured JSON which isn't always consistent. Smartcar needs to adapt the API into a cleaner format.

## Project Structure

.
├── .prettierrc
├── eslint.config.js
├── index.js
├── package.json
├── README.md

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   git clone <repository-url>
   
2. Navigate to the project directory:
   cd southerncodetest
   
3. Install the dependencies:
   npm install

### Running the Project

To start the server, run:
   npm start

To start the server in development mode with nodemon, run:
   npm run dev

The server will be running at http://localhost:3000.

### Linting and Formatting

To lint the code using ESLint, run:
   npm run lint

To format the code using Prettier, run:
   npm run format

## Project Configuration

### ESLint

The ESLint configuration is defined in eslint.config.js. It includes rules for Prettier integration and custom rules for JavaScript files.

### Prettier

The Prettier configuration is defined in .prettierrc. It specifies the code formatting rules such as single quotes, no semicolons, and a print width of 80 characters.

## API Endpoints

- GET / - Returns "Hello World!"
- GET /about - Returns "About Page"
- GET /contact - Returns "Contact Page"

## Author

Ever Cabarcas - evercabarcasmallarino@gmail.com

## License

This project is licensed under the MIT License - see the LICENSE file for details.