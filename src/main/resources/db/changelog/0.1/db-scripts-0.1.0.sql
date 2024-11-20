DROP TABLE IF EXISTS customer_message CASCADE;

CREATE TABLE customer_message (
                         id BIGSERIAL NOT NULL,
                         user_name VARCHAR(255),
                         email VARCHAR(255),
                         phone VARCHAR(255),
                         message VARCHAR(255),
                         create_timestamp TIMESTAMP WITH TIME ZONE,
                         CONSTRAINT customer_message_pkey PRIMARY KEY (id)
);
