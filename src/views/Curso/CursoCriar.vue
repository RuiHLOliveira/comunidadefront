<style scoped>

.div-half{
  width:     50%;
  min-width: 50%;
  max-width: 50%;
  border-radius: 5px;
  border: 1px solid var(--darkmode-border-gray);
  margin-left: 5px;
  padding-left: 5px;
}

</style>

<template>
  <div>
    <div class="container">

      <div class="position_sticky py-10 div_border_bottom_gray darkmodeBgBlack">
        <!-- HEADER -->
        <section class="my-5 py-5 px-10 flex justify-spacebetween alignitens-center">
          <div class="flex alignitens-center">
            <h1>Crie seu curso, patrão!</h1>
            <div>
              <router-link to='/cursos' class="btn ml-15 mr-10 my-5 flex-center-combo" style="display: inline-flex;">
                <i class="fi fi-rr-arrow-small-left"></i>
                <span class="ml-5">Voltar</span>
              </router-link>
            </div>
          </div>
          <div>
            <button class="btn mx-10 my-5" type="button" 
              @click="salvarRascunho(projetoExibir)">
              salvarRascunho
            </button>
          </div>
        </section>

      </div>

      <div>
        <section class="pt-20">
          <div class="my-5 py-5" v-if="busyCursoSave">
            <InlineLoader
              :textoAguarde="true"
              :busy="busyCursoSave"
              :center="true">
            </InlineLoader>
          </div>

          <label for="nome">Título:</label>
          <input name="nome" type="text" placeholder="Título" v-model="nome">
        </section>

        <div class="my-5 py-5" v-if="busyCursoSave">
          <InlineLoader
            :textoAguarde="true"
            :busy="busyCursoSave"
            :center="true">
          </InlineLoader>
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
import BackupProjetos from "@/views/projetos/BackupProjetos.vue";
import { CursosStorage } from '@/core/storage/CursosStorage.js';

export default {
  name: 'Criar',
  components: {
    Loader,
    InlineLoader,
    BackupProjetos,
    Notifier,
  },
  inject: ['configuracoes'],
  data: () => {
    return {

      windowWidth: 0,
      windowHeight: 0,

      busyCursoSave: false,

      nome: '',
      conteudo: '',
      introducao: '',

    }
  },
  computed: {
    isSmallScreen() {
      return this.windowWidth < 800
    },
    introducaoHtml() {
      return this.mdToHtml(this.introducao);
    },
    conteudoHtml() {
      return this.mdToHtml(this.conteudo);
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

    salvarRascunho () {
      this.busyCursoSave = true;
      let curso = {
        'nome': this.nome,
      };
      CursosStorage.criar(curso)
      .then(([response, data]) => {
        console.log({data});
        this.$refs.notifier.notify(`Curso salvo!`);
        this.busyCursoSave = false;
      })
      .catch((error) => {
        this.busyCursoSave = false;
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
      // this.showProjetoFromQueryIdProjeto();
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
  },
}
</script>
