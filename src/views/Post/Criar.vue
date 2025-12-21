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
            <h1>Crie seu post, mentorado!</h1>
            <div>

              <router-link to='/posts' class="btn ml-15 mr-10 my-5 flex-center-combo" style="display: inline-flex;">
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
          <div class="my-5 py-5" v-if="busyPostSave">
            <InlineLoader
              :textoAguarde="true"
              :busy="busyPostSave"
              :center="true">
            </InlineLoader>
          </div>

          <label for="nome">Título:</label>
          <input name="nome" type="text" placeholder="Título" v-model="nome">
          
          <label for="introducao">Introducao</label>
          <div class="flex">
            <textarea class="textarea-half" name="introducao" id="introducao" v-model="introducao"></textarea>
            <div class="div-half" v-html="introducaoHtml"></div>
          </div>

          <label for="conteudo">Conteúdo/Corpo</label>
          <div class="flex">
            <textarea class="textarea-half" name="conteudo" id="conteudo" v-model="conteudo"></textarea>
            <div class="div-half" v-html="conteudoHtml"></div>
          </div>
        </section>

        <div class="my-5 py-5" v-if="busyPostSave">
          <InlineLoader
            :textoAguarde="true"
            :busy="busyPostSave"
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
import { PostsStorage } from '@/core/storage/PostsStorage.js';

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

      busyPostSave: false,

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
      this.busyPostSave = true;
      let post = {
        'nome': this.nome,
        'introducao': this.introducao,
        'conteudo': this.conteudo
      };
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


    mdToHtml(markdown) {
      let html = markdown;
      // Headers (h1-h6)
      html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
      html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      // Bold
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
      // Italic
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      html = html.replace(/_(.*?)_/g, '<em>$1</em>');
      // Links
      html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
      // Images
      html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
      // Code inline
      html = html.replace(/`(.*?)`/g, '<code>$1</code>');
      // Code blocks
      html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
      // Strikethrough
      html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
      // Horizontal rule
      html = html.replace(/^\-{3,}$/gim, '<hr>');
      // Line breaks
      html = html.replace(/\n\n/g, '</p><p>');
      html = html.replace(/\n/g, '<br>');
      // Wrap in paragraph
      html = '<p>' + html + '</p>';
      // Clean up empty paragraphs
      html = html.replace(/<p><\/p>/g, '');
      html = html.replace(/<p>(<h[1-6]>)/g, '$1');
      html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
      html = html.replace(/<p>(<hr>)<\/p>/g, '$1');
      html = html.replace(/<p>(<pre>)/g, '$1');
      html = html.replace(/(<\/pre>)<\/p>/g, '$1');
      return html;
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
  },
}
</script>
