<style scoped>

/* gemini deixei de usar */
.breadcrumbs{
  background-color: var(--darkmode-bg-color);
  padding: 5px 5px;
  border-radius: 5px;
}
/* gemini deixei de usar */
.aula {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
}
/* gemini deixei de usar */
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

/* gemini deixei de usar */
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
  border-radius: 8px; /* gemini adicionei arredondamento */
  box-shadow: 0 4px 20px rgba(0,0,0,0.4); /* gemini adicionei sombra no player */
}

/* NOVAS CLASSES GEMINI - IDENTIDADE MODERN SCHOLAR */

.gemini-page-header {
  background: linear-gradient(135deg, #18181e 0%, #21212e 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  width: 100%;
}

.gemini-header-content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px;
}

.gemini-lesson-container {
  max-width: 1100px; /* Um pouco mais largo para o vídeo brilhar */
  margin: 40px auto;
  padding: 0 24px;
}

.gemini-lesson-card {
  background: #262631;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
}

.gemini-lesson-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #444daf;
  opacity: 0.6;
}

.gemini-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 24px;
  font-weight: 500;
}

.gemini-breadcrumb a {
  color: #444daf;
  text-decoration: none;
  transition: color 0.2s;
}

.gemini-breadcrumb a:hover {
  color: #535bc9;
}

.gemini-lesson-title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.gemini-lesson-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
}

/* BOTÕES E FORMULÁRIOS */

.gemini-btn-primary {
  background: #444daf;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

.gemini-btn-primary:hover {
  background: #535bc9;
  box-shadow: 0 4px 15px rgba(68, 77, 175, 0.4);
}

.gemini-btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #e0e0ff;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
}

.gemini-btn-secondary i {
  background: transparent !important;
}

.gemini-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.gemini-input-edit {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(68, 77, 175, 0.3);
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  margin: 12px 0;
}

.gemini-input-edit:focus {
  outline: none;
  border-color: #444daf;
  box-shadow: 0 0 0 3px rgba(68, 77, 175, 0.2);
}

.gemini-video-wrapper {
  background: rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

</style>

<template>
  <div>
    <div>

      <div class="py-10 gemini-page-header">
        <div class="gemini-header-content">
          <!-- HEADER -->
          <section class="my-5 py-5 flex justify-spacebetween alignitens-center">
            <div class="flex alignitens-center">
              <h1 style="font-weight: 800; letter-spacing: -0.5px; font-size: 2.2rem;">Bem vindo de volta, mentorado!</h1>
            </div>
            <div>
              <!-- lateral -->
            </div>
          </section>
        </div>
      </div>

      <div class="gemini-lesson-container">

          <div class="my-5 py-5" v-if="busyAulasLoad">
            <InlineLoader
              :textoAguarde="true"
              :busy="busyAulasLoad"
              :center="true">
            </InlineLoader>
          </div>

          <div v-if="aula != [] && !busyAulasLoad">
            <section>
              <div class="gemini-lesson-card">
                
                <div class="gemini-breadcrumb">
                  <router-link to='/cursos'>Cursos</router-link>
                  <i class="fi fi-rr-angle-small-right" style="font-size: 12px; margin-top: 2px;"></i>
                  <router-link :to='getCursoUrl()'>
                    {{ aula.modulo.curso.nome }}
                  </router-link>
                  <i class="fi fi-rr-angle-small-right" style="font-size: 12px; margin-top: 2px;"></i>
                  <router-link :to='getModuloUrl()'>
                    {{ aula.modulo.nome }}
                  </router-link>
                  <i class="fi fi-rr-angle-small-right" style="font-size: 12px; margin-top: 2px;"></i>
                  <span>{{ aula.nome }}</span>
                </div>

                <div class="gemini-lesson-title-section" v-if="!editarNomeAula">
                  <h1 class="gemini-lesson-title"> {{ aula.nome }} </h1>
                  <div class="flex">
                    <button type="button" class="gemini-btn-secondary mr-10" v-if="isAdmin" @click="toggleEditarNome()">
                      <i class="fi fi-rr-edit"></i> Editar
                    </button>
                    <!-- <button type="button" class="gemini-btn-primary" v-if="isAdmin" @click="toggleCriarFilho()">
                      <i class="fi fi-rr-plus"></i> Criar Filho
                    </button> -->
                  </div>
                </div>
                
                <!-- EDIÇÃO DO NOME DA AULA -->
                <div class="aulaNomeEdicao mb-24" v-if="editarNomeAula">
                  <div class="mb-15">
                    <span style="font-weight: 600; color: #888;">Título da Aula:</span>
                    <input type="text" class="gemini-input-edit" v-model="aula.nome" :disabled="busyAulaEditar">
                  </div>
                  <div class="mb-15">
                    <span style="font-weight: 600; color: #888;">URL da Aula:</span>
                    <input type="text" class="gemini-input-edit" v-model="aula.url" :disabled="busyAulaEditar">
                  </div>
                  <div class="flex mt-10">
                    <button type="button" :disabled="busyAulaEditar" class="gemini-btn-secondary mr-10" @click="toggleEditarNome()">
                      <i class="fi fi-rr-cross-small"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyAulaEditar" class="gemini-btn-primary" v-if="isAdmin" @click="salvarEdicaoNomeAula()">
                      <i class="fi fi-rr-disk"></i> Salvar Alterações
                    </button>
                  </div>
                </div>

                <div class="my-5" v-if="busyAulaEditar">
                  <InlineLoader
                    :textoAguarde="true"
                    :busy="true"
                    :center="true">
                  </InlineLoader>
                </div>

                <div class="gemini-video-wrapper mt-20">
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
import UrlBuilder from '@/core/urlBuilder.js';
import AuthManager from '@/core/AuthManager.js';

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
    isAdmin() {
      return AuthManager.isAdmin()
    }
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

    getCursoUrl() { return UrlBuilder.getCursoUrl({'id':this.getIdCurso()}); },
    getModuloUrl() { return UrlBuilder.getModuloUrl({'id':this.getIdModulo(), 'curso': {'id': this.getIdCurso()}}); },
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
