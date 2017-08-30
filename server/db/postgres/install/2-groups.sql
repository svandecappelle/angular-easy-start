CREATE TABLE groups (
  id serial NOT NULL,
  name varchar NOT NULL,
  CONSTRAINT groups_pk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
CREATE TABLE user_groups (
  group_id int not null REFERENCES groups(id),
  user_id int not null REFERENCES users(id),
  created_at date,
  updated_at date,
  deleted_at date,
  PRIMARY KEY(group_id , user_id)
)
WITH (
  OIDS=FALSE
);
