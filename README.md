# Hanna-Hinn-NodeJS-sec

The application works like a simple database for books in a library. 

The mission is to set up an array of book details with JSON in a file. 

The server should listen to three endpoints: 

 

GET: /books => returns an HTML file containing a list of books (it gets books from books.json and uses Pug to create the HTML file and then returns it in the response).   
GET: /books/:id => returns HTML file containing book details (get the book by id from books.json file, and use Pug to create html file and then return it in the response)   
POST:/books => Handle the book details in the request body, and add the book details to the books list in books.json (if the file does not exist, create it). Returns success message.   
 

Book details Format: { id: number, name: string } 

 

Handle the errors when: 

- the endpoint is invalid. 

- books file does not exist. 

- book file is invalid. 

- any unexpected error happens.
