drop TABLE if exists names;
create table names(
	id serial not null primary key,
	user_name text not null,
	counter int
);


