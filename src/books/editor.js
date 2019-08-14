import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { createBook, updateBook } from '../store/actions/books';

class BookEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      book     : props.book || {},
      saving     : false,
      serverError: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const prevBook = this.props.book || {};
    const nextBook = nextProps.book || {};

    if (prevBook.objectId !== nextBook.objectId) {
      this.setState({ book: nextBook })
    }
  }

  close = () => {
    this.setState({
      book     : {},
      saving     : false,
      serverError: null
    });

    this.props.onHide()
  };

  prepareBook() {
    const { book } = this.state;

    return {
      ...book,
      name   : (book.name || '').trim() || null,
      price  : (book.price || '').trim() || null,
      category : (book.category || '').trim() || null
    }
  }

  save = () => {
    const book = this.prepareBook();

    const action = this.props.book
      ? this.props.updateBook
      : this.props.createBook;

    action(book)
      .then(() => this.close())
      .catch(e => this.setState({ serverError: e.message }));
  };

  onNameChange = e => this.setState({ book: { ...this.state.book, name: e.target.value } });
  onPriceChange = e => this.setState({ book: { ...this.state.book, price: e.target.value } });
  onCategoryChange = e => this.setState({ book: { ...this.state.book, category: e.target.value } });


  render() {
    const { show } = this.props;
    const { book, saving } = this.state;

    const isNew = !this.props.book;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNew ? 'Add' : 'Edit'} Book
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Book Name:</label>
              <input
                className="form-control"
                placeholder="Input name"
                value={book.name || ''}
                onChange={this.onNameChange}
              />
            </div>

            <div className="form-group">
              <label>Price:</label>
              <input
                className="form-control"
                placeholder="Input price"
                value={book.price || ''}
                onChange={this.onPriceChange}
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <input
                className="form-control"
                placeholder="Input category"
                value={book.category || ''}
                onChange={this.CategoryChange}
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.close}>
            Close
          </Button>
          <Button variant="primary" onClick={this.save} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, { createBook, updateBook })(BookEditor);
