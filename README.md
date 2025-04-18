# Caveats

I wasn't able to complete everything I wanted to, especially tests.

# Functionality

# Assumptions

- Not responsive
- Future scale issues not addressed
- Environment variables
- String responses only

# Running Locally

Install dependencies on the backend:  
`bundle install`

Run the migration:
`rails db:migrate`

Install dependencies on the frontend:  
`cd frontend`  
`npm install`

Head back to the root directory:
`cd ..`

Seed db:  
`rails db:seed`

Start project:  
`foreman start -f Procfile.dev`

App should now be running at `http://localhost:5173/`

# Precreated Users to use
