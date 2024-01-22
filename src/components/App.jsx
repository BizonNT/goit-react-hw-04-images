import { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

import getData from 'api/servises';

import css from './app.module.css';

const perPage = 12;

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getData(searchInput, currentPage, perPage);
        setHits(prevState => [...prevState, ...data.hits]);
        setTotalPages(Math.ceil(data.totalHits / perPage));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (searchInput) {
      fetchImages();
    }
  }, [currentPage, searchInput]);

  const onHandleSubmit = inputValue => {
    setSearchInput(inputValue);
    setHits([]);
    setCurrentPage(1);
  };

  const onHandleIncrease = useCallback(() => {
    setCurrentPage(prevState => prevState + 1);
  }, []);

  const toggleModal = useCallback(() => {
    setShowModal(prevState => !prevState);
  }, []);

  const onHandleClick = useCallback(
    event => {
      const picId = Number(event.target.id);
      const filter = hits.filter(hit => hit.id === picId);
      setFilter(filter);
      toggleModal();
    },
    [hits, toggleModal]
  );

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onHandleSubmit} />
      {hits.length !== 0 && (
        <ImageGallery items={hits} onClick={onHandleClick} />
      )}
      {error && <div>{error.message}</div>}
      {totalPages > currentPage && <Button onClick={onHandleIncrease} />}
      {loading && <Loader />}
      {showModal && <Modal onClose={toggleModal} filter={filter} />}
    </div>
  );
}
