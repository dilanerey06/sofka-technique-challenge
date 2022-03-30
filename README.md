# Sofka Technique Challenge

**Version 1.0.0**

## Tools

Full Stack application made using:

1. For the backend: NodeJS, Express, MySQL and mysqljs
2. For the frontend: JavaScript, ReactJS, reac-boostrap

## Description (ES)

Lo que se busca en este juego es pre-construir una serie de preguntas con 4 opciones de
respuesta y una de ella válida, además de una categoría asociada con el mismo nivel de
dificultad. Cada pregunta debe estar categorizada y debe existir mínimo 5 preguntas por
categoría donde por cada ronda se debe extraer una pregunta de esa categoría de forma
aleatoria, debe existir 5 rondas en todo el juego, cada ronda otorga premios (puntos o dinero) cuando el jugador acierta correctamente.
El acomulado de premios está dentro del concurso pero si dado el caso el jugador pretender
salir de juego puede retirarse antes de responder a la pregunta, si por el contrario el jugador pierde entonces saldría del juego sin el acomulado que llevaría en ese momento.

## Steps to run this project

1. Clone the github repository in your machine (Yo have to be installed NodeJS nad MySQL).

2. Setup the database:

   2.1) First go to the following directory: `./server/config/`

   2.2) You'll find a .sql file named `sofkaprueba_db.sql` run it in a MySQL Local instance.

   2.3) Then open the `Conection.js` file that is in the same directory and edit it changing the connection string referencing the MySQL Local instance as follow:

```
const db = mysql.createPool({
  host: 'localhost', // Type here the host
  user: '@MySQL user', // Type here the user
  password: '@MySQL password', // Type here the pass
  database: 'pruebasofka',
  multipleStatements: true,
});
```

2.4) Save the `Conection.js` file.

3. To run the server back to `server` directory and open a terminal. and type (one by one):

```
npm install
npm run devStart
```

4. To run the frontend open other terminal and go to `client` directory and type (one by one):

```
npm install
npm start
```

Now the server would be running on localhost and PORT 3001 and the client is running
on localhost but in PORT 3000. Open your browser and search `localhost:3000`.

## License

Made By Dilan E. Rey (Theyrent) or @github/dilanerey06/
