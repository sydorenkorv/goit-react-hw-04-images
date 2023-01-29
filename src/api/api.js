export function fetchImages (query = '', pageNumber = 1) {
  return fetch(`https://pixabay.com/api/?q=${query}&page=${pageNumber}&key=32124506-65f1bceba0e647ef73939c9d6&image_type=photo&orientation=horizontal&per_page=12`)

    .then(res => res.json())
}


export { fetchImages as default };