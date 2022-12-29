import apiService from './apiService';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newApiService = new apiService();



form.addEventListener('submit', onClickBtn);
loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtn.classList.add('visually-hidden');

const lightBox = new SimpleLightbox('.gallery a');
lightBox.on('show.simplelightbox');


async function onClickBtn(e) {
  try {
    e.preventDefault();

   newApiService.query = e.currentTarget.elements.searchQuery.value;
   newApiService.resetPage();
    
  const response = await newApiService.fetchSearch();

    if (response.total !== 0) {
      clearContainer();
      createGallery(response);
      Notiflix.Notify.info(`"Hooray! We found ${response.totalHits} images."`);
      loadMoreBtn.classList.remove('visually-hidden');
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('visually-hidden');
    }
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}
  


function createGallery({ hits }) {
  const markup = hits
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}"><img class="search-photo"src="${webformatURL}" alt="${tags}" loading="lazy" width ="340 px"/></a>  
  
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeEnd', markup);
  lightBox.refresh();
}

async function onLoadMore() {
  const response = await newApiService.fetchSearch();
  createGallery(response);
  if (gallery.children.length >= response.totalHits) {
    Notiflix.Notify.info(
      'We are sorry, but you have reached the end of search results.'
    );
    loadMoreBtn.classList.add('visually-hidden');
  }
};

function clearContainer() {
  gallery.innerHTML = '';
};


