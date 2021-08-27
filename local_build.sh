# Start up the pgsql and pgadmin container
docker-compose up db pgadmin;

# Connect to the pgsql container
docker exec -it pg_container bash

# Connect the pgsql database
psql postgres://root:root@localhost:5432/taskmanagement

# Execute the sql script to initialize the database
\i /sql-data/data_preset.sql