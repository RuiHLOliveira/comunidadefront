<style>
</style>

<template>
  <div v-if="exibirModalBackupProjetos">
    <div class="modalBackground">
      <div class="modal">
        <div class="flex-column pv5 ph10">

          <div style="border-top: 1px solid #999999; padding-bottom: 20px;">
            <h3 class="pageTitle">Download Backup</h3>
            <button class="btn btn-sm" type="button" @click="exportProjetos()">Export Data</button>
            <button class="btn btn-sm" type="button" @click="exportProjetosTxt()">Export Data as Txt</button>
          </div>

          <div style="padding-bottom: 20px; border-top: 1px solid #999999; border-bottom: 1px solid #999999">
            <h3 class="pageTitle">Import Backup</h3>
            Import File
            <input type="file" name="importfile" id="importfile" ref="importfile">
            <div class="flex" style="margin-top: 10px;">
              <button class="btn form-input" @click="fecharModal()">Fechar</button>
              <button class="btn form-input" @click="importFile()">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader :busy="busy"></Loader>
    <Notifier ref="notifier"></Notifier>
  </div>
</template>

<script>
import deepCopy from '@/core/deepcopy.js';
import Loader from '@/components/Loader.vue';
import Request from '@/core/request.js';
import AuthManager from '@/core/AuthManager.js';
import config from '@/core/config.js'
import Notifier from '@/components/Notifier.vue';

export default {
  name: "ImportData",
  components: {
    Loader,
    Notifier
  },
  data () {
    return {
      // exibirModal: false,
      busy: false,
      fileToImport: null,
    };
  },
  props: {
    exibirModalBackupProjetos: Boolean,
  },
  methods: {
    // notify(message, type = 'success'){
    //     this.showNotify = true;
    //     this.notifyMessage = message;
    // },


    fecharModal() {
      this.exibirModal = false;
      this.$emit('update:exibirModalBackupProjetos', this.exibirModal)
    },


    exportProjetos() {
      this.busy = true;
      let requestData = {
        'url': config.serverUrl + "/backup/exportProjetos",
        'headers': new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'}),
      };
      Request.fetch(requestData).then(([response, data]) => {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        let date = new Date();
        date = date.toISOString().substr(0, 19);
        date = date.replaceAll( ':','.');
        link.download = date + '.projetos.phpdailymanager.export.json'
        link.click()
        URL.revokeObjectURL(link.href)
        this.busy = false;
      }).catch((error) => {
        this.busy = false;
        console.error(error);
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify(error);
      });
    },


    exportProjetosTxt() {
      this.busy = true;
      let requestData = {
        'url': config.serverUrl + "/backup/exportProjetosTxt",
        'headers': new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'}),
      };
      Request.fetch(requestData).then(([response, data]) => {
        console.log(data);
        const txt = data.arquivoTxt
        const blob = new Blob([txt], { type: 'text/plain' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        let date = new Date();
        date = date.toISOString().substr(0, 19);
        date = date.replaceAll( ':','.');
        link.download = date + '.projetos.phpdailymanager.export.txt'
        link.click()
        URL.revokeObjectURL(link.href)
        this.busy = false;
      }).catch((error) => {
        this.busy = false;
        console.error(error);
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify(error);
      });
    },



    async importFile() {
      this.busy = true;
      
      let file = this.$refs.importfile.files[0];
      let fileJson = await file.text();
      console.log('1',fileJson);
      fileJson = JSON.parse(fileJson);
      console.log('2',fileJson);

      console.log('[fileJson2]', fileJson);

      let headers = new Headers();
      headers.append("Authorization", AuthManager.getToken());
      headers.append('Accept','application/json');

      let requestData = {
        'url': config.serverUrl + "/backup/importProjetos",
        'headers': headers,
        'method' : 'POST',
        'data' : fileJson,
      };

      Request.fetch(requestData).then(([response,data]) => {
        console.log('[response]',response);
        console.log('[data]',data);
        this.busy = false;
        this.$refs.notifier.notify('Importado! Atualize a listagem.') //this.notify('Importado! Atualize a listagem.');
        // this.fecharModal();
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify(error);
      });

    },
  },
  watch: {
  }
}
</script>
