module.exports = {
    HOST: "13.53.216.3",
    USER: "robin_hood",
    PASSWORD: "robin_hood",
    DB: "pos-server",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
