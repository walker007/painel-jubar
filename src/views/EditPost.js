import React, { Component } from "react";
import { Container, Row, Col, Form ,Card, CardBody, CardHeader} from "shards-react";
import { DefaultLayout } from "../layouts/";
import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
//import SidebarCategories from "../components/add-new-post/SidebarCategories";
import api from "../services/api";
import slugify from 'react-slugify';
import Dropzone,{useDropzone} from "react-dropzone";



class EditPost extends Component{
  state={
    Post: {
      id: '',
      status: 0,
      title: '',
      post: '',
      slug: '',
      cover: '',
    },
    files: [],
    error: '',
  }
  handleSubmit = async (e) => {
        e.preventDefault();

        const {data} = await api.put(`/posts/${this.state.Post.id}`,this.state.Post);

        console.log(data);
  }

  handleDrop = async files => {
      const { Post: {id}} = this.state;
    this.setState({ files })

    const data = new FormData();
      files.map((file, index) =>
        data.append(`image`, file, file.name)
      );

  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
   const {data: { name}} = await api.post(
    `/posts/${id}/uploadBanner`,
    data,
    config
  );

  this.setState((prevState, props) => {
    return {
      Post: {...prevState.Post, cover: name}
    }
  })
};

  renderFiles() {
   
    return this.state.Post.cover == undefined ? (
      <p>Jogue a imagem ou clique aqui para adiciona-la</p>
    ) : (
       <img width="100%"  src={`${process.env.REACT_APP_URL_API}/getPostPicture/${this.state.Post.cover}`} alt='Preview'/>
    );
  }

  dropzone= () => {

    return(
        <Dropzone onDrop={acceptedFiles => this.handleDrop(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              { this.renderFiles() }
            </div>
            
          </section>
         
        )
         
        }
        
      </Dropzone>
    );
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

    getUpdatedData = async () => {
        const {data} = await api.get(`/posts/${this.props.match.params.id}`)
        this.setState({Post: data})
      
    };

  async componentDidMount(){
      await this.getUpdatedData();
  }
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
  render(){
    return(
      <DefaultLayout>
       
              <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Criar Post" subtitle="Blog Posts" className="text-sm-left" />
        </Row>
    
      <Form onSubmit={this.handleSubmit}>
          
      <Row>
        
          {/* Editor */}
          <Col lg="9" md="12">
            <Editor state={this.state} changeTitle={this.changeTitle} changePost={this.changePost}/>
          </Col>
    
          {/* Sidebar Widgets */}
          <Col lg="3" md="12">
            <SidebarActions title='Configurações' status={2} visibilidade={this.state.Post.status} changeStatusFunc={this.changeStatus}/>
            {/* <SidebarCategories /> */ }
           <Card>
           <CardHeader className="border-bottom">
      <h6 className="m-0">Capa do Post</h6>
    </CardHeader>
             <CardBody>
               {this.dropzone()}
             </CardBody>
           </Card>
          </Col>
        </Row>
      </Form>
      </Container>
      </DefaultLayout>
    );
  }
}

export default EditPost;
