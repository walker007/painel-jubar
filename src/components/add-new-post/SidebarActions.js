/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from "shards-react";

const SidebarActions = ({ title, status,visibilidade, changeStatusFunc }) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>

    <CardBody className="p-0">
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <span className="d-flex mb-2">
            <i className="material-icons mr-1">flag</i>
            <strong className="mr-1">Status:</strong> {status == 1 ? 'Editando' : 'Salvo'}{" "}
          </span>
          <span className="d-flex mb-2">
            <i className="material-icons mr-1">visibility</i>
            <strong className="mr-1">Visibilidade:</strong>{" "}
            <strong className={visibilidade == 1 ? 'text-success' : 'text-danger'}>{visibilidade == 1 ? 'Publico' : 'Privado'}</strong>{" "}
            {status == 1 ? '' : <a onClick={() => { changeStatusFunc() }} className="ml-auto" href="javascript:void(0);">Alterar</a>}
          </span>


        </ListGroupItem>
        <ListGroupItem className="d-flex px-3 border-0">
          <Button outline theme="accent" size="sm">
            <i className="material-icons">save</i> Salvar
          </Button>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

SidebarActions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarActions.defaultProps = {
  title: "Actions"
};

export default SidebarActions;
