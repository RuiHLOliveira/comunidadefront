<style scoped>

.modern-scholar-form-container {
  background-color: #262631;
  padding: 30px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.modern-scholar-form-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #3b3b4f;
}

.modern-scholar-input, .modern-scholar-textarea {
  width: 100%;
  font-size: 0.95rem;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.modern-scholar-input:focus, .modern-scholar-textarea:focus {
  box-shadow: none;
}

.modern-scholar-textarea {
  min-height: 200px;
  resize: vertical;
}

/* .modern-scholar-textarea { gemini deixei de usar no editor markdown } */
.modern-scholar-textarea-editor {
  min-height: 200px;
  resize: vertical;
  background-color: #18181e;
  color: #e0e0e0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 14px;
}

.modern-scholar-textarea-editor::placeholder {
  color: #8f8fa3;
}

.modern-scholar-textarea-editor:focus {
  outline: 2px solid #7da3ce;
}

/* .flex.gap-20 { gemini classe era inline } */
.modern-scholar-editor-split {
  display: flex;
  gap: 20px;
}

/* .modern-scholar-textarea e .modern-scholar-textarea-editor { gemini deixei de usar no split 50/50 } */
.modern-scholar-editor-half {
  flex: 0 0 calc(50% - 10px);
  width: calc(50% - 10px);
  min-width: calc(50% - 10px);
  max-width: calc(50% - 10px);
  box-sizing: border-box;
}

.modern-scholar-label {
  font-weight: 600;
}

.modern-scholar-preview-pane {
  background-color: #18181e;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: #e0e0e0;
  line-height: 1.6;
}

</style>

<template>
  <div>
    <div class="container">

      <header class="modern-scholar-header-container">
        <div class="modern-scholar-header-left">
          <h2 class="modern-scholar-main-title">{{editMode ? 'Editando Post' : 'Criando Novo Post' }}</h2>
          <router-link to='/posts' class="modern-scholar-btn-back">
            <i class="fi fi-rr-arrow-small-left"></i>
            <span>Voltar</span>
          </router-link>
        </div>
        <button class="modern-scholar-btn-submit" type="button"
          v-if="isAdmin" 
          @click="salvarRascunho()">
          <span>{{ editMode ? 'Atualizar' : 'Salvar' }}</span>
        </button>
      </header>

      <div class="my-5 py-5" v-if="busyPostsLoad">
        <InlineLoader :textoAguarde="true" :busy="busyPostsLoad" :center="true"></InlineLoader>
      </div>

      <section class="modern-scholar-form-container" v-if="!busyPostsLoad">
        
        <label class="modern-scholar-label" for="nome">Título</label>
        <input class="modern-scholar-input" name="nome" type="text" placeholder="Título" v-model="nome">
        
        <label class="modern-scholar-label" for="introducao">
          Introdução <span style="font-size: 0.8rem; color: #666;">(Esquerda: Markdown / Direita: Render)</span>
        </label>
        <div class="modern-scholar-editor-split">
          <textarea class="modern-scholar-textarea-editor modern-scholar-editor-half" name="introducao" id="introducao" v-model="introducao"></textarea>
          <div class="modern-scholar-textarea modern-scholar-preview-pane modern-scholar-editor-half" v-html="introducaoHtml"></div>
        </div>

        <label class="modern-scholar-label" for="conteudo">
          Conteúdo <span style="font-size: 0.8rem; color: #666;">(Esquerda: Markdown / Direita: Render)</span>
        </label>
        <div class="modern-scholar-editor-split">
          <textarea class="modern-scholar-textarea-editor modern-scholar-editor-half" name="conteudo" id="conteudo" v-model="conteudo"></textarea>
          <div class="modern-scholar-textarea modern-scholar-preview-pane modern-scholar-editor-half" v-html="conteudoHtml"></div>
        </div>
      </section>

      <div class="my-5 py-5" v-if="busyPostSave">
        <InlineLoader :textoAguarde="true" :busy="busyPostSave" :center="true"></InlineLoader>
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
import { PostsStorage } from '@/core/storage/PostsStorage.js';
import { MdHtmlConverter } from '@/core/MdHtmlConverter.js';
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

      busyPostSave: false,
      busyPostsLoad: false,

      nome: '',
      conteudo: '',
      introducao: '',

      idPost: null,
      editMode: false,
      postToEdit: [],

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

    getIdPost(){
      if(this.idPost == null) {
        this.idPost = this.$route.query.idPost;
      }
      return this.idPost
    },

    getPostToEdit(){
      if(this.getIdPost() == null) return;
      this.editMode = true;
      this.busyPostsLoad = true;
      PostsStorage.index()
      .then(([response, data]) => {
        const idPost = this.getIdPost()
        data = data.filter(p => {return p.id == idPost});
        console.log({data});
        this.postToEdit = data[0];
        this.nome = this.postToEdit.nome;
        this.conteudo = this.postToEdit.conteudo;
        this.introducao = this.postToEdit.introducao;
        this.busyPostsLoad = false;
      })
      .catch((error) => {
        this.busyPostsLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
      
    },

    salvarRascunho () {
      let post = {
        'nome': this.nome,
        'introducao': this.introducao,
        'conteudo': this.conteudo
      };
      if(this.getIdPost() == null) {
        this.criar(post);
      } else {
        post['id'] = this.getIdPost();
        this.editar(post);
      }
    },

    criar (post) {
      this.busyPostSave = true;
      PostsStorage.criar(post)
      .then(([response, data]) => {
        console.log({data});
        this.$refs.notifier.notify(`Post salvo!`);
        this.busyPostSave = false;
      })
      .catch((error) => {
        this.busyPostSave = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    editar (post) {
      this.busyPostSave = true;
      PostsStorage.editar(post)
      .then(([response, data]) => {
        console.log({data});
        this.$refs.notifier.notify(`Post salvo!`);
        this.busyPostSave = false;
      })
      .catch((error) => {
        this.busyPostSave = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },


    mdToHtml(markdown) {
      return MdHtmlConverter.convert(markdown);
    },

    // listar posts
    // link para post

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
    this.getPostToEdit();
  },
}
</script>
