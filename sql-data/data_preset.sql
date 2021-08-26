DROP TABLE IF EXISTS status_dict;

CREATE TABLE status_dict
(
    statusId   INT PRIMARY KEY NOT NULL,
    statusName TEXT            NOT NULL
);

INSERT INTO status_dict (statusId, statusName)
VALUES (0, 'Open'),
       (1, 'In Progress'),
       (2, 'Done');