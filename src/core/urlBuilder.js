import config from "./config";

export default {
    getPostUrl(projeto, fullpath = false) {
        let url = '/posts/post/' + projeto.id;
        if(fullpath) {
            url = config.frontSubfolderUrl + url;
        }
        return url;
    },
    getProjetoUrl(projeto, fullpath = false) {
        let url = '/projetosListV2/projeto/' + projeto.id;
        if(fullpath) {
            url = config.frontSubfolderUrl + url;
        }
        return url;
    },
    getCursoUrl(curso, fullpath = false) {
        let url = '/cursos/curso/' + curso.id;
        if(fullpath) {
            url = config.frontSubfolderUrl + url;
        }
        return url;
    },
    getModuloUrl(modulo, fullpath = false) {
        console.log('getModuloUrlmodulo',modulo)
        const url = '/modulos/modulo/';
        const querystring = '?idCurso='+modulo.curso.id;
        return this.defaultGetUrl(url, modulo.id, fullpath)+querystring
    },
    defaultGetUrl(url, id, fullpath = false) {
        let newUrl = url + id;
        if(fullpath) {
            newUrl = config.frontSubfolderUrl + newUrl;
        }
        return newUrl;
    },
}
