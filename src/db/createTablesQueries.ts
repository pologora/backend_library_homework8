const createBooksTableQuery = `CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    UNIQUE(title, author)
)`;

const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
`;

const createOrdersTableQuery = `CREATE TABLE IF NOT EXIST orders
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(id)
`;

const createOrderDetailsTableQuery = `CREATE TABLE IF NOT EXIST order_details
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(5,2),
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(book_id) REFERENCES books(id),

`;

const createCartTableQuery = `CREATE TABLE IF NOT EXIST carts


`;
