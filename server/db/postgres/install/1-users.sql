CREATE TABLE users (
	id serial NOT NULL,
	username varchar NOT NULL,
	password varchar NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
)
WITH (
	OIDS=FALSE
) ;
