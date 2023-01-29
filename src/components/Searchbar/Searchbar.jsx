import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';
export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <button className={css.button} type="submit">
          <BiSearch />
        </button>
        <input
          className={css.input}
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
