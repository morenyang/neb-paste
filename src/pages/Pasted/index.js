import React from 'react';
import {Container, Input, Form, FormGroup, Label, Row, Col, Button} from 'reactstrap';
import Editor from '../../components/Editor/index'
import style from './style.scss'
import {get} from '../../utils/requests'
import {LANGUAGES} from '../../config'
import qs from 'qs'

class PastedPage extends React.Component {
  state = {
    urlHash: '',
    hash: '',
    author: '',
    code: null,
    language: 'javascript',
    authorWallet: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let params = {...nextProps.match.params};
    if (params.hasOwnProperty('hash') && params.hash !== prevState.urlHash) {
      return {
        author: '',
        code: null,
        language: '',
        hash: params.hash,
        urlHash: params.hash,
      }
    } else if (!params.hasOwnProperty('hash') && prevState.urlHash) {
      return {
        author: '',
        code: null,
        language: '',
        hash: '',
        urlHash: '',
      }
    }
    return null
  }

  componentDidMount() {
    if (this.state.code === null && this.state.urlHash) {
      this.handleFetchData()
    }
  }

  componentDidUpdate() {
    if (this.state.code === null) {
      this.handleFetchData()
    }
  }

  onLanguageChange = (e) => {
    this.setState({language: e.target.value})
  };

  onHashChange = (e) => {
    this.setState({hash: e.target.value})
  };

  handleGetClick = () => {
    this.props.history.push(`/pasted/${this.state.hash}`)
  };

  render() {
    const renderOptions = () => LANGUAGES.map(item => (
      <option value={item} key={item}>{item}</option>
    ));
    return (
      <Container>
        <h1 className={style.mainTitle}>
          Pasted {this.state.author ? `form ${this.state.author}` : ''}
        </h1>
        <div>
          <Form>
            <Row>
              <Col md={11}>
                <FormGroup>
                  <Label>Pasted Hash</Label>
                  <Input value={this.state.hash} onChange={this.onHashChange}/>
                </FormGroup>
              </Col>
              <Col md={1} className={style.pasteWrapper}>
                <Button disabled={!this.state.hash} onClick={this.handleGetClick}>Get</Button>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label htmlFor="author">Poster</Label>
                  <Input id={"author"} placeholder={""} value={this.state.author} disabled
                         className={style.authorInput}/>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label htmlFor="language">Language</Label>
                  <Input type={'select'} value={this.state.language} onChange={this.onLanguageChange}>
                    {renderOptions()}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>Author Account</Label>
                  <Label className={style.authorAccount}>
                    {this.state.authorWallet}
                  </Label>
                </FormGroup>
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

  handleFetchData = () => {
    get(this.state.urlHash)
      .then(result => {
        let resultString = JSON.stringify(result);
        if (resultString.search("key") !== -1 && resultString.search("value") !== -1) {
          result = JSON.parse(result);
          let value = qs.parse(result.value);
          console.debug(result.author);
          console.debug(value);
          this.setState({...value, authorWallet: result.author});
        }
      })
  }
}

export default PastedPage;
