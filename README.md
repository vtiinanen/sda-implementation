## NodeJS API for solita names

The initial exercise tasks are here:
https://github.com/solita/dev-academy-2021

This express application works as RESTful api

#### 1. List names and amounts, order by amount, most popular first
GET /names?sort=amount

#### 2. List names in alphabetical order
GET /names?sort=alphabetical

#### 3. Return the total amount of all the names
GET /names?aggregate=amount

#### 4. Return the amount of the name given as a parameter
GET /names/Ville?key=amount

More could have been implemented (e.g. sorting order query), but the tasks requirements were very loose.
I don't want to implement too much for nothing.

This is a good base for an express app in general.
