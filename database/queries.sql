drop table if exists students;
create table students (
	uid serial primary key,
	nombre varchar(60),
	rut varchar(10),
	curso varchar(50),
	nivel varchar(50)
);

insert into students (nombre,rut,curso,nivel) values
('María García', '12345678-9', 'guitarra', '1'),
('Juan Pérez', '98765432-1', 'piano', '4'),
('Ana Sánchez', '45678901-2', 'violin', '5');

select * from students;