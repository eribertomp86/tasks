CREATE DATABASE tareasdb;

USE dbtasks;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(200) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'a', '12345', 'A name');

SELECT * FROM users;

-- TASKS TABLE
CREATE TABLE tareas (
  id INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  time date,
  userid INT(11),
 
  CONSTRAINT fk_user FOREIGN KEY(userid) REFERENCES users(id)
);

ALTER TABLE tareas
  ADD PRIMARY KEY (id);

ALTER TABLE tareas
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE tareas;