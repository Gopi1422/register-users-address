# Register Users and their Addresses with Passport Login

A NodeJS app where users can register and store their addresses in separate table (one to many relationship) with passport authentication. 

* There are two tables: User and Address. 
* There will be one to many relationships between users and addresses. 
* **Server:** Node JS, Express JS
* **Database:** Postgres (Relational Database)

## Run Locally

1. Download Postgresql Database from https://www.postgresql.org/download and set up it locally. 

2. Create a database in postgres and connect to the new `test_users` database
```bash
  CREATE DATABASE test_users;
  \c test_users;
```

3. Create tables in Postgres
```bash
  CREATE TABLE users(
  	id SERIAL PRIMARY KEY,
  	name VARCHAR(100) NOT NULL,
  	email VARCHAR(80) NOT NULL,
	  password VARCHAR(200) NOT NULL,
	  UNIQUE (email)
);

CREATE TABLE address (
  	id SERIAL PRIMARY KEY,
  	user_id SERIAL,
  	address VARCHAR(200) NOT NULL,
	  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  		REFERENCES users(id)
			  ON DELETE CASCADE
);
```

4. Clone the project

```bash
  https://github.com/Gopi1422/register-users-address.git
```

5. Go to the project directory

```bash
  cd register-users-address
```

6. Install dependencies

```bash
  npm install
```

7. Create  `.env` file, and include information mention in `.env.example` file

8. Start the server

```bash
  npm start
```

## Screenshots

Register User and Address
![Output-1](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/1.png)
![Output-2](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/2.png)
![Output-3](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/3.png)
![Output-4](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/4.png)
![Output-5](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/8.png)
![Output-6](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/9.png)

Login
![Output-7](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/5.png)

View Registered Address
![Output-8](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/6.png)
![Output-9](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/10.png)

### Records in Database

![Output-11](https://github.com/Gopi1422/register-users-address/blob/580a41ec7aa5d36cb0777800c922035f5a8ebd84/screenshots/11.png)
