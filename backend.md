1) Jar of Expectations
Relatively simple compared to other two - build a database that stores option chosen and time of submission

Two endpoints:
1) /submission - takes in option and time of submission and adds to the database
    * need to restrict user submission to once total - easiest implementation is with localStorage, since we're not worried about hackers n shit
2) /get-jar - requested on every page load, returns a JSON response of all submissions in chronological order, which we then render in the jar on the front end with whatever visualizations we want

2) Sharing our Successes
My initial reaction is making a twitter clone - each object has username, message, and number of likes. 
To remove the process of logging in/registering, users submit a one-time username and "tweet". I don't think it's possible to restrict the user to one like a tweet if they choose to refresh the page and like again since we don't have accounts.

Three endpoints:
1) /submit-success - takes in username and message and adds to the database.
2) /like - takes in message id, adds a like to the object
3) /get - get all messages in JSON format

3) Wall of Encouragement
We can essentially copy the schema from 2) (keeping/removing likes if we want).
Same endpoints.