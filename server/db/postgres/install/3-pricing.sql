CREATE TABLE pricing (
  property varchar not null,
  value text not null,
  created_at date,
  updated_at date,
  deleted_at date,
  PRIMARY KEY(property)
)
WITH (
  OIDS=FALSE
) ;
