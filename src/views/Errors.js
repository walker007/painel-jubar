import React, { Component } from "react";
import { Container, Button } from "shards-react";

class Errors extends Component{

  render(){
    return( <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>404</h2>
        <h3>Algo Deu Errado!</h3>
        <p>A página que você está procurando não existe.</p>
        <Button pill onClick={this.props.history.goBack}>&larr; Voltar</Button>
      </div>
    </div>
  </Container>)
  }
}

export default Errors;
