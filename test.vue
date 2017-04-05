    article(class="message")
      .message-header
        p(v-bind='title') {{ title }}
        button.delete
      .message-body {{ body }}


