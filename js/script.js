// Getting the search button, the main gallery div and the sub galllery div where the images will appear.
const searchBtn = document.getElementById('searchBtn');
const gallery = document.getElementById('galleryDiv');
const textDiv = document.getElementById('textDiv');
let imageSize;

// Making the search button clickable, which will let the API know what the user have searched for.
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    gallery.innerHTML = "";

    const pEl = document.querySelector('p');
    pEl.innerHTML = 'Click the images for their actual size!';

    const searchInput = document.getElementById('searchBar').value;
    const imageAmount = document.getElementById('imageAmount').value;

    imageSize = document.getElementById('imageSize').value;

    const sort = document.getElementById('sortingOption').value;

    // if-statement to handle whether the searchbar contains anything or not.
    if (searchInput.length == 0) {
        alert('Please write something before searching!');
    }
    else {
        getImages(searchInput, imageAmount, sort);
    }

});

// function to fetch the data from the API based on what the user have searched for, how many the user wants and what order the user wants them in.
function getImages(searchInput, imageAmount, sort) {

    const urlApi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f8225f8587b57e4d7419545d77848332&text=${searchInput}&safe_search=1&per_page=${imageAmount}&sort=${sort}&format=json&nojsoncallback=1`;

    fetch(urlApi)
        .then(response => {

            // logs the response from the API.
            console.log(response);

            // if-statement regarding error handling.
            if (response.status >= 200 && response.status < 300) {

                //returns the response from the API
                return response.json();
            }
            else if (response.status == 10 || response.status == 105) {
                alert('Sorry, the service is temporarily unavailable, try again later!')
                throw 'Sorry, the service is temporarily unavailable';
            }
            else if (response.status == 100) {
                alert('The API key passed was not valid or has expired, please contact the website owner.')
                throw 'The API key passed was not valid or has expired';
            }

        })

        .then(showImages)

        // error handling if the promise isn't kept and there's a network issue.
        .catch(error => {
            alert('Network Error!');
            console.log(error);
        });
}

// function creating img elements and appending them into the sub gallery div
function showImages(images) {

    if(images.photos.photo.length != 0) {
    
    for (let i = 0; i < images.photos.photo.length; i++) {

        const flickrImages = images.photos.photo[i];
        const aEl = document.createElement('a');
        const imgEl = document.createElement('img');

        aEl.append(imgEl);

        gallery.append(aEl);

        const linkPlaceholder = `https://live.staticflickr.com/${flickrImages.server}/${flickrImages.id}_${flickrImages.secret}_${imageSize}.jpg`;

        aEl.href = linkPlaceholder;
        aEl.target = '_blank';
        imgEl.src = linkPlaceholder;
    }
    }
    else {
        alert('No images found!');
    }
}
