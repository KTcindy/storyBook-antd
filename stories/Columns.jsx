import React from 'react'
import ReactMarkdown from 'react-markdown';
// import ReactMarkdown from 'react-markdown/with-html';
import md from '../form.md'
export default function Columns() {
  return (
      <div>
          {/* <Markdown source={md} /> */}
          <ReactMarkdown
              className="markdown-body"
              
              escapeHtml={false}
          >
              { md}
              </ReactMarkdown>
    </div>
  )
}
