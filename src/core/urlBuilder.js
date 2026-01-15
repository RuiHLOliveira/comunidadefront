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
}
