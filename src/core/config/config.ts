type ConfigType = {
    registerUrl: string;
    loginUrl: string;
    me: string;
    files: string;
};

const Config: ConfigType = {
    registerUrl: import.meta.env.VITE_REGISTER_URL,
    loginUrl: import.meta.env.VITE_LOGIN_URL,
    me: import.meta.env.VITE_GETME_URL,
    files: import.meta.env.VITE_GETALL_FILES_URL,
};

export default Config;
