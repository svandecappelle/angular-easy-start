CREATE TABLE pricing (
  property varchar not null,
  value text not null,
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp,
  PRIMARY KEY(property)
)
WITH (
  OIDS=FALSE
) ;
