CREATE TABLE pricing (
  property text not null,
  value text not null,
  created_at date,
  updated_at date,
  deleted_at date,
  PRIMARY KEY(property)
)
WITH (
  OIDS=FALSE
) ;
