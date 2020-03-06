import React, { Component } from 'react';
import {Container, Row, Col, Card, Button,Form,CardHeader, CardBody,InputGroup,FormGroup,InputGroupText,FormInput,InputGroupAddon} from "shards-react";
import api from "../services/api";
import {login} from "../services/Auth";

import Notifications, {notify} from 'react-notify-toast';

export default class SignIn extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  handleLogin = async e =>{
    e.preventDefault();
    const {email, password} = this.state;
    if(!email || !password){
     await this.setState({error: 'Preencha seus dados para continuar'});
     
    }else{
      try{
        const response = await api.post('/authenticate',{email, password});
        login(response.data.token);
        this.props.history.push('/dashboard');
        await this.setState({error: ''});
      }catch (err) {
        console.log(`erro: ${err}`);
        await this.setState({
          error: "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }

    if(this.state.error != ''){
      notify.show(this.state.error,"error", 5000);
    }

  }

  render(){
    return (
      <Container >
        <Notifications/>
        <Row style={{ height: '100vh', justifyContent:'center', alignItems:'center'}}>
          <Col lg={8} >
            <Card>
                <CardHeader>Login</CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleLogin}>
                    <Row>
                      <Col lg={12}>
                        <FormGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon type="prepend">

                            <InputGroupText><i className='fas fa-envelope'></i></InputGroupText>
                            </InputGroupAddon>
                          <FormInput placeholder="seuemail@email.com"  id='email'
                          name='email'
                          onChange={e=> {this.setState({ email: e.target.value }); }}/>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <FormGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon type="prepend">

                            <InputGroupText><i className='fas fa-lock'></i></InputGroupText>
                            </InputGroupAddon>
                          <FormInput placeholder="Sua senha"  id='senha'
                          name='senha'
                          type='password'
                          onChange={e=> {this.setState({ password: e.target.value }); }}/>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                      <Button theme="primary">Entrar</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}