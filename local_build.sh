docker-compose up db pgadmin;
docker exec -it pg_container bash
psql postgres://root:root@localhost:5432/taskmanagement
\i /sql-data/data_preset.sql