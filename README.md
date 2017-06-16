# in-memory-cache
An in memory cache implemented in JavaScript. The user interface is a command line interface (CLI).

To run the application, simply do the following:
1. Clone the git repo.
2. Navigate to your cloned repository.
3. Run 'npm install' (only dependencies are for testing).
4. Run 'npm test' to run all tests.
5. Run 'npm start' to start the CLI application.

This cache supports the following commands:

SET name value: The name passed in becomes the key and the value becomes the value for that key. No output if this is successful.

GET name: Retrieves the value for the key represented by "name". Returns NULL if name does not exist.

UNSET name: Empties the value for the key "name". After this command, a GET command will return NULL.

NUMEQUALTO value: Returns the number of keys in the cache that have the specified value.

END: This will end the session and exit the process.

This cache also supports transactions:

BEGIN: This command begins the transaction. Commands entered after this point and before COMMIT can be reversed.

ROLLBACK: This command rolls back the commands entered since BEGIN. This will return the state of the cache to its state prior to BEGIN.

COMMIT: This commits and closes all transactions.

Transactions can be nested. You can begin a transaction within a transaction and this cache can handle it.

Sample input and ouput:

Input : Ouput

GET a : NULL

SET a 10 : 

GET a : 10

BEGIN : 

SET a 30 : 

GET a : 30

NUMEQUALTO 30 : 1

ROLLBACK :

GET a : 10

NUMEQUALTO 30 : 0

END
