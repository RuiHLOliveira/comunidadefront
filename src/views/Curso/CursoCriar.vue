<style scoped>

/* gemini deixei de usar */
.div-half{
  width:     50%;
  min-width: 50%;
  max-width: 50%;
  border-radius: 5px;
  border: 1px solid var(--darkmode-border-gray);
  margin-left: 5px;
  padding-left: 5px;
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

.gemini-form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 24px;
}

.gemini-form-card {
  background: #262631;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.gemini-form-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #444daf;
  opacity: 0.6;
}

.gemini-input-group {
  margin-bottom: 24px;
}

.gemini-label {
  display: block;
  font-weight: 600;
  color: #e0e0ff;
  margin-bottom: 8px;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.gemini-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.gemini-input:focus {
  outline: none;
  border-color: #444daf;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0 4px rgba(68, 77, 175, 0.1);
}

/* CLASSES QUE ERAM INLINE */

/* gemini classe era inline */
.inline-style-btn-voltar {
  display: inline-flex;
}

.gemini-btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #e0e0ff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}

.gemini-btn-secondary i {
  background: transparent !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gemini-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.gemini-btn-primary {
  background: #444daf;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  cursor: pointer;
}

.gemini-btn-primary:hover {
  background: #535bc9;
  box-shadow: 0 4px 15px rgba(68, 77, 175, 0.4);
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
              <h1 style="font-weight: 800; letter-spacing: -0.5px; font-size: 2.2rem;">Crie seu curso, patrão!</h1>
              <div>
                <router-link to='/cursos' class="ml-15 mr-10 my-5 gemini-btn-secondary">
                  <i class="fi fi-rr-arrow-small-left"></i>
                  <span>Voltar</span>
                </router-link>
              </div>
            </div>
            <div>
              <button class="mx-10 my-5 gemini-btn-primary" type="button" 
                @click="salvarRascunho(projetoExibir)">
                <i class="fi fi-rr-disk mr-5"></i>
                Salvar Rascunho
              </button>
            </div>
          </section>
        </div>
      </div>

      <div class="gemini-form-container">
        <div class="gemini-form-card">
          <section>
            <div class="my-5 py-5" v-if="busyCursoSave">
              <InlineLoader
                :textoAguarde="true"
                :busy="busyCursoSave"
                :center="true">
              </InlineLoader>
            </div>

            <div class="gemini-input-group">
              <label class="gemini-label" for="nome">Título do Curso:</label>
              <input class="gemini-input" name="nome" type="text" placeholder="Ex: Masterclass de Vue.js" v-model="nome">
            </div>
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
  </div>

    <Notifier ref="notifier"></Notifier>

  </div>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import Loader from '@/components/Loader.vue';
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import { CursosStorage } from '@/core/storage/CursosStorage.js';
import AuthManager from '@/core/AuthManager.js';

export default {
  name: 'Criar',
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

    salvarRascunho () {
      this.busyCursoSave = true;
      let curso = {
        'nome': this.nome,
      };
      CursosStorage.criar(curso)
      .then(([response, data]) => {
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
