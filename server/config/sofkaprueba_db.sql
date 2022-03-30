CREATE DATABASE pruebaSofka;
USE pruebaSofka;

CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS categories (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS topics(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS questions_options(
	id INT NOT NULL AUTO_INCREMENT,
    opt_one LONGTEXT NOT NULL,
    opt_two LONGTEXT NOT NULL,
    opt_three LONGTEXT NOT NULL,
    opt_four LONGTEXT NOT NULL,
    opt_correct LONGTEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS questions(
	id INT NOT NULL AUTO_INCREMENT,
    statement LONGTEXT NOT NULL,#CHARACTER SET utf8
    id_topic INT NOT NULL,
    id_category INT NOT NULL, 
    id_options INT NOT NULL UNIQUE,
    PRIMARY KEY(id),
    FOREIGN KEY(id_category) REFERENCES categories(id),
    FOREIGN KEY(id_topic) REFERENCES topics(id),
    FOREIGN KEY(id_options) REFERENCES questions_options(id)
);

INSERT INTO categories (name) 
VALUES ('Low'),('Medium-Low'),('Medium'),('Hard'),('Very-Hard');

INSERT INTO topics (name) 
VALUES ('Maths'),('Spanish Language'),('English'),
('Science'),('General Culture');

#Inserting math question options
INSERT INTO questions_options (opt_one,opt_two,opt_three,opt_four,opt_correct)
VALUES ('Avicinio','Ábaco','Odómetro','Telescopio','Ábaco'),
('3','1','2','-1','2'),
('3,141592','3,151492','3,161415','3,141516','3,141592'),
('5550','5500','5555','5050','5050'),
('Su estructura es asimétrica.','Su estructura se repite a distintas escalas.','Su estructura se repite a las mismas escalas.','Ninguna de las anteriores.','Su estructura se repite a distintas escalas.');

#Inserting 'Lengua' question options
INSERT INTO questions_options (opt_one,opt_two,opt_three,opt_four,opt_correct)
VALUES ('Es explicar, de forma detallada y ordenada, cómo son las personas, los lugares o los objetos.',
'Reproduce de forma indirecta las palabras que se cruzan entre dos o más personas.',
'Es el relato de unos hechos reales o imaginarios que les suceden a unos personajes en un lugar.',
'Reproduce de forma directa las palabras que se cruzan entre dos o más personas.',
'Es el relato de unos hechos reales o imaginarios que les suceden a unos personajes en un lugar.'), #quetion-1 options
('Es la secuencia de dos consonantes.',
'Es la secuencia de dos vocales distintas que se pronuncian dentro de la misma sílaba.',
'Es la rima característica de los sonetos.',
'Ninguna de las anteriores.',
'Es la secuencia de dos vocales distintas que se pronuncian dentro de la misma sílaba.'), #quetion-2 options
('Es la secuencia de tres consonantes.',
'Es la secuencia de tres vocales que forman parte de una misma sílaba.',
'Es una secuencia de oraciones con rima asonante.',
'Es una sílaba terminada en consonante.',
'Es la secuencia de tres vocales que forman parte de una misma sílaba.'), #question-3 options
('Que es la época que hay entre la Edad Moderna y Edad Contemporánea.',
'Que se vuelve a estudiar y leer textos clásicos.',
'Que las personas hacen retro inspección y vuelven a nacer.',
'Había sólo escritores clérigos.',
'Que se vuelve a estudiar y leer textos clásicos.'), #quetion-4 options
('Miguel de Cervantes.','Arcipestre de Hita.','Gabriel García Márquez.','Gonzalo de Berceo.','Gonzalo de Berceo.'); #question-5 options

#Inserting english question options
INSERT INTO questions_options (opt_one,opt_two,opt_three,opt_four,opt_correct)
VALUES ('To close.','To buy.','To sell.','To sit.','To sell.'), #quetion-1 options
('Added.','Adding.','Add.','Ad.','Added.'), #quetion-2 options
('Know.','Met.','Fall.','Meet.','Know.'), #question-3 options
('Tear, tore.','Tear, tear.','Tore, torn.','Tear, torn.','Tore, torn.'), #quetion-4 options
('To have an interview.',
'To have it out with sb.',
'To have it in for sb.',
'To have this in with sb.',
'To have it out with sb.'); #question-5 options

#Inserting science question options
INSERT INTO questions_options (opt_one,opt_two,opt_three,opt_four,opt_correct)
VALUES ('4','8','6','3','4'), #quetion-1 options
('Canadá.','Rusia.','Estados Unidos.','Brasil.','Rusia.'), #quetion-2 options
('Una partícula subatómica de carga positiva.',
'Una partícula subatómica de carga negativa.',
'Una partícula subatómica de carga neutra.',
'Ninguna de las anteriores.',
'Una partícula subatómica de carga positiva.'), #question-3 options
('Iridio.','Wolframio.','Osmio.','Hidrogeno.','Osmio.'), #quetion-4 options
('De ácido nítrico y clorhídrico.',
'De ácido sulfúrico y úrico.',
'De ácido sulfúrico y ácido nítrico.',
'Ninguna de las anteriores.',
'De ácido sulfúrico y ácido nítrico.'); #question-5 options

#Inserting general culture question options
INSERT INTO questions_options (opt_one,opt_two,opt_three,opt_four,opt_correct)
VALUES ('4','8','10','20','8'), #quetion-1 options
('Brasileño.','Francés.','Inglés.','Portugués.','Portugués.'), #quetion-2 options
('Para combatir los virus.',
'Contra las infecciones bacterianas.',
'Siempre que nos sintamos enfermos.',
'¡Nunca!',
'Contra las infecciones bacterianas.'), #question-3 options
('70%','50%','10%','90%','70%'), #quetion-4 options
('Ares.','Júpiter.','Marte.','Belerofonte.','Marte.'); #quetion-5 options

#Inserting math questions
INSERT INTO questions (statement,id_topic,id_category,id_options)
VALUES('¿Cuál es el nombre del dispositivo de cálculo manual que consiste en bolas móviles?',1,1,1),
('¿Cuál es el número primo más pequeño?',1,2,2),
('¿Cuál es el valor aproximado del número PI?',1,3,3),
('¿Cuánto te da si sumas los números 1-100 consecutivamente (1 + 2 + 3 + 4 + 5…)?',1,4,4),
('Un objeto es fractal cuando...',1,5,5);

#Inserting 'lengua' questions
INSERT INTO questions (statement,id_topic,id_category,id_options)
VALUES('¿Qué es la narración?',2,1,6),
('¿Qué es un diptongo?',2,2,7),
('Un triptongo es...',2,3,8),
('¿Qué caracteriza al Renacimiento?',2,4,9),
('¿A quién se considera el primer gran escritor de la Edad Media?',2,5,10);

#Inserting English questions
INSERT INTO questions (statement,id_topic,id_category,id_options)
VALUES('Traduzca al inglés el siguiente verbo "Vender":',3,1,11),
('Indique cuál es el pasado simple del verbo "Add":',3,2,12),
('Rellene el hueco de la frase traducida al inglés "Conozco a mucha gente de la universidad" I ____ a lot of people at University:',3,3,13),
('Indique cual es el verbo pasado y participio del verbo "Tear":',3,4,14),
('Indique cómo se escribe correctamente en inglés la expresión "Dejar las cosas claras con alguien":',3,5,15);

#Inserting science questions
INSERT INTO questions (statement,id_topic,id_category,id_options)
VALUES('¿Cuántas fases tiene el ciclo lunar?',4,1,16),
('¿Cuál es el país más grande del mundo?',4,2,17),
('¿Qué es un proton?',4,3,18),
('¿Cuál es el elemento químico más denso?',4,4,19),
('¿De qué está compuesta la lluvia ácida?',4,5,20);

#Inserting general culture questions
INSERT INTO questions (statement,id_topic,id_category,id_options)
VALUES('¿Cuántos tentáculos tiene un calamar?',5,1,21),
('¿Cuál es el idioma oficial de Brasil?',5,2,22),
('Deberíamos tomar antibióticos...',5,3,23),
('Aproximadamente, ¿qué porcentaje de la superficie de la Tierra es agua?',5,4,24),
('¿Quién era el dios romano de la guerra?',5,5,25);

#Printing questions
#SELECT q.id AS ID, q.statement AS Statement, o.opt_one AS A, o.opt_two AS B, o.opt_three AS C, o.opt_four AS C, c.name AS Category,
#t.name AS Topic
#FROM questions q
#	INNER JOIN questions_options o ON q.id_options = o.id
#    INNER JOIN categories c ON q.id_category = c.id
#    INNER JOIN topics t ON q.id_topic = t.id
#WHERE c.id = 1;

