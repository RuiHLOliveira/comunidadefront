<style scoped>

.curso {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
  margin-top: 40px;
}
.cursoNome{
  margin-bottom: 20px;
  text-align: center;
}
.cursoConteudo{
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

.modulo{
  background-color: rgb(14, 14, 14);
  padding: 20px 20px;
  border-radius: 5px;
  .nomeModulo{
    font-size: 1.3rem;
  }
}

</style>

<template>
  <div>
    <div class="container">

      <div class="position_sticky py-10 div_border_bottom_gray darkmodeBgBlack">
        <!-- HEADER -->
        <section class="my-5 py-5 px-10 flex justify-spacebetween alignitens-center">
          <div class="flex alignitens-center">
            <h1>Bem vindo de volta, mentorado!</h1>
            <div>
              <router-link to='/cursos' class="btn ml-15 mr-10 my-5 flex-center-combo" style="display: inline-flex;">
                <i class="fi fi-rr-arrow-small-left"></i>
                <span class="ml-5">Voltar</span>
              </router-link>
            </div>
          </div>
          <div>
            lateral
          </div>
        </section>

      </div>

      <div>

          <div class="my-5 py-5" v-if="busyCursosLoad">
            <InlineLoader
              :textoAguarde="true"
              :busy="busyCursosLoad"
              :center="true">
            </InlineLoader>
          </div>

          <div v-if="curso != [] && !busyCursosLoad">
            <section>
              <div class="curso flex-column">
                <div class="cursoNome">
                  <h1 v-if="!editarNomeCurso"> {{ curso.nome }} </h1>
                  
                  <div class="cursoNomeEdicao" v-if="editarNomeCurso">
                    Editar nome do Curso:
                    <input type="text" name="" id="" v-model="curso.nome" :disabled="busyCursoEditar">
                    <InlineLoader
                      :textoAguarde="true"
                      :busy="busyCursoEditar"
                      :center="true">
                    </InlineLoader>
                  </div>

                  <div v-if="!editarNomeCurso">
                    <button type="button" class="btn btn-sm mr-20" @click="toggleEditarNome()">
                      <i class="fi fi-rr-edit"></i> Editar
                    </button>
                    <button type="button" class="btn btn-sm" @click="toggleCriarModulo()">
                      <i class="fi fi-rr-plus"></i> Criar Modulo
                    </button>
                  </div>
                  <div v-if="editarNomeCurso" class="mt-20">
                    <button type="button" :disabled="busyCursoEditar" class="btn btn-sm mr-20" @click="toggleEditarNome()">
                      <i class="fi fi-rr-arrow-small-left"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyCursoEditar" class="btn btn-sm" @click="salvarEdicaoNomeCurso()">
                      <i class="fi fi-rr-disk"></i> Salvar
                    </button>
                  </div>
                </div>

                <div v-if="criarModulo">
                  Nome do Módulo: 
                  <input type="text" name="" id="" v-model="nomeNovoModulo" :disabled="busyModuloCriar">
                  <div class="mt-10">
                    <button type="button" :disabled="busyModuloCriar" class="btn btn-sm mr-20" @click="toggleCriarModulo()">
                      <i class="fi fi-rr-arrow-small-left"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyModuloCriar" class="btn btn-sm" @click="salvarNovoModulo()">
                      <i class="fi fi-rr-disk"></i> Salvar
                    </button>
                  </div>
                  <InlineLoader
                    :textoAguarde="true"
                    :busy="busyModuloCriar"
                    :center="true">
                  </InlineLoader>
                </div>
                
                <div class="mt-20" v-if="modulos != []">
                  <div v-for="modulo in modulos" class="modulo flex justify-spacebetween alignitens-center">
                    <div class="nomeModulo">
                      {{ modulo.nome }}
                    </div>
                    <router-link to='/modulos/modulo/x' class="btn ml-15 flex-center-combo"
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
import { CursosStorage } from '@/core/storage/CursosStorage.js'
import { ModulosStorage } from '@/core/storage/ModulosStorage.js'
import { ComentariosStorage } from '@/core/storage/ComentariosStorage.js'
import { MdHtmlConverter } from '@/core/MdHtmlConverter.js'
import UrlBuilder from '../../core/urlBuilder';

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

      busyCursosLoad: false,
      busyCursoEditar: false,

      busyModulosLoad: false,
      busyModuloCriar: false,

      editarNomeCurso: false,
      criarModulo: false,
      nomeNovoModulo: '',

      modulos: [],
      curso: [],
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


    getCursoUrl(projeto) { return UrlBuilder.getCursoUrl(projeto); },
    toggleEditarNome() { this.editarNomeCurso = !this.editarNomeCurso },
    toggleCriarModulo() { this.criarModulo = !this.criarModulo },

    salvarEdicaoNomeCurso(){
      this.busyCursoEditar = true;
      CursosStorage.editar(this.curso)
      .then(([response, data]) => {
        this.busyCursoEditar = false;
        this.$refs.notifier.notify(`Nome do curso atualizado.`)
        this.toggleEditarNome();
        this.buscaCurso()
      })
      .catch((error) => {
        this.busyCursoEditar = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    salvarNovoModulo(){
      this.busyModuloCriar = true;
      ModulosStorage.criar(this.curso.id, this.nomeNovoModulo)
      .then(([response, data]) => {
        this.busyModuloCriar = false;
        this.$refs.notifier.notify(`Modulo criado.`);
        this.nomeNovoModulo = '';
        this.toggleCriarModulo();
        this.buscaCurso();
      })
      .catch((error) => {
        this.busyModuloCriar = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    buscaCurso () {
      this.busyCursosLoad = true;
      CursosStorage.index()
      .then(([response, data]) => {
        const idCurso = this.$route.params.idCurso
        data = data.filter(c => {return c.id == idCurso});
        console.log({data});
        this.curso = data[0];
        this.buscarModulosDoCurso()
        this.busyCursosLoad = false;
      })
      .catch((error) => {
        this.busyCursosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    buscarModulosDoCurso () {
      this.busyModulosLoad = true;
      ModulosStorage.index(this.curso.id)
      .then(([response, data]) => {
        console.log({data});
        this.modulos = data;
        this.busyModulosLoad = false;
      })
      .catch((error) => {
        this.busyModulosLoad = false;
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
    this.buscaCurso(true);
    // this.buscaTags();
  },
}
</script>
