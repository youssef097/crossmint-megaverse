
# Crossmint Code Challenge


This challenge involved developing a megaverse management system that integrates various astral objects, such as Polyanets, Soloons, and Comeths, using a modular service architecture. 

The project makes use of a throttled API client (ThrottledAxiosClient.ts) in addition with a retry system to deal with the limited rate limit in the API.

The number request per second can be set through the environment variable:

`MAX_REQUEST_PER_SECOND = 1` 



## Features

#### 1. Create Megaverse from Goal Map
Initiate the creation of a megaverse based on a predefined goal map.

 [⚠️] will clear the current progress if needed

#### 2. Continue Megaverse Creation
Resume the megaverse creation process if interrupted, allowing for partial completion of the creation.

#### 3. Validate Megaverse
Validate the current state of the megaverse to ensure it meets predefined criteria making use of the `/validate` API endpoint  .


#### 4. Clear Current Map
Remove all existing objects from the current map, providing a fresh start for new creations.

#### 5. Delete Intrusive Astral Objects
Identify and remove any objects that are not recognized in the goal map.

#### 6. Progress Tracking
Real-time tracking of the creation process with percentage completion displayed to the user. Informative messages indicate the current status of the megaverse action.


#### 7. User-Friendly Menu Interface
Interactive menu system using `prompts`library to guide users through available actions.





## Run Locally

Clone the project

```bash
  git clone https://github.com/youssef097/crossmint-metaverse.git
```

Clone the `.env.example` file and rename it `.env`

Go to the project directory

```bash
  cd crossmint-metaverse
```

Install dependencies

```bash
  npm install
```

Start the process

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CANDIDATE_ID=` 

`BASE_API_URL=`

`MAX_REQUESTS_PER_SECOND = 3 #recommended` 


## Tech Stack

 NodeJS, Axios, Prompts, Typescript

