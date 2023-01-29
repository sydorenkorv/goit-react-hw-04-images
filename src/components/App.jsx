import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import css from './App.module.css';
import { BiSearch } from 'react-icons/bi';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadMoreImages = useCallback(async () => {
    setIsLoading(true);
    const result = await axios(
      `https://pixabay.com/api/?key=32124506-65f1bceba0e647ef73939c9d6&q=${query}&image_type=photo&per_page=12&page=${
        page + 1
      }`
    );
    setImages([...images, ...result.data.hits]);
    setPage(page + 1);
    setTotalPages(Math.ceil(result.data.totalHits / 12));
    setIsLoading(false);
  }, [images, query, page]);

  const searchImages = useCallback(
    async event => {
      event.preventDefault();
      setIsLoading(true);
      const result = await axios(
        `https://pixabay.com/api/?key=32124506-65f1bceba0e647ef73939c9d6&q=${query}&image_type=photo&per_page=12`
      );
      setImages(result.data.hits);
      setPage(1);
      setTotalPages(Math.ceil(result.data.totalHits / 12));
      setIsLoading(false);
    },
    [query]
  );

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <div>
      <form className={css.form} onSubmit={searchImages}>
        <button className={css.button} type="submit">
          <BiSearch />
        </button>
        <input
          className={css.input}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
      </form>
      <div>
        <ul className={css.container}>
          {images.map(image => (
            <li className={css.item} key={image.id}>
              <img
                src={image.webformatURL}
                alt={image.tags}
                style={{ width: '300px', height: '200px' }}
                onClick={() => setSelectedImage(image)}
              />
            </li>
          ))}
        </ul>
        {page <= totalPages && (
          <button
            className={css.loadmorebutton}
            onClick={loadMoreImages}
            disabled={isLoading}
          >
            Load More
          </button>
        )}
        {isLoading && <div>Loading...</div>}
      </div>
      <div>
        {selectedImage && (
          <Modal
            isOpen={!!selectedImage}
            onClose={closeModal}
            selectedImage={selectedImage}
          />
        )}
      </div>
    </div>
  );
};
