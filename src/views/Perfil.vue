<style scoped>

/* Identidade Modern Scholar */

.gemini-page-header {
  background: linear-gradient(135deg, #18181e 0%, #21212e 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
}

.gemini-header-content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px;
}

.gemini-form-container {
  max-width: 900px; /* Aumentado de 800px para evitar cortes */
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

/* Barra lateral fina de acento */
.gemini-form-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #444daf;
  opacity: 0.8;
}

.gemini-input-group {
  margin-bottom: 32px;
}

.gemini-input-group:last-child {
  margin-bottom: 0;
}

.gemini-label {
  display: block;
  font-weight: 600;
  color: #a0a0b0;
  margin-bottom: 12px;
  font-size: 0.9rem;
  line-height: 1.4;
  letter-spacing: 0.2px;
}

.gemini-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.gemini-input:focus {
  outline: none;
  border-color: #444daf;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0 4px rgba(68, 77, 175, 0.15);
}

.gemini-textarea {
  min-height: 100px;
  resize: vertical;
}

.gemini-btn-primary {
  background: #444daf;
  color: white;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  cursor: pointer;
}

.gemini-btn-primary:hover:not(:disabled) {
  background: #535bc9;
  box-shadow: 0 4px 15px rgba(68, 77, 175, 0.4);
}

.gemini-btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  background: transparent;
}

.gemini-btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.gemini-btn-secondary i {
  background: transparent;
}

.gemini-btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gemini-btn-icon {
  background: transparent;
  color: #e0e0ff;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.gemini-btn-icon:hover:not(:disabled) {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.gemini-btn-icon:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.profile-section-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-section-title i {
  color: #444daf;
}

.gemini-pagination-info {
  color: #a0a0b0;
  font-size: 0.85rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.03);
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.gemini-tabs-container {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-left: -32px;
  margin-right: -32px;
  padding: 0 32px;
}

.gemini-tabs-list {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  padding-bottom: 2px;
}

.gemini-tabs-list::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.gemini-tab-item {
  background: none;
  border: none;
  color: #a0a0b0;
  padding: 12px 8px; /* Aumentado de 4px para 8px */
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s ease;
}

.gemini-tab-item:hover {
  color: #fff;
}

.gemini-tab-item.active {
  color: #444daf;
}

.gemini-tab-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #444daf;
  border-radius: 2px 2px 0 0;
}

.floating-save-container {
  position: sticky;
  bottom: 0;
  background: #18181e;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 10;
  margin-top: 20px;
}

</style>

<template>
  <div>
    <div class="gemini-page-header">
      <div class="gemini-header-content">
        <section class="py-20 flex justify-spacebetween alignitens-center">
          <div class="flex alignitens-center">
            <h1 style="font-weight: 800; letter-spacing: -0.5px; font-size: 2.2rem; color: #fff;">Meu Perfil</h1>
            <router-link to='/posts' class="ml-20 gemini-btn-secondary">
              <i class="fi fi-rr-arrow-small-left"></i>
              <span>Voltar</span>
            </router-link>
          </div>
        </section>
      </div>
    </div>

    <div class="gemini-form-container" v-if="loadingPerguntas">
      <div class="gemini-form-card flex justify-center py-50">
        <InlineLoader :textoAguarde="true" :busy="loadingPerguntas" :center="true"></InlineLoader>
      </div>
    </div>

    <div class="gemini-form-container" v-if="!loadingPerguntas && perguntas.length > 0">
      <div class="gemini-form-card">
        <div class="flex justify-spacebetween alignitens-center mb-30">
          <h2 class="profile-section-title" style="margin-bottom: 0;">
            <i class="fi fi-rr-interrogatory"></i>
            {{ tituloPaginaAtual }}
          </h2>
          
          <div class="flex alignitens-center gap-10">
            <button 
              class="gemini-btn-icon" 
              @click="retrocederPagina" 
              :disabled="indicePaginaAtual === 0"
              title="Anterior"
            >
              <i class="fi fi-rr-angle-small-left"></i>
            </button>
            
            <div class="gemini-pagination-info">
              {{ indicePaginaAtual + 1 }} / {{ paginas.length }}
            </div>

            <button 
              class="gemini-btn-icon" 
              @click="avancarPagina" 
              :disabled="indicePaginaAtual === paginas.length - 1"
              title="Próximo"
            >
              <i class="fi fi-rr-angle-small-right"></i>
            </button>
          </div>
        </div>

        <!-- Navegação de Abas -->
        <div class="gemini-tabs-container mb-40">
          <div class="gemini-tabs-list">
            <button 
              v-for="pg in paginas" 
              :key="pg.id"
              @click="paginaAtualId = pg.id"
              class="gemini-tab-item"
              :class="{ 'active': paginaAtualId === pg.id }"
            >
              {{ pg.titulo }}
            </button>
          </div>
        </div>
        
        <div v-for="pergunta in perguntasFiltradas" :key="pergunta.key" class="gemini-input-group">
          <label class="gemini-label">{{ pergunta.texto }}</label>
          
          <!-- Tipo SELECT -->
          <select 
            v-if="pergunta.tipo === 'select'"
            class="gemini-input"
            v-model="pergunta.resposta"
          >
            <option value="" disabled selected>Selecione uma opção...</option>
            <option v-for="opcao in pergunta.opcoes" :key="opcao" :value="opcao">
              {{ opcao }}
            </option>
          </select>

          <!-- Tipo TEXTO (Curto) -->
          <input 
            v-else-if="pergunta.tipo === 'texto' && (pergunta.max_length <= 100 || !pergunta.max_length)"
            type="text"
            class="gemini-input"
            v-model="pergunta.resposta"
            :maxlength="pergunta.max_length"
            placeholder="Sua resposta..."
          >

          <!-- Tipo TEXTO (Longo/Textarea) -->
          <textarea 
            v-else
            class="gemini-input gemini-textarea" 
            v-model="pergunta.resposta" 
            :maxlength="pergunta.max_length"
            placeholder="Sua resposta..."
          ></textarea>
        </div>

        <!-- Salvar Alterações -->
        <div class="flex justify-end mt-40 pt-20" style="border-top: 1px solid rgba(255,255,255,0.05)">
          <button 
            class="gemini-btn-primary" 
            @click="salvarAlteracoes" 
            :disabled="busy || !houveAlteracoes"
          >
            <i class="fi fi-rr-disk" v-if="!busy"></i>
            <span v-if="!busy">Salvar Alterações</span>
            <span v-else>Salvando...</span>
          </button>
        </div>
      </div>
    </div>

    <Notifier ref="notifier"></Notifier>
  </div>
</template>

<script>
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import Request from '@/core/request.js';
import config from '@/core/config.js';

export default {
  name: 'Perfil',
  components: {
    InlineLoader,
    Notifier,
  },
  data() {
    return {
      perguntas: [],
      paginas: [],
      paginaAtualId: 1,
      loadingPerguntas: false,
      busy: false
    };
  },
  computed: {
    houveAlteracoes() {
      return this.perguntas.some(p => p.resposta !== p.originalResposta);
    },
    perguntasFiltradas() {
      return this.perguntas.filter(p => p.pagina === this.paginaAtualId);
    },
    indicePaginaAtual() {
      return this.paginas.findIndex(p => p.id === this.paginaAtualId);
    },
    tituloPaginaAtual() {
      const pg = this.paginas.find(p => p.id === this.paginaAtualId);
      return pg ? pg.titulo : 'Informações de Perfil';
    }
  },
  methods: {
    avancarPagina() {
      if (this.indicePaginaAtual < this.paginas.length - 1) {
        this.paginaAtualId = this.paginas[this.indicePaginaAtual + 1].id;
      }
    },
    retrocederPagina() {
      if (this.indicePaginaAtual > 0) {
        this.paginaAtualId = this.paginas[this.indicePaginaAtual - 1].id;
      }
    },
    async carregarPerguntas() {
      this.loadingPerguntas = true;
      try {
        // Busca definições (páginas e perguntas)
        let requestPerguntas = {
          url: config.serverUrl + '/perguntas',
          method: 'GET'
        };
        const [, data] = await Request.fetch(requestPerguntas);
        
        this.paginas = data.paginas || [];
        const perguntasArray = data.perguntas || [];

        // Busca as respostas mais recentes
        let requestRespostas = {
          url: config.serverUrl + '/perguntas/respostas',
          method: 'GET'
        };
        const [, informacoes] = await Request.fetch(requestRespostas);
        
        // Mescla as respostas no array de perguntas
        this.perguntas = perguntasArray.map(p => {
          let respostaAtual = '';
          
          // No novo formato, /perguntas/respostas retorna um objeto direto com {resposta, data}
          if (informacoes && informacoes[p.key]) {
            respostaAtual = informacoes[p.key].resposta;
          }

          return {
            ...p,
            resposta: respostaAtual || '',
            originalResposta: respostaAtual || '', // Guardamos o valor original para o computed houveAlteracoes
            busy: false
          };
        });

        // Define a primeira página como ativa
        if (this.paginas.length > 0) {
          this.paginaAtualId = this.paginas[0].id;
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        this.$refs.notifier.notify('Erro ao carregar dados do perfil: ' + error, true);
      } finally {
        this.loadingPerguntas = false;
      }
    },
    async salvarAlteracoes() {
      const alteracoes = {};
      
      // Filtra apenas o que mudou
      this.perguntas.forEach(p => {
        if (p.resposta !== p.originalResposta) {
          alteracoes[p.key] = p.resposta;
        }
      });

      if (Object.keys(alteracoes).length === 0) return;

      this.busy = true;
      try {
        let requestData = {
          url: config.serverUrl + '/perguntas/responder',
          method: 'POST',
          data: alteracoes // Envia o objeto bulk conforme especificado no OpenAPI
        };
        await Request.fetch(requestData);
        
        // Atualiza os valores originais após sucesso
        this.perguntas.forEach(p => {
          if (p.resposta !== p.originalResposta) {
            p.originalResposta = p.resposta;
          }
        });

        this.$refs.notifier.notify('Perfil updated with success!');
      } catch (error) {
        console.error('Erro ao salvar alterações:', error);
        this.$refs.notifier.notify('Erro ao salvar perfil: ' + error, true);
      } finally {
        this.busy = false;
      }
    }
  },
  mounted() {
    this.carregarPerguntas();
  }
};
</script>