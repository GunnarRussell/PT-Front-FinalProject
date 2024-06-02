// Logic for network calls to API
const SCORE_ENDPOINT = "https://665cc79e3e4ac90a04da9f25.mockapi.io/scoreapi/highscores/";

class ScoreAPI
{

    async post(score) // CREATE / POST function
    {
        try
        {
            //get data from API (wait for the data)
            //grabs specific score by ID and sends a UPDATE / PUT request for it
            const response = await fetch(`${SCORE_ENDPOINT}`,
            {
                method: 'POST', //POST method is for pushing data to API
                headers: {'Content-Type': 'application/json'}, //header says the data is in JSON format
                body: JSON.stringify(score) //body includes data inside the request. the data is converted into JSON format
            });
        }
        catch(error) //handle error
        {
            console.log(`ERROR, could not create score: ${error}`);
        }
    }

    async get() // READ / GET function
    {
        try
        {
            //get data from API (wait for the data)
            const response = await fetch(SCORE_ENDPOINT);

            //convert data into JSON (also need to wait for the data)
            const data = await response.json();

            return data;
        }
        catch(error) //handle error
        {
            console.log(`ERROR, could not fetch score: ${error}`);
        }
    }

    async put(score) // UPDATE / PUT function
    {
        try
        {
            //get data from API (wait for the data)
            //grabs specific score by ID and sends a UPDATE / PUT request for it
            const response = await fetch(`${SCORE_ENDPOINT}/${score.id}`,
            {
                method: 'PUT', //PUT method is for updating API
                headers: {'Content-Type': 'application/json'}, //header says the data is in JSON format
                body: JSON.stringify(score) //body includes data inside the request. the data is converted into JSON format
            });

            //convert data into JSON (also need to wait for the data)
            const data = await response.json();

            return data;
        }
        catch(error) //handle error
        {
            console.log(`ERROR, could not update score: ${error}`);
        }
    }

    async delete(score) // DELETE function
    {
        try
        {
            //get data from API (wait for the data)
            //grabs specific score by ID and sends a UPDATE / PUT request for it
            const response = await fetch(`${SCORE_ENDPOINT}/${score.id}`,
            {
                method: 'DELETE', //DELETE method is for deleting data from API
                headers: {'Content-Type': 'application/json'}, //header says the data is in JSON format
            });
        }
        catch(error) //handle error
        {
            console.log(`ERROR, could not delete score: ${error}`);
        }
    }
}

export const scoreAPI = new ScoreAPI();