const FE_URL = process.env.FE_URL;

const corsOptions = {
        origin: FE_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
        credentials: true, 
        optionsSuccessStatus: 204,
}

module.exports = corsOptions;