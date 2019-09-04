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
    KATSU: uuid.v4(),
    KEY: uuid.v4(),
    JUSTIN: uuid.v4(),
    CHARM: uuid.v4(),
    KISTINA: uuid.v4(),
    DIANE: uuid.v4(),
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
        bio VARCHAR(255) DEFAULT 'User has not yet added their bio...',
        department_id UUID references departments(id)
    );
    ${ Object.keys(departmentsID).map(dept => `INSERT INTO departments(id, name) values('${departmentsID[dept]}', '${dept}');`).join('')}
    INSERT INTO users(id, name, department_id) values ('${usersID.MOE}', 'MOE', '${departmentsID.HR}');
    INSERT INTO users(id, name, department_id) values ('${usersID.LARRY}', 'LARRY', '${departmentsID.SALES}');
    INSERT INTO users(id, name, department_id) values ('${usersID.KATSU}', 'KATSU', '${departmentsID.MARKETING}');
    INSERT INTO users(id, name, department_id) values ('${usersID.KEY}', 'KEY', '${departmentsID.IT}');
    INSERT INTO users(id, name, department_id) values ('${usersID.JUSTIN}', 'JUSTIN', '${departmentsID.IT}');
    INSERT INTO users(id, name, department_id) values ('${usersID.CHARM}', 'CHARM', '${departmentsID.IT}');
    INSERT INTO users(id, name, department_id) values ('${usersID.KISTINA}', 'KISTINA', '${departmentsID.HR}');
    INSERT INTO users(id, name) values ('${usersID.DIANE}', 'DIANE');
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
