# Southern Code Test

The Generic Motors (GM) car company has a terrible API. It returns badly structured JSON which isn't always consistent. Smartcar needs to adapt the API into a cleaner format.

## Project Structure

```bash
.
├── .env
├── .env.example
├── .gitignore
├── .husky/
│ ├── \_/
│ ├── pre-commit
├── .prettierignore
├── .prettierrc
├── babel.config.cjs
├── coverage/
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
├── LICENSE
├── package.json
├── README.md
├── src/
│ ├── controllers/
│ ├── index.js
│ ├── middlewares/
│ ├── redis/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── validators/
├── swaggerConfig.js
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Redis
- Docker

### Installation

1. Clone the repository:

```bash
git clone https://github.com/EverCabarcas/SoutherCodeTest.git
```

2. Navigate to the project directory:

```bash
cd southerncodetest
```

3. Install the dependencies:

```bash
npm install
```

### Running the Project

To start the server, run:

```bash
npm start
```

To start the server in development mode with nodemon, run:
```bash
npm run dev
```
The server will be running at http://localhost:3000. be sure to add your env variables

To start the app using Docker, run:
```bash
docker-compose up --build
```
> docker-compose.yml also use the .env remember to change according to your enviroments if needed. Be sure have docker install in your machine https://docs.docker.com/engine/install/


### Linting and Formatting

To lint the code using ESLint, run:
```bash
npm run lint
```

To format the code using Prettier, run:
```bash
npm run format
```

## Project Configuration

### ESLint

The ESLint configuration is defined in eslint.config.js. It includes rules for Prettier integration and custom rules for JavaScript files.

### Coverage

The general coverage can be run using:
```bash
npm run test
```

### Redis

Ensure you have installed the redis in your local (When no docker conifg is used).

Install Redis using Homebrew:
```bash
brew install redis
```

Start the Redis server:
```bash
brew services start redis
```

Verify that Redis is running:
```bash
redis-cli ping
```

Install Redis for windows:
https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/

### Prettier

The Prettier configuration is defined in .prettierrc. It specifies the code formatting rules such as single quotes, no semicolons, and a print width of 80 characters.

## API Endpoints

| Endpoint      | Body          | Authentication  | response  |
| ------------- |:-------------:| -----:| -----:|
| GET - /api/vehicles/{id}      | {} | YES | Look Swagger |
| GET - /api/vehicles/{id}/doors      | {}      |   YES | Look Swagger |
| GET - /api/vehicles/{id}/fuel | {}  |    YES | Look Swagger |
| GET - /api/vehicles/{id}/battery | {}  |    YES | Look Swagger |
| POST - /api/vehicles/{id}/engine | { "action": string }  |    YES | Look Swagger |
| POST - /api/login | { "email": "user@example.com", "password": "password123" }  |    YES | Look Swagger |
| POST - /register-user | { "email": "user@example.com", "password": "password123" }  |    NO | Look Swagger |

``
NOTE: Remember to Register an user before you try to get information from the endpoints
``

```
Afer you run the project you can find the swagger docs in
> http://localhost:{YOUR_PORT}/api-docs/#/

Use the Authorize button to handle Authorization token in the endpoints
Remember to put only the <Token>

Please do not use Bearer <Token> in Authorize button
```


## Author

Ever Cabarcas - evercabarcasmallarino@gmail.com

## License

This project is licensed under the MIT License - see the LICENSE file for details.
