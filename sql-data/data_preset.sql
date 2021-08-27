DROP TABLE IF EXISTS task_status;

-- Dict table to store task status mapping
CREATE TABLE task_status
(
    statusId   INT PRIMARY KEY NOT NULL,
    statusName TEXT            NOT NULL
);

INSERT INTO task_status (statusId, statusName)
VALUES (0, 'Open'),
       (1, 'In Progress'),
       (2, 'Done');