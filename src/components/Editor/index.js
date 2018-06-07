import React, {Component} from 'react';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component {

  editorDidMount = (editor, monaco) => {
    console.debug('editorDidMount', editor);
    editor.focus();
  };
  onChange = (newValue, e) => {
    this.props.onEditorChange(newValue);
    console.debug('onChange', newValue, e);
  };

  render() {

    const options = {
      selectOnLineNumbers: true
    };

    const requireConfig = {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        vs: 'https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.6.1/min/vs'
      }
    };
    return (
      <MonacoEditor
        height="600"
        language={this.props.language}
        theme="vs-light"
        value={this.props.code}
        options={options}
        onChange={this.onChange}
        requireConfig={requireConfig}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default Editor;
