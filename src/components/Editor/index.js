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
    return (
      <MonacoEditor
        height="600"
        language={this.props.language}
        theme="vs-light"
        value={this.props.code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default Editor;
