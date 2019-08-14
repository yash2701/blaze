import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Backendless from 'backendless';

import { loadBooks, onBookCreate, onBookUpdate, onBookRemove } from '../store/actions/books';
import { getBooks } from '../store/reducers/index'

import Editor from './editor';
import DeleteConfirmation from './delete-confirmation';

const mapStateToProps = state => {
  const { loading, loaded, error, list: books } = getBooks(state);

  return {
    loading,
    loaded,
    error,
    books
  }
};

class Books extends Component {

  state = {
    showEditor : false,
    editorProps: null,

    showDeleteConfirmation : false,
    deleteConfirmationProps: null,
  };

  showEditor = book => this.setState({ showEditor: true, editorProps: { book } });
  hideEditor = () => this.setState({ showEditor: false, editorProps: null });

  showDeleteConfirmation = book => this.setState({ showDeleteConfirmation : true, deleteConfirmationProps: { book } });
  hideDeleteConfirmation = () => this.setState({ showDeleteConfirmation: false, deleteConfirmationProps: null });

  componentWillMount(){
    this.props.loadBooks();

    this.bookRT = Backendless.Data.of('Book').rt();

    this.bookRT.addCreateListener(this.props.onBookCreate);
    this.bookRT.addUpdateListener(this.props.onBookUpdate);
    this.bookRT.addDeleteListener(this.props.onBookRemove);
  }

  componentWillUnmount(){
    this.bookRT.removeCreateListener(this.props.onBookCreate);
    this.bookRT.removeUpdateListener(this.props.onBookUpdate);
    this.bookRT.removeDeleteListener(this.props.onBookRemove);
  }

  onAddClick = () => this.showEditor(null);
  onEditClick = book => this.showEditor(book);
  onDeleteClick = book => this.showDeleteConfirmation(book);

  renderBook = book => {
    return (
      <li key={book.objectId} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div>{book.name}</div>
        </div>
        <div>
          <div>{book.price}</div>
        </div>
        <div>
          <div>{book.category}</div>
        </div>
        <ButtonGroup>
          <Button size="sm" variant="outline-primary" onClick={() => this.onEditClick(book)}>Edit</Button>
          <Button size="sm" variant="outline-danger" onClick={() => this.onDeleteClick(book)}>Delete</Button>
        </ButtonGroup>
      </li>
    );
  };

  render() {
    const { loading, error, books } = this.props;
    const { showEditor, editorProps, showDeleteConfirmation, deleteConfirmationProps } = this.state;

    if (loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          Error: {error}
        </div>
      )
    }

    return (
      <div>
        <div className="mb-2">
        <div class="text-center">
          <Button onClick={this.onAddClick}>Add new Book</Button>
        </div>
          
          <Editor {...editorProps} show={showEditor} onHide={this.hideEditor}/>
        </div>

        <ul className="list-group">
          {books.map(this.renderBook)}
        </ul>

        <DeleteConfirmation
          {...deleteConfirmationProps}
          show={showDeleteConfirmation}
          onHide={this.hideDeleteConfirmation}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, { loadBooks, onBookCreate, onBookUpdate, onBookRemove })(Books);
