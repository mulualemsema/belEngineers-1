DROP TABLE IF EXISTS customer_message CASCADE;

CREATE TABLE customer_message (
                         id BIGSERIAL PRIMARY KEY ,
                         user_name VARCHAR(255),
                         email VARCHAR(255),
                         phone VARCHAR(255),
                         message TEXT,
                         create_timestamp TIMESTAMP WITHOUT TIME ZONE
);
