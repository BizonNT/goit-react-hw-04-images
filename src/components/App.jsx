import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import getData from 'api/servises';

import css from './app.module.css';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    searchInput: '',
    loading: false,
    error: null,
    hits: [],
    currentPage: 1,
    totalPages: 1,
    perPage: 12,
    showModal: false,
    filter: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchInput, currentPage, perPage, hits } = this.state;
    if (
      prevState.searchInput !== searchInput ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ loading: true });
      try {
        const data = await getData(
          searchInput,
          currentPage,
          perPage
        );
        this.setState({
          hits: [...hits, ...data.hits],
          totalPages: Math.ceil(data.totalHits / perPage),
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onHandleSubmit = ({ searchInput }) => {
    if (
      (this.state.searchInput !== searchInput) 
    ) {
      this.setState({ hits: [], searchInput: searchInput, currentPage: 1 });
    }
  };

  onHandleIncrease = () => {
    this.setState(({ currentPage }) => ({ currentPage: currentPage + 1 }));
  };

  onHandleClick = event => {
    const picId = Number(event.target.id);
    const filter = this.state.hits.filter(hit => hit.id === picId);
    this.setState({ filter: filter });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { hits, totalPages, currentPage, loading, showModal, filter } =
      this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onHandleSubmit} />
        {hits.length !== 0 && (
          <ImageGallery items={hits} onClick={this.onHandleClick} />
        )}
        {totalPages > currentPage && <Button onClick={this.onHandleIncrease} />}
        {loading && <Loader />}
        {showModal && <Modal onClose={this.toggleModal} filter={filter} />}
      </div>
    );
  }
}

export default App;
