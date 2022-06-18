import pkg_json from '../package.json';

export const getSession: import('@sveltejs/kit').GetSession = () => {
    return {
        pkg: pkg_json
    }
}
