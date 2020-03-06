import React, { Component} from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, FormInput } from "shards-react";


import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const Editor = ({state,changeTitle,changePost}) => {
return(
      <Card small className="mb-3">
        <CardBody>
          <div className="add-new-post">
            
            <FormInput size="lg" className="mb-3" placeholder="Título do post" value={state.Post.title} onChange={e => { changeTitle(e.target.value) }} id='title'/>
            <ReactQuill value={state.Post.post} onChange={ changePost} className="add-new-post__editor mb-1" id='editor' />
          </div>
        </CardBody>
      </Card>
    )
  }


export default Editor;
