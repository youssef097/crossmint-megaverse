
# Crossmint Code Challenge


This challenge involved developing a metaverse management system that integrates various astral objects, such as Polyanets, Soloons, and Comeths, using a modular service architecture. 



The project makes use of a throttled API client (ThrottledAxiosClient.ts) in addition with a retry system to deal with the limited rate limit in the API.

The number request per second can be set through the environment variable

`MAX_REQUEST_PER_SECOND = 1` 



### Execution Flow

Each time the project is executed, it will first clear the existing elements from the current map and then proceed to construct the metaverse according to the goal map.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CANDIDATE_ID=` 

`BASE_API_URL=`

`MAX_REQUESTS_PER_SECOND = 3 #recommended` 


## Run Locally

Clone the project

```bash
  git clone https://github.com/youssef097/crossmint-metaverse.git
```

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


## Tech Stack

 NodeJS, Axios

