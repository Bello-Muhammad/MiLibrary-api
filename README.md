MiLibrary

This an online web application library service 

Description
- MiLibrary is an online web free library service where user can read online and download the book, novel or magazine,
and user can also make request for book they wanted to read which is not available on the platform.

Technology Use
-The project is build on nodejs, a javascript framework used to run javascript from backend (server side).

Libraries
Library uses can be found in package.json file and it build on;
  -node 16.x
  -npm  8.x
  
 Setup and Running of the app Locally
 //in your VsCode terminal run
$ git clone https://github.com/Bello-Muhammad/MiLibrary-api.git
//open the clone repository folder created on your machine in Vscode
//Then run the following command in Vscode terminal, or git bash
$ npm install
// to start the server
$ npm run dev
  
 Choice on Storage
 The use of mongodb in other to handle quick reliable data acces and to aid performance.
 
Tech Stack
-Client: handlebars, css, js, and Bootstrap.
-Server: JavaScript(Nodejs), Express, and Mongodb.

Project Structure
src
  |_ backend
      |_ admin
      |_ books
      |_ config
      |_ dto
      |_ routes
      |_ utils
  |_ frontend
      |_ dist
      |_ partial
      |_ view


