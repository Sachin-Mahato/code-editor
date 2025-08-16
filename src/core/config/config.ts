type ConfigType = {
    registerUrl: string;
    loginUrl: string;
    me: string;
    files: string;
    updateFiles: string;
    getUpdateFileUrl: (id: string) => string;
};

const Config: ConfigType = {
    registerUrl: import.meta.env.VITE_REGISTER_URL,
    loginUrl: import.meta.env.VITE_LOGIN_URL,
    me: import.meta.env.VITE_GETME_URL,
    files: import.meta.env.VITE_GETALL_FILES_URL,
    updateFiles: import.meta.env.VITE_UPDATAFILES_URL,
    getUpdateFileUrl: (id: string) =>
        `${import.meta.env.VITE_UPDATE_FILES_URL}/${id}`,
};

export default Config;
