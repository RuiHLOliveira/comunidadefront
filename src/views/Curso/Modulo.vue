<style scoped>

.breadcrumbs{
  background-color: var(--darkmode-bg-color);
  padding: 5px 5px;
  border-radius: 5px;
}
.modulo {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
}
.moduloNome{
  margin-bottom: 20px;
}
.moduloConteudo{
  /* height:     100px;
  max-height: 100px;
  overflow-y: hidden; */
}
.comentariosTitle {
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--darkmode-border-gray);
}
.textarea-oneline{
  width: 100%;
  max-width: 100%;
  min-width: 10%;
}

.aula{
  background-color: rgb(14, 14, 14);
  padding: 20px 20px;
  border-radius: 5px;
  .nomeAula{
    font-size: 1.3rem;
  }
}

</style>

<template>
  <div>
    <div class="container">

      <div class="position_sticky py-10 darkmodeBgBlack">
        <!-- HEADER -->
        <section class="my-5 py-5 px-10 flex justify-spacebetween alignitens-center">
          <div class="flex alignitens-center">
            <h1>Bem vindo de volta, mentorado!</h1>
          </div>
          <div>
            <!-- lateral -->
          </div>
        </section>

      </div>

      <div>

          <div class="my-5 py-5" v-if="busyModulosLoad">
            <InlineLoader
              :textoAguarde="true"
              :busy="busyModulosLoad"
              :center="true">
            </InlineLoader>
          </div>

          <div v-if="modulo != [] && !busyModulosLoad">
            <section>
              <div class="modulo flex-column">
                <div class="mb-20">
                  <span class="breadcrumbs">
                    Cursos > 
                    <router-link :to='getCursoUrl()'>
                      {{ modulo.curso.nome }}
                    </router-link>
                  </span>
                </div>

                <div class="moduloNome flex justify-spacebetween alignitens-center" v-if="!editarNomeModulo">
                  <!-- NOME DO MODULLO -->
                  <div class="flex alignitens-center">
                    <!-- <div>
                      <router-link :to='getCursoUrl()' class="btn btn-sm mr-10 my-5 flex-center-combo" style="display: inline-flex;">
                        <i class="fi fi-rr-arrow-small-left"></i>
                        <span class="ml-5">Voltar</span>
                      </router-link>
                    </div> -->
                    <h1>
                      {{ modulo.nome }}
                    </h1>
                  </div>
                  <!-- BOTOES DO CURSO -->
                  <div>
                    <button type="button" class="btn btn-sm mr-20" @click="toggleEditarNome()">
                      <i class="fi fi-rr-edit"></i> Editar
                    </button>
                    <button type="button" class="btn btn-sm" @click="toggleCriarAula()">
                      <i class="fi fi-rr-plus"></i> Criar Aula
                    </button>
                  </div>
                </div>

                <!-- EDIÇÃO DO NOME DO CURSO -->
                <div class="moduloNomeEdicao" v-if="editarNomeModulo">
                  Editar nome do Modulo:
                  <input type="text" name="" id="" v-model="modulo.nome" :disabled="busyModuloEditar">
                  <div class="mt-20">
                    <button type="button" :disabled="busyModuloEditar" class="btn btn-sm mr-20" @click="toggleEditarNome()">
                      <i class="fi fi-rr-arrow-small-left"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyModuloEditar" class="btn btn-sm" @click="salvarEdicaoNomeModulo()">
                      <i class="fi fi-rr-disk"></i> Salvar
                    </button>
                  </div>
                  <InlineLoader
                    :textoAguarde="true"
                    :busy="busyModuloEditar"
                    :center="true">
                  </InlineLoader>
                </div>

                <InlineLoader
                  :textoAguarde="true"
                  :busy="busyAulaCriar || busyAulasLoad"
                  :center="true">
                </InlineLoader>

                <!-- CRIAR AULA -->
                <div v-if="criarAula">
                  Nome do Módulo: 
                  <input type="text" name="" id="" v-model="nomeNovoAula" :disabled="busyAulaCriar">
                  <input type="text" name="" id="" v-model="urlNovoAula" :disabled="busyAulaCriar">
                  <div class="mt-10">
                    <button type="button" :disabled="busyAulaCriar" class="btn btn-sm mr-20" @click="toggleCriarAula()">
                      <i class="fi fi-rr-arrow-small-left"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyAulaCriar" class="btn btn-sm" @click="salvarNovoAula()">
                      <i class="fi fi-rr-disk"></i> Salvar
                    </button>
                  </div>
                </div>

                <div class="mt-20" v-if="aulas != []">
                  <div v-for="aula in aulas" class="aula flex justify-spacebetween alignitens-center">
                    <div class="nomeAula">
                      {{ aula.nome }}
                    </div>
                    <router-link :to='getAulaUrl(aula)' class="btn ml-15 flex-center-combo"
                      style="line-height: 0; display: inline-flex;">
                      <i class="fi fi-rr-folder-open"></i>
                    </router-link>
                  </div>
                </div>
              </div>
            </section>
          </div>
      </div>


  </div>

    <Notifier ref="notifier"></Notifier>

  </div>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import Loader from '@/components/Loader.vue';
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import { ModulosStorage } from '@/core/storage/ModulosStorage.js'
import { AulasStorage } from '@/core/storage/AulasStorage.js'
import { ComentariosStorage } from '@/core/storage/ComentariosStorage.js'
import { MdHtmlConverter } from '@/core/MdHtmlConverter.js'
import UrlBuilder from '../../core/urlBuilder';
import urlBuilder from '../../core/urlBuilder';

export default {
  name: 'HabitTracker',
  components: {
    Loader,
    InlineLoader,
    Notifier,
  },
  inject: ['configuracoes'],
  data: () => {
    return {
      windowWidth: 0,
      windowHeight: 0,

      busyModulosLoad: false,
      busyModuloEditar: false,

      busyAulasLoad: false,
      busyAulaCriar: false,

      editarNomeModulo: false,
      criarAula: false,
      nomeNovoAula: '',
      urlNovoAula: '',

      aulas: [],
      modulo: [],
    }
  },
  computed: {
    isSmallScreen() {
      return this.windowWidth < 800
    },
  },
  methods: {
    
    /** 
     * FUNCOES HELPER IMPORTADAS
    */
    formatDevDate(dateObject){return DateTime.formatDevDate(dateObject);},
    formatBrDate(dateObject){return DateTime.formatBrDate(dateObject);},
    getWeekDay(dateObject){return DateTime.getWeekDay(dateObject);},
    getWeekDayFirstLetter(dateObject){return DateTime.getWeekDayFirstLetter(dateObject);},
    getYear(dateObject){return DateTime.getYear(dateObject);},
    getMonth(dateObject){return DateTime.getMonth(dateObject);},
    getDate(dateObject){return DateTime.getDate(dateObject);},
    getWeekDayNumber(dateObject){return DateTime.getWeekDayNumber(dateObject);},
    newDatetimeTz(dateString){return DateTime.newDatetimeTz(dateString);},
    isSameYMD(date1, date2){return DateTime.isSameYMD(date1, date2);},

    getCursoUrl() { return urlBuilder.getCursoUrl({'id':this.getIdCurso()}); },
    getModuloUrl(modulo) { return UrlBuilder.getModuloUrl(modulo); },
    getAulaUrl(aula) { console.log('aula get aula url', aula);return UrlBuilder.getAulaUrl(aula); },

    toggleEditarNome() { this.editarNomeModulo = !this.editarNomeModulo },
    toggleCriarAula() { this.criarAula = !this.criarAula },

    salvarEdicaoNomeModulo(){
      this.busyModuloEditar = true;
      ModulosStorage.editar(this.getIdCurso(), this.modulo.id, this.modulo.nome)
      .then(([response, data]) => {
        this.busyModuloEditar = false;
        this.$refs.notifier.notify(`Nome do modulo atualizado.`)
        this.toggleEditarNome();
        this.buscarModulo()
      })
      .catch((error) => {
        this.busyModuloEditar = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    salvarNovoAula(){
      this.busyAulaCriar = true;
      AulasStorage.criar(this.modulo.id, this.nomeNovoAula, this.urlNovoAula)
      .then(([response, data]) => {
        this.busyAulaCriar = false;
        this.$refs.notifier.notify(`Aula criado.`);
        this.nomeNovoAula = '';
        this.urlNovoAula = '';
        this.toggleCriarAula();
        this.buscarModulo();
      })
      .catch((error) => {
        this.busyAulaCriar = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    getIdCurso () {
      if(this.idCurso == null) {
        this.idCurso = this.$route.query.idCurso
      }
      return this.idCurso;
    },

    buscarModulo () {
      this.busyModulosLoad = true;
      ModulosStorage.index(this.getIdCurso())
      .then(([response, data]) => {
        const idModulo = this.$route.params.idModulo
        data = data.filter(c => {return c.id == idModulo});
        console.log({data});
        this.modulo = data[0];
        this.buscarAulasDoModulo()
        this.busyModulosLoad = false;
      })
      .catch((error) => {
        this.busyModulosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    buscarAulasDoModulo () {
      this.busyAulasLoad = true;
      AulasStorage.index(this.modulo.id)
      .then(([response, data]) => {
        console.log({data});
        this.aulas = data;
        this.busyAulasLoad = false;
      })
      .catch((error) => {
        this.busyAulasLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },
    
    getDimensions() {
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
    },

  },
  watch: {
    configuracoes(a, b) {
      // do something
    },
    $route (to, from){
    }
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions);
    this.getDimensions()
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions);
  },
  created () {
    this.buscarModulo(true);
    // this.buscaTags();
  },
}
</script>
