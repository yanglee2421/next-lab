import React from 'react'

import type { IAllProps } from '@tinymce/tinymce-react';
import { Editor } from '@tinymce/tinymce-react'


export interface TinyMCEProps extends Omit<IAllProps, 'onChange'> {
  value?: string
  onChange?(params: string): void
  isDark?: boolean
}

export const TinyMCE = React.forwardRef<Editor, TinyMCEProps>((props, ref) => {
  const { value, onChange, isDark, ...restProps } = props

  const editorRef = React.useRef<Editor['editor']>()

  return (
    <Editor
      ref={ref}
      value={value}
      onEditorChange={onChange}
      tinymceScriptSrc='/tinymce/tinymce.min.js'
      init={init(isDark)}
      onInit={(e, editor) => {
        void e
        editorRef.current = editor
      }}
      {...restProps}
    />
  )
})

function init(isDark = false) {
  const skin = isDark ? 'oxide-dark' : 'oxide'
  const content_css = isDark ? 'dark' : false

  return {
    skin,

    // skin_url: "/tinymce-polaris-main/polaris",
    content_css,
    menubar: false,
    branding: false,
    height: 360,
    plugins: plugins(),
    toolbar: toolbar(),
    content_style: content_style()

    // autoresize_bottom_margin: 50,
  }
}

function plugins() {
  return ['wordcount']
}

function toolbar() {
  return (
    'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat'
  )
}

function content_style() {
  return 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}
