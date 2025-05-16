export const productModelTable = 
    `CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC NOT NULL,
        file_url VARCHAR(255),
        category_id INT REFERENCES categories(id)
        ON DELETE CASCADE 
        ON UPDATE NO ACTION
    )`