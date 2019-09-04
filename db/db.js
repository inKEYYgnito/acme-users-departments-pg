const pg = require('pg')
const uuid = require('uuid')

const departmentsID = {
    HR: uuid.v4(),
    SALES: uuid.v4(),
    MARKETING: uuid.v4(),
    IT: uuid.v4()
}

const usersID = {
    MOE: uuid.v4(),
    LARRY: uuid.v4(),
    KATSU: uuid.v4()
}

const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS departments;
    CREATE TABLE departments (
        id UUID PRIMARY KEY,
        name VARCHAR(255)
    );
    CREATE TABLE users (
        id UUID PRIMARY KEY,
        name VARCHAR(255),
        department_id UUID references departments(id)
    );
    INSERT INTO departments(id, name) values('${departmentsID.HR}', 'HR');
    INSERT INTO users(id, name, department_id) values ('${usersID.MOE}', 'MOE', '${departmentsID.HR}');
`

const client = new pg.Client('postgres://localhost/acme_db')

client.connect();

const getUsers = async () => {
    return (await client.query('SELECT * from users')).rows
}

const getDepartments = async () => {
    return (await client.query('SELECT * from departments')).rows
}

const sync = async () => {
    await client.query(SQL)
}

module.exports = {
    sync,
    getDepartments,
    getUsers
}
