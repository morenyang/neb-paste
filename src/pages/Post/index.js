/**
 * Created by morenyang on 2018/6/6.
 */

import React from 'react';
import {Container, Form, FormGroup, Label, Input, Col, Row, Button} from 'reactstrap';
import Editor from '../../components/Editor/index'
import style from './style.scss'
import {LANGUAGES} from '../../config'

class PastedPage extends React.Component {
  state = {
    author: '',
    language: 'javascript',
    code: ''
  };

  onEditorChange = (newVal) => {
    this.setState({code: newVal})
  };

  onAuthorChange = (e) => {
    this.setState({author: e.target.value})
  };

  onLanguageChange = (e) => {
    this.setState({language: e.target.value})
  };

  render() {
    const renderOptions = () => LANGUAGES.map(item => (
      <option value={item} key={item}>{item}</option>
    ));
    const btnDisabled = !this.state.author || !this.state.code;
    return (
      <Container>
        <h1 className={style.mainTitle}>Clipboard</h1>
        <p className={style.bdSub}>
          Paste your code into clipboard, <br/>and you can save it in an easy way or share with other easily.
        </p>
        <p>
          Everything you paste will be treated as public data and will be saved permanently. Please do not use programs
          or scripts to paste and send data.
        </p>
        <div>
          <Form>
            <Row>
              <Col md={5}>
                <FormGroup>
                  <Label htmlFor="author">Poster</Label>
                  <Input id={"author"} placeholder={"Your Name"} value={this.state.author}
                         onChange={this.onAuthorChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label htmlFor="language">Language</Label>
                  <Input type={'select'} value={this.state.language} onChange={this.onLanguageChange}>
                    {renderOptions()}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3} className={style.pasteWrapper}>
                <Button disabled={btnDisabled}>
                  Paste
                </Button>
              </Col>
            </Row>
            <FormGroup>
              <Label htmlFor="editor">Content</Label>
              <div className={style.editor}>
                <Editor id={'editor'} code={this.state.code} onEditorChange={this.onEditorChange}
                        language={this.state.language}/>
              </div>
            </FormGroup>
          </Form>

        </div>
      </Container>
    )
  }
}

export default PastedPage;
