USE cocomo;

CREATE TABLE IF NOT EXISTS calc_models (
    id INT(11) AUTO_INCREMENT NOT NULL,
    user_id INT(11),
    kloc FLOAT,
    project_type VARCHAR(255) NOT NULL,
    saving_type VARCHAR(255) NOT NULL,
    rating_attr JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);