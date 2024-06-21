export const getToken = () => {
    const root = localStorage.getItem('persist:root');
    if(!root) return null;
    return  JSON.parse(JSON.parse(root).auth).token;
}