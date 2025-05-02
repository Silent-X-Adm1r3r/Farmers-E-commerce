# ECOMMERCE

An E-commerce Website built with MERN stack.

## Instructions

After cloning, run this command in the root folder:

```bash
npm install
```

Navigate to the "frontend" folder, and run these commands:

```bash
npm install
npm run build
```

Wait for the application to build.

After that, open the backend/config/config.env file and update the MongoDB connection string:

```bash
...
DB_LOCAL_URI=mongodb://localhost:27017/ecom
```

Navigate back to the "root" folder and run this command to load demo data:

```bash
npm run seeder
```

Run the following command to start the app in production mode:

```bash
npm run prod
```

## TEST

Open http://localhost:8000 and test the backend.
