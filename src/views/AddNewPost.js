import React, { Component } from "react";
import { Container, Row, Col, Form } from "shards-react";
import { DefaultLayout } from "../layouts/";
import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
//import SidebarCategories from "../components/add-new-post/SidebarCategories";
import api from "../services/api";
import slugify from 'react-slugify';




class AddNewPost extends Component{
  state={
    Post: {
      status: 0,
      title: '',
      post: '',
      slug: ''
    },

    error: '',
  }

  changeStatus = () => {
  if(this.state.Post.status == 0){
    this.setState((prevState, props) => {
      return {
        Post: {...prevState.Post, status: 1}
      }
    })
  }else{
    this.setState((prevState, props) => {
      return {
        Post: {...prevState.Post, status: 0}
      }
    })
  } 
};
changeTitle = (title) =>{
  this.setState((prevState, props) => {
    return {
      Post: {...prevState.Post, title,slug: slugify(title)}
    }
  })
};
changePost = (post) =>{
  this.setState((prevState, props) => {
    return {
      Post: {...prevState.Post, post}
    }
  })

};

  handleSubmit = async (e) =>{
    e.preventDefault();
    
    const title = document.getElementById('title').value
    const postEditor = document.querySelector('.ql-editor:not(.ql-blank)');
    
    if(postEditor && title != ''){
     await this.setState({error: '', Post: {title: title, post: postEditor.innerHTML, slug: slugify(title)}});
     try{
        const postCreated = await api.post('/posts',this.state.Post);
        console.log(postCreated)
        this.props.history.push(`/edit-post/${postCreated.data.id}`);
      }catch(error){
        console.error(error)
      }

    }else{
      await this.setState({error: 'Você se esqueceu de preencher o título ou colocar um texto, verifique e tente novamente'});
    }

    if(this.state.error !== ''){
     alert(this.state.error);
    }

    console.log(this.state);
  };

  render(){
    return(
      <DefaultLayout>
       
              <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Criar Post" subtitle="Blog Posts" className="text-sm-left" />
        </Row>
    
      <Form onSubmit={this.handleSubmit}>
      {this.state.Post.slug !== '' ? (        <Row>
          <Col lg="9">
            <small><b>Sua url ficará:</b> {`${process.env.REACT_APP_URL_FRONT}/${this.state.Post.slug}`}</small></Col>
        </Row>) : ''}
      <Row>
          {/* Editor */}
          <Col lg="9" md="12">
            <Editor state={this.state} changeTitle={this.changeTitle} changePost={this.changePost}/>
          </Col>
    
          {/* Sidebar Widgets */}
          <Col lg="3" md="12">
            <SidebarActions title='Configurações' status={1} visibilidade={this.state.Post.status} callbackParent={this.changeStatus}/>
            {/* <SidebarCategories /> */}
          </Col>
        </Row>
      </Form>
      </Container>
      </DefaultLayout>
    );
  }
}

export default AddNewPost;
