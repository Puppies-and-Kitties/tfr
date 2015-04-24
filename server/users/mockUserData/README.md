Use instructions: 
  first make sure you have mongodb-datasets and the mongodb client installed
    From the mongodb-datasets readme: 
    "To use the `mongodb-datasets` command, install mongodb-datasets globally:
    $ npm install -g mongodb-datasets"
    To use the Javascript API, just run:
      npm install
    And mongodb-datasets will be installed via package.json
      
  cd into this file's directory and run the following command
    mongodb-datasets mockUser.schema.json -n 10 -o mockData.json --pretty
      -Note that running this command will overwrite all the previous data in the mock-data.json file
    The command breaks down like so:
      mongodb-datasets 
        (invokes the mongodb-datasets package)
      mock-user-schema.json 
        (tells the package what schema to follow when creating the fake data points)
      -n 10 
        (specifies the number of fake data points to make)
      -o mock-data.json 
        (tells the package where to write the fake data to, will create the file if it doesn't already exist)
      --pretty 
        (optional, but it will write the data in a human readable format. ie similar to how this schema currently looks)

    Now you have all the mock data ready to insert into the database, but how do you get it in there?
      Great question, I'm glad you asked.
      Now all you need to do is run:
        node mockApp.js
      you should then see a log informing you of how many documents you just inserted into the database