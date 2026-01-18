<style scoped>

.breadcrumbs{
  background-color: var(--darkmode-bg-color);
  padding: 5px 5px;
  border-radius: 5px;
}
.aula {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
}
.aulaNome{
  margin-bottom: 20px;
}
.aulaConteudo{
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

.filho{
  background-color: rgb(14, 14, 14);
  padding: 20px 20px;
  border-radius: 5px;
  .nomeFilho{
    font-size: 1.3rem;
  }
}

.iframe-aula{
  width: 100%;
  aspect-ratio: 16 / 9; /* Mantém a proporção padrão do YouTube */
  height: auto;
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
            lateral
          </div>
        </section>

      </div>

      <div>

          <div class="my-5 py-5" v-if="busyAulasLoad">
            <InlineLoader
              :textoAguarde="true"
              :busy="busyAulasLoad"
              :center="true">
            </InlineLoader>
          </div>

          <div v-if="aula != [] && !busyAulasLoad">
            <section>
              <div class="aula flex-column">
                
                <div class="mb-20">
                  <span class="breadcrumbs">
                    Cursos
                    > 
                    <router-link :to='getCursoUrl()'>
                      {{ aula.modulo.curso.nome }}
                    </router-link>
                    >
                    <router-link :to='getModuloUrl()'>
                      {{ aula.modulo.nome }}
                    </router-link>
                  </span>
                </div>

                <div class="aulaNome flex justify-spacebetween alignitens-center" v-if="!editarNomeAula">
                  <!-- NOME DA AULA -->
                  <div class="flex alignitens-center">
                    <!-- <div>
                      <router-link :to='getModuloUrl()' class="btn btn-sm mr-10 my-5 flex-center-combo" style="display: inline-flex;">
                        <i class="fi fi-rr-arrow-small-left"></i>
                        <span class="ml-5">Voltar</span>
                      </router-link>
                    </div> -->
                    <h1>
                      {{ aula.nome }}
                    </h1>
                  </div>
                  <!-- BOTOES DA AULA -->
                  <div>
                    <button type="button" class="btn btn-sm mr-20" @click="toggleEditarNome()">
                      <i class="fi fi-rr-edit"></i> Editar
                    </button>
                    <button type="button" class="btn btn-sm" @click="toggleCriarFilho()">
                      <i class="fi fi-rr-plus"></i> Criar Filho
                    </button>
                  </div>
                </div>
                
                <!-- EDIÇÃO DO NOME DA AULA -->
                <div class="aulaNomeEdicao" v-if="editarNomeAula">
                  Editar nome do Aula:
                  <input type="text" name="" id="" v-model="aula.nome" :disabled="busyAulaEditar">
                  <input type="text" name="" id="" v-model="aula.url" :disabled="busyAulaEditar">
                  <div v-if="editarNomeAula" class="mt-20">
                    <button type="button" :disabled="busyAulaEditar" class="btn btn-sm mr-20" @click="toggleEditarNome()">
                      <i class="fi fi-rr-arrow-small-left"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyAulaEditar" class="btn btn-sm" @click="salvarEdicaoNomeAula()">
                      <i class="fi fi-rr-disk"></i> Salvar
                    </button>
                  </div>
                  <InlineLoader
                    :textoAguarde="true"
                    :busy="busyAulaEditar"
                    :center="true">
                  </InlineLoader>
                </div>

                <InlineLoader
                  :textoAguarde="true"
                  :busy="busyFilhoCriar || busyFilhosLoad"
                  :center="true">
                </InlineLoader>

                
                <div class="mt-20">
                  <iframe class="iframe-aula" :src='aula.url'
                      :title='aula.nome' frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
import { AulasStorage } from '@/core/storage/AulasStorage.js'
// import { FilhosStorage } from '@/core/storage/FilhosStorage.js'
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

      busyAulasLoad: false,
      busyAulaEditar: false,

      busyFilhosLoad: false,
      busyFilhoCriar: false,

      editarNomeAula: false,
      criarFilho: false,
      nomeNovoFilho: '',
      urlNovoFilho: '',

      idCurso: null,
      idModulo: null,
      idAula: null,

      filhos: [],
      aula: [],
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
    getModuloUrl() { return urlBuilder.getModuloUrl({'id':this.getIdModulo(), 'curso': {'id': this.getIdCurso()}}); },
    getAulaUrl(projeto) { return UrlBuilder.getAulaUrl(projeto); },
    
    toggleEditarNome() { this.editarNomeAula = !this.editarNomeAula },
    toggleCriarFilho() { this.criarFilho = !this.criarFilho },

    salvarEdicaoNomeAula(){
      this.busyAulaEditar = true;
      AulasStorage.editar(this.getIdModulo(), this.aula.id, this.aula.nome, this.aula.url)
      .then(([response, data]) => {
        this.busyAulaEditar = false;
        this.$refs.notifier.notify(`Nome do aula atualizado.`)
        this.toggleEditarNome();
        this.buscarAula()
      })
      .catch((error) => {
        this.busyAulaEditar = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    // salvarNovoFilho(){
    //   this.busyFilhoCriar = true;
    //   FilhosStorage.criar(this.aula.id, this.nomeNovoFilho, this.urlNovoFilho)
    //   .then(([response, data]) => {
    //     this.busyFilhoCriar = false;
    //     this.$refs.notifier.notify(`Filho criado.`);
    //     this.nomeNovoFilho = '';
    //     this.urlNovoFilho = '';
    //     this.toggleCriarFilho();
    //     this.buscarAula();
    //   })
    //   .catch((error) => {
    //     this.busyFilhoCriar = false;
    //     this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
    //     console.error(error);
    //   });
    // },

    getIdCurso () {
      if(this.idCurso == null) {
        this.idCurso = this.$route.query.idCurso
      }
      return this.idCurso;
    },
    getIdModulo () {
      if(this.idModulo == null) {
        this.idModulo = this.$route.query.idModulo
      }
      return this.idModulo;
    },

    buscarAula () {
      this.busyAulasLoad = true;
      AulasStorage.index(this.getIdModulo())
      .then(([response, data]) => {
        const idAula = this.$route.params.idAula
        data = data.filter(c => {return c.id == idAula});
        console.log({data});
        this.aula = data[0];
        this.buscarFilhosDoAula()
        this.busyAulasLoad = false;
      })
      .catch((error) => {
        this.busyAulasLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    buscarFilhosDoAula () {
      return;
      // this.busyFilhosLoad = true;
      // FilhosStorage.index(this.aula.id)
      // .then(([response, data]) => {
      //   console.log({data});
      //   this.filhos = data;
      //   this.busyFilhosLoad = false;
      // })
      // .catch((error) => {
      //   this.busyFilhosLoad = false;
      //   this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      //   console.error(error);
      // });
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
    this.buscarAula(true);
    // this.buscaTags();
  },
}
</script>
