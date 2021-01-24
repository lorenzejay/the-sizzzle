CREATE DATABASE RecipeGram;

--download extension--
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profilePic VARCHAR(300) DEFAULT ''
);

ALTER TABLE users
ALTER COLUMN profilePic
SET DEFAULT '';

--insert dummy data
INSERT INTO users(username, first_name, last_name, email, password) VALUES ('John Doe', 'John', 'Doe', 'johndoe@example.com','123456' );

CREATE TABLE recipes(
    recipe_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    media VARCHAR(255)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE ingredients(
    ingredients_id SERIAL PRIMARY KEY,
    ingredient VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_recipes
    FOREIGN KEY(recipe_id)
    REFERENCES recipes(recipe_id)
    
)

CREATE TABLE saved_recipes(
    id SERIAL PRIMARY KEY,
    user_Id INT NOT NULL,
    recipe_Id INT NOT NULL,
    FOREIGN KEY (user_Id) REFERENCES user(id),
    FOREIGN KEY (recipe_Id) REFERENCES recipe(id)
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    recipe_id int NOT NULL,
    user_id uuid NOT NULL,
    isReply boolean,
    FOREIGN KEY (user_Id) REFERENCES user(id),
    FOREIGN KEY (recipe_Id) REFERENCES recipe(id)
)

ALTER TABLE comments
ALTER COLUMN isReply
SET DEFAULT false