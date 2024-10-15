function addToProfile(movieId, title, year, genre, director, actors, imdbRating, poster) {
    fetch('/profile/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movieId, title, year, genre, director, actors, imdbRating, poster })
    })
    .then(response => {
      if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'The movie has been added to your profile.',
          });
      } else {
        Swal.fire({
            title: 'Error!',
            text: 'Failed to add movie to profile.',
            icon: 'error',
            animation: false,
            customClass: {
                popup: 'animated tada'
        }
    });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
          title: 'Error!',
          text: 'Failed to add movie to profile.',
          icon: 'error',
          animation: false,
          customClass: {
              popup: 'animated tada'
      }
    });
    });
  }