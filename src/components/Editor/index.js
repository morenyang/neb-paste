import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component {
  state = { code: '' };
  editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  };
  onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  };
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <MonacoEditor
        height="600"
        language="javascript"
        theme="vs-light"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default Editor;
