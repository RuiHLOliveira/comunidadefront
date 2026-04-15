import { reactive } from 'vue';

export const MdHtmlConverter = reactive({
    parseImageOptions(optionsString) {
      if(optionsString == null || optionsString.trim() === '') return {};

      const options = {};
      const parts = optionsString.split(',');
      parts.forEach(part => {
        const [rawKey, rawValue] = part.split('=');
        if(rawKey == null || rawValue == null) return;
        const key = rawKey.trim().toLowerCase();
        const value = rawValue.trim();
        if(value === '') return;
        if(key === 'max-width' || key === 'mw') {
          options.maxWidth = value;
        }
        if(key === 'max-height' || key === 'mh') {
          options.maxHeight = value;
        }
      });
      return options;
    },

    buildImageTag(alt, srcWithOptions) {
      const [rawSrc, rawOptions] = srcWithOptions.split('|');
      const src = rawSrc.trim();
      const options = this.parseImageOptions(rawOptions);

      let style = 'display:block;margin-left:auto;margin-right:auto;';
      if(options.maxWidth != null) style += `max-width:${options.maxWidth};`;
      if(options.maxHeight != null) style += `max-height:${options.maxHeight};`;

      return `<img class="imgPost" src="${src}" alt="${alt}" style="${style}">`;
    },
    
    convert(markdown){
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
      // Images
      html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, srcWithOptions) => {
        return this.buildImageTag(alt, srcWithOptions);
      });
      // Links
      html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
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

});
