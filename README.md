# WordsAppServer

### NodeJS + PostgreSQL application

### Overall
  This application is a backend for [WordsApp](https://github.com/Ghaarp/WordsAppClient "WordsApp client"). It helps to combine data from different data sources in a single JSON file. For now it uses google translator API, google images API, and accumulates data in PostgreSQL database. 
  
### Application architecture
  Application is built on NodeJS + Express. It has controllers attached to routes (src/routes). Controllers are only responsible for communicating between API and logic, they do nothing by themselves. All logic is moved to helpers (src/helpers). Also, there is some middleware functions responsible for user token checking and errors unification. In a folder (src/core) you can find modules to work with external API's. The folder (src/parser) contains parser modules that convert all external data into one single JSON.
