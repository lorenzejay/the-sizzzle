CREATE DATABASE RecipeGram;

--download extension uuid--
-- needs to change varchar to 50 --
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

CREATE TABLE followers(
    followers_id SERIAL PRIMARY KEY,
    user_to uuid REFERENCES users(user_id) NOT NULL,
    user_from uuid REFERENCES users(user_id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO followers(user_to, user_from) VALUES ('7e253413-c371-4a3c-84bf-12ef45861795', '8e96a151-7882-4002-abb1-f1b3b411c754');

CREATE TABLE uploads(
    upload_id SERIAL PRIMARY KEY,
    uploaded_by uuid REFERENCES users(user_id) NOT NULL,
    title VARCHAR(50) NOT NULL,
    caption TEXT NOT NULL,
    description TEXT NOT NULL,
    cloudinary_id VARCHAR(128) NOT NULL,
    image_url VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE saved_uploads(
    saved_upload_id SERIAL PRIMARY KEY,
    saved_by uuid NOT NULL,
    upload_post SERIAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
alter table saved_uploads add foreign key(upload_post) references uploads(upload_id) on delete cascade;
alter table saved_uploads add foreign key(saved_by) references users(user_id) on delete cascade;


CREATE TABLE ingredients(
    ingredients_id SERIAL PRIMARY KEY,
    ingredient VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_recipes
    FOREIGN KEY(recipe_id)
    REFERENCES recipes(recipe_id)
    
)


CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    recipe_id int NOT NULL,
    user_id uuid NOT NULL,
    isReply boolean SET DEFAULT false,
    FOREIGN KEY (user_Id) REFERENCES user(id),
    FOREIGN KEY (recipe_Id) REFERENCES recipe(id)
)

-- ALTER TABLE comments
-- ALTER COLUMN isReply
-- SET DEFAULT false