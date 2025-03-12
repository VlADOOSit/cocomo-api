CREATE USER IF NOT EXISTS 'vkharkivsk'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'vkharkivsk'@'localhost' WITH GRANT OPTION;
CREATE DATABASE IF NOT EXISTS cocomo;

USE cocomo;

CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT NOT NULL,
    login VARCHAR(31) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS calc_models (
    id INT(11) AUTO_INCREMENT NOT NULL,
    user_id INT(11) NOT NULL,
    kloc FLOAT NOT NULL,
    project_type VARCHAR(255) NOT NULL,
    saving_type VARCHAR(255) NOT NULL,
    rating_attr JSON,
    advancedFlag BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
