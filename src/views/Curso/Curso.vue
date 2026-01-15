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
                  <h1> {{ curso.nome }} </h1>
                </div>
                <!-- <div class="cursoConteudo whitespace-pre" v-html="curso.conteudoHtml"> </div>-->
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


    getCursoUrl(projeto) {
      return UrlBuilder.getCursoUrl(projeto);
    },

    buscaCurso () {
      this.busyCursosLoad = true;
      CursosStorage.index()
      .then(([response, data]) => {
        const idCurso = this.$route.params.idCurso
        data = data.filter(c => {return c.id == idCurso});
        console.log({data});
        // data.forEach(curso => {
        //   curso.conteudoHtml = MdHtmlConverter.convert(curso.conteudo);
        // });
        this.curso = data[0];
        this.busyCursosLoad = false;
      })
      .catch((error) => {
        this.busyCursosLoad = false;
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
