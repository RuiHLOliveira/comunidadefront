import config from "./config";
import QueryStringConverter from '@/core/QueryStringConverter.js';

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
        let params = {
            'idCurso': modulo.curso.id
        }
        params = QueryStringConverter.toQueryString(params, true);
        return this.defaultGetUrl('/modulos/modulo/', modulo.id, fullpath) + params
    },
    getAulaUrl(aula, fullpath = false) {
        let params = {
            'idCurso': aula.modulo.curso.id,
            'idModulo': aula.modulo.id
        }
        params = QueryStringConverter.toQueryString(params, true);
        return this.defaultGetUrl('/aulas/aula/', aula.id, fullpath) + params
    },
    defaultGetUrl(url, id, fullpath = false) {
        let newUrl = url + id;
        if(fullpath) {
            newUrl = config.frontSubfolderUrl + newUrl;
        }
        return newUrl;
    },
}
