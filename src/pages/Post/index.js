/**
 * Created by morenyang on 2018/6/6.
 */

import React from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import Editor from '../../components/Editor/index'
import style from './style.scss'
import {LANGUAGES, PROD_URL} from '../../config'
import uuid from 'uuid'
import objectHash from 'object-hash'
import {push, queryPayment} from '../../utils/requests'
import qs from 'qs'
import {Link} from 'react-router-dom'

class PastedPage extends React.Component {
  state = {
    author: '',
    language: 'javascript',
    code: '',
    showModal: false,
    hash: '',
    fetchingResult: true,
    paymentSuccess: false
  };

  intervalQuery = null;

  onEditorChange = (newVal) => {
    this.setState({code: newVal})
  };

  onAuthorChange = (e) => {
    this.setState({author: e.target.value})
  };

  onLanguageChange = (e) => {
    this.setState({language: e.target.value})
  };

  handleSubmit = () => {
    this.clearIntervalQuery();
    let hash = objectHash({...this.state, uuid: uuid()});
    this.setState({hash});
    const _self = this;
    const {author, code, language} = this.state;
    push(hash, qs.stringify({author, code, language}), function () {
      _self.setState({showModal: true, fetchingResult: true, paymentSuccess: false});
      _self.intervalQuery = setInterval(() => {
        queryPayment()
          .then(res => {
            if (res.code === 0) {
              _self.setState({fetchingResult: false, paymentSuccess: true});
              _self.clearIntervalQuery();
            }
          })
      }, 1000)
    })
  };

  hideModal = () => {
    this.setState({
      showModal: false,
    })
  };

  clearIntervalQuery = () => {
    if (this.intervalQuery) {
      clearInterval(this.intervalQuery)
    }
  };

  componentWillUnmount() {
    this.clearIntervalQuery();
  }

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
                <Button disabled={btnDisabled} onClick={this.handleSubmit}>
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
          <Modal isOpen={this.state.showModal} className={style.finishedModal}>
            <ModalHeader
              toggle={this.toggle}>{this.state.fetchingResult ? 'Saving your code' : this.state.paymentSuccess ? 'Successfully save your code' : 'Failed save your code'}</ModalHeader>
            <ModalBody>
              <p>Remember the hash of your code:
                <br/><code>{this.state.hash}</code>
              </p>
              <p>You can see your code {this.state.fetchingResult ? 'after transaction completed ' : ''} on <br/><Link
                to={`/pasted/${this.state.hash}`}>{`${PROD_URL}/#/pasted/${this.state.hash}`}</Link>,<br/>
                keep it or share it with your friend. </p>
            </ModalBody>
            <ModalFooter>
              {
                this.state.fetchingResult ?
                  <Button onClick={this.hideModal}>
                    Cancel
                  </Button> : null
              }
              <Button color="primary" onClick={this.hideModal} disabled={this.state.fetchingResult}>
                {this.state.fetchingResult ? 'Loading...' : 'Finish'}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    )
  }
}

export default PastedPage;
