import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { fetchImages } from 'api/api';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    search: '',
    pageNumber: 1,
    totalImages: 0,
    showModal: false,
    imagesOnPage: 0,
    images: null,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, pageNumber } = this.state;
    if (prevState.search !== this.state.search) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
      fetchImages(search)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));
          return this.setState({
            pageNumber: 1,
            images: imagesArray,
            imagesOnPage: imagesArray.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (prevState.pageNumber !== pageNumber && pageNumber !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
      fetchImages(search, pageNumber)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  handleFormSubmit = search => {
    this.setState({ search, images: [], pageNumber: 1 });
  };

  onNextFetch = () => {
    this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {
    const {
      images,
      isLoading,
      totalImages,
      imagesOnPage,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    const openModal = this.openModal;
    const toggleModal = this.toggleModal;
    const onNextFetch = this.onNextFetch;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>;
        {images && <ImageGallery images={images} openModal={openModal} />}
        {isLoading && <Loader />}
        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button onNextFetch={onNextFetch} />
        )}
        {showModal && (
          <Modal
            onClose={toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
        <ToastContainer />
      </>
    );
  }
}
