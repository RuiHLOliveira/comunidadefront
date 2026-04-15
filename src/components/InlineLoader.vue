<style scoped>

/* .inlineLoaderContainer {
  font-size: 1rem;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  background: #e0e0e0;
  display: flex;
  justify-content: space-around;
  align-items: center;
} */

/* gemini deixei de usar */
.inlineLoaderContainerTexto {
  /* margin: 0 auto; */
  /* padding: 10px; */
  font-size: 1rem;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  background: var(--darkmode-bg-color);
  color: var(--darkmode-font-color);
  border: 1px solid var(--gray-button-border);
  /* border: 1px solid; */
  /* border-color: #f1f1f1; */
  /* display: inline-block; */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* gemini deixei de usar */
.inlineLoader {
  padding: 0px;
  display: inline-block;
  vertical-align: middle;
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #42b42b; /* Blue */
  border-top: 3px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;
}

/* NOVAS CLASSES GEMINI - IDENTIDADE MODERN SCHOLAR */

.gemini-loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(68, 77, 175, 0.1);
  border: 1px solid rgba(68, 77, 175, 0.2);
  padding: 10px 20px;
  border-radius: 12px;
  color: #e0e0ff;
  font-weight: 600;
  font-size: 0.9rem;
  backdrop-filter: blur(4px);
  width: fit-content;
  margin: 0 auto;
}

.gemini-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top: 2px solid #444daf;
  border-radius: 50%;
  animation: gemini-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.textoAguarde {
  display:inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes gemini-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<template>
    <span v-if="busy" :class="{ xcenter : center }" style="display: block;">
      <span v-if="busy" :class="textoAguarde ? 'gemini-loader-container' : ''">
        <span v-if="textoAguarde">
          Aguarde...
        </span>
        <div class="gemini-spinner"></div>
      </span>
    </span>
</template>

<script>
export default {
  data: function () {
    return {
      ini: ''
    }
  },
  props: {
    busy: Boolean,
    textoAguarde: Boolean,
    center: Boolean
  }
}
</script>

