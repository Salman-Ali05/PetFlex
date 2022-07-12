const apiKey = "api_key=ab37df0451c2445a57706ed26cc9b544"; //https://api.themoviedb.org/3/movie/550?api_key=ab37df0451c2445a57706ed26cc9b544 -> exemple d'un film des infos à recup

function getFilm(idMovie) {
    let xhttp = new XMLHttpRequest();  // appel de la fonction qui va exécuter la demande de request (dans JS de base)
    xhttp.onreadystatechange = function () { // fonction lors de l'envoie
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); // c'est la réponse ça, le JSON.parse => transforme une string en tableau d'objet
            let id = response.id;
            let title = response.original_title;
            let voteAvg = response.vote_average;
            let overview = response.overview;
            let posterPath = "https://image.tmdb.org/t/p/w500/" + response.poster_path;
            let releaseDate = response.release_date;
            let budget = response.budget;
            let genre = [];
            let i = 0;
            while (response.genres[i]) {
                genre[i] = response.genres[i];
                i++;
            }
            let statut = response.status;
            createDetailDiv(id, title, voteAvg, overview, posterPath, releaseDate, budget, genre, statut);
        }
    };
    xhttp.open("GET", "https://api.themoviedb.org/3/movie/" + idMovie + "?" + apiKey, true); 
    xhttp.send(); 
}

function createDivs(id, title, voteAvg, overview, posterPath, releaseDate) {
    var container = document.getElementsByClassName('container')[0]; // class = plusieur éléments donc [0] ([1],[2], ect... sont également possible mais dans ton cas only one :rel:)

    var newMovie = document.createElement('div'); // créer l'élément + ajour des class, id, text, ect... 
    newMovie.className = "movie";
    newMovie.id = id;
    var newMovieA = document.createElement('a');
    newMovieA.href = "detail.html?id=" + newMovie.id;

    var desc = document.createElement('div');
    desc.className = "desc";

    var newMovieTitle = document.createElement('p');
    newMovieTitle.className = 'movieTitle';
    newMovieTitle.innerHTML = title;

    var newMovieVote = document.createElement('p');
    newMovieVote.className = 'voteAvg';
    newMovieVote.innerHTML = voteAvg;

    var newMovieOver = document.createElement('p');
    newMovieOver.className = 'overview';
    newMovieOver.innerHTML = overview;

    var newMovieDate = document.createElement('p');
    newMovieDate.className = 'releaseDate';
    newMovieDate.innerHTML = releaseDate;

    var img = document.createElement('img');
    img.id = 'posterPath';
    img.src = posterPath;

    var imgA = document.createElement('a');
    imgA.href = "detail.html?id=" + newMovie.id;

    newMovieA.append(newMovieTitle); // ajoute newMovieTtile au parent (newMovie)
    newMovieA.append(newMovieVote);
    newMovieA.append(newMovieOver);
    newMovieA.append(newMovieDate);

    imgA.append(img);

    desc.append(newMovieA);

    newMovie.append(imgA);
    newMovie.append(desc); // ajoute desc au parent (newMovie)

    container.append(newMovie); // ajoute newMovie au parent (container)
}

function createTendance(id, title, voteAvg, overview, posterPath, releaseDate) {
    var container = document.getElementsByClassName('container')[0];

    var newMovie = document.createElement('div'); 
    newMovie.className = "movieT";
    newMovie.id = id;
    var newMovieA = document.createElement('a');
    newMovieA.href = "detail.html?id=" + newMovie.id;

    var desc = document.createElement('div');
    desc.className = "descT";

    var newMovieTitle = document.createElement('p');
    newMovieTitle.className = 'movieTitleT';
    newMovieTitle.innerHTML = "<u>Titre</u> : " + title;

    var newMovieVote = document.createElement('p');
    newMovieVote.className = 'voteAvgT';
    newMovieVote.innerHTML = "<u>Note</u> : " + voteAvg;

    var newMovieOver = document.createElement('p');
    newMovieOver.className = 'overviewT';
    newMovieOver.innerHTML = "<u>Synopsis</u> : " + overview;

    var newMovieDate = document.createElement('p');
    newMovieDate.className = 'releaseDate';
    newMovieDate.innerHTML = "<u>Date de sortie</u> : " + releaseDate;

    var img = document.createElement('img');
    img.id = 'posterPathT';
    img.src = posterPath;

    var imgA = document.createElement('a');
    imgA.href = "detail.html?id=" + newMovie.id;

    newMovieA.append(newMovieTitle);
    newMovieA.append(newMovieVote);
    newMovieA.append(newMovieOver);
    newMovieA.append(newMovieDate);

    desc.append(newMovieA);

    imgA.append(img);

    newMovie.append(imgA);
    newMovie.append(desc);

    container.append(newMovie);
}

function createDetailDiv(id, title, voteAvg, overview, posterPath, releaseDate, budget, genre, statut) {
    var container = document.getElementsByClassName('container')[0];
    container.className = 'containerD';

    var newMovie = document.createElement('div');
    newMovie.className = "movieD";
    newMovie.id = id;

    var desc = document.createElement('div');
    desc.className = "descD";

    var newMovieTitle = document.createElement('p');
    newMovieTitle.className = 'movieTitleD';
    newMovieTitle.innerHTML = "<u>Titre</u> : " + title;

    var newMovieVote = document.createElement('p');
    newMovieVote.className = 'voteAvgD';
    newMovieVote.innerHTML = "<u>Note</u> : " + voteAvg;

    var newMovieOver = document.createElement('p');
    newMovieOver.className = 'overviewD';
    newMovieOver.innerHTML = "<u>Description</u> : " + overview;

    var newMovieDate = document.createElement('p');
    newMovieDate.className = 'releaseDateD';
    newMovieDate.innerHTML = "<u>Date de sortie</u> : " + releaseDate;

    var newMovieBudget = document.createElement('p');
    newMovieBudget.className = "budgetD";
    newMovieBudget.innerHTML = "<u>Budget</u> : " + budget + "$";

    var newMovieType = document.createElement('p');
    newMovieType.className = "typeD";
    newMovieType.innerHTML = "<u>Type</u> : ";
    for (let i = 0; i < genre.length; i++) {
        if (i == genre.length - 1) {
            newMovieType.innerHTML += genre[i]['name'];
        } else {
            newMovieType.innerHTML += genre[i]['name'] + ", ";
        }
    }

    var newMovieStatut = document.createElement('p');
    newMovieStatut.className = "statutD";
    newMovieStatut.innerHTML = "<u>Staut</u> : " + statut;

    var img = document.createElement('img');
    img.id = 'posterPathD';
    img.src = posterPath;

    var ret = document.createElement('a');
    ret.className = "return";
    ret.innerHTML = "Retour";
    ret.href = "javascript:history.back()";


    desc.append(newMovieTitle);
    desc.append(newMovieVote);
    desc.append(newMovieOver);
    desc.append(newMovieDate);
    desc.append(newMovieBudget);
    desc.append(newMovieType);
    desc.append(newMovieStatut);
    desc.append(ret);

    newMovie.append(img);
    newMovie.append(desc); //

    container.append(newMovie);
}

function createImgGallery(img) {

    var container = document.getElementsByClassName('containerD')[0];

    var movieImg = document.createElement('div');
    movieImg.className = 'gallery';

    for (let i = 0; i < img.length; i++) {
        var oneImg = document.createElement('img');
        oneImg.src = "https://image.tmdb.org/t/p/w500/" + img[i];
        oneImg.className = 'imgD';
        movieImg.append(oneImg);
    }
    container.append(movieImg);
}

function createVidsGallery(vidsKeys) {

    var container = document.getElementsByClassName('containerD')[0];

    var movieVid = document.createElement('div');
    movieVid.className = 'videos';

    for (let i = 0; i < vidsKeys.length; i++) {
        var oneVid = document.createElement('iframe');
        oneVid.className = 'vidD';
        oneVid.src = "https://www.youtube.com/embed/" + vidsKeys[i];
        oneVid.setAttribute('allowfullscreen', true);
        movieVid.append(oneVid);
    }
    container.append(movieVid);
}

function createCastGallery(cast) {
    var container = document.getElementsByClassName('containerD')[0];

    var castGallery = document.createElement('div');
    castGallery.className = 'castGallery';

    for (let i = 0; i < cast.length; i++) {
        var oneCast = document.createElement('div');
        oneCast.className = 'casts';
        oneCast.id = cast[i].id;

        let castName = document.createElement('p');
        castName.id = "castN";
        castName.innerHTML = cast[i].name;

        let castPicture = document.createElement('img');
        if (cast[i].profile_path != null) {
            castPicture.id = "castPic";
            castPicture.src = "https://image.tmdb.org/t/p/w500/" + cast[i].profile_path;
            let castA = document.createElement('a');
            castA.href = "castDetails.html?id=" + oneCast.id;
            castA.append(castPicture, castName);
            oneCast.append(castA);
        } else {
            castPicture.id = "castUnfound";
            castPicture.src = "images/doshta.jpg";
            let castA = document.createElement('a');
            castA.href = "cast404.html?id=heh";
            castA.append(castPicture, castName);
            oneCast.append(castA);
        }
        castGallery.append(oneCast);
    }

    container.append(castGallery);
}

function createCastDetail(name, pic, bio, birthday, death, known, birthPlace, popularity) {
    var container = document.getElementsByClassName('container')[0];
    container.className = 'containerD';

    var cast = document.createElement('div');
    cast.className = "castDetails";

    var castDetail = document.createElement('div');
    castDetail.className = "castDetailDesc";

    var castPic = document.createElement('img');
    castPic.id = "castDetailPic";
    castPic.src = "https://image.tmdb.org/t/p/w500/" + pic;

    var hr = document.createElement('hr');

    var castNameBirth = document.createElement('h2');
    castNameBirth.id = "castNameBirth";
    castNameBirth.innerHTML = name + " (" + birthday + ")";

    var castBio = document.createElement('p');
    castBio.id = "castBio";
    castBio.innerHTML = "<u>Biographie</u> : " + bio;

    var castKnow = document.createElement('p');
    castKnow.id = "castKnow";
    castKnow.innerHTML = "<u>Profession</u> : " + known;

    var castBirthPlace = document.createElement('p');
    castBirthPlace.id = "castBirthP";
    castBirthPlace.innerHTML = "<u>Lieu de naissance</u> : " + birthPlace;

    var castPopularity = document.createElement('p');
    castPopularity.innerHTML = "<u>Popularité</u> : " + popularity;

    var ret = document.createElement('a');
    ret.className = "return";
    ret.innerHTML = "Retour";
    ret.href = "javascript:history.back()";

    if (death != "Alive") {
        var castDeath = document.createElement('p');
        castDeath.innerHTML = death;
        castDetail.append(castNameBirth, castDeath, castBirthPlace, castKnow, castBio, castPopularity);
    } else {
        castDetail.append(castNameBirth, castBirthPlace, castKnow, castBio, castPopularity);
    }

    cast.append(castPic, hr, castDetail, ret);
    container.append(cast);
}

function createRecommendation(recomTab) {

    var container = document.getElementsByClassName('containerD')[0];

    var recom = document.createElement('div');
    recom.className = "recom";
    recom.id = id;

    for (let i = 0; i < recomTab.length; i++) {
        var oneRecom = document.createElement('div');
        oneRecom.className = "oneRecom";

        var recomTitle = document.createElement('p');
        recomTitle.id = "recomT";
        recomTitle.innerHTML = recomTab[i].original_title;

        var recomPoster = document.createElement('img');
        recomPoster.id = "recomP";
        if (recomTab[i].poster_path != null) {
            recomPoster.src = "https://image.tmdb.org/t/p/w500/" + recomTab[i].poster_path;
            var recomA = document.createElement('a');
            recomA.href = "detail.html?id=" + recomTab[i].id;
        } else {
            recomPoster.src = "images/no.jpg";
            var recomA = document.createElement('a');
            recomA.href = "detail404.html?id=heh";
        }


        recomA.append(recomPoster, recomTitle);

        oneRecom.append(recomA);

        recom.append(oneRecom);
    }

    container.append(recom);
}

function createCastRecommendation(recomTab) {

    var container = document.getElementsByClassName('containerD')[0];

    var recom = document.createElement('div');
    recom.className = "castRecom";
    recom.id = id;

    for (let i = 0; i < recomTab.length; i++) {
        var oneRecom = document.createElement('div');
        oneRecom.className = "oneRecom";

        var recomTitle = document.createElement('p');
        recomTitle.id = "recomT";
        recomTitle.innerHTML = recomTab[i].original_title;

        var recomPoster = document.createElement('img');
        recomPoster.id = "recomP";
        if (recomTab[i].poster_path != null) {
            recomPoster.src = "https://image.tmdb.org/t/p/w500/" + recomTab[i].poster_path;
            var recomA = document.createElement('a');
            recomA.href = "detail.html?id=" + recomTab[i].id;
        } else {
            recomPoster.src = "images/no.jpg";
            var recomA = document.createElement('a');
            recomA.href = "detail404.html?id=heh";
        }


        recomA.append(recomPoster, recomTitle);

        oneRecom.append(recomA);

        recom.append(oneRecom);
    }

    container.append(recom);
}

function getPopularMovies() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); 
            for (var i = 0; i < response['results'].length; i++) {
                if (i == 0) { 
                    let id = response['results'][i].id;
                    let title = response['results'][i].original_title;
                    let voteAvg = response['results'][i].vote_average;
                    let overview = response['results'][i].overview;
                    let posterPath = "https://image.tmdb.org/t/p/w500/" + response['results'][i].poster_path;
                    let releaseDate = response['results'][i].release_date;
                    createTendance(id, title, voteAvg, overview, posterPath, releaseDate);
                } else { 
                    let id = response['results'][i].id;
                    let title = response['results'][i].original_title;
                    let voteAvg = response['results'][i].vote_average;
                    let overview = response['results'][i].overview;
                    let posterPath = "https://image.tmdb.org/t/p/w500/" + response['results'][i].poster_path;
                    let releaseDate = response['results'][i].release_date;
                    createDivs(id, title, voteAvg, overview, posterPath, releaseDate);
                }
            }
        }
    };
    xhttp.open("GET", "https://api.themoviedb.org/3/discover/movie?" + apiKey, true); 
    xhttp.send(); 
}

function getLatestMovies() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); 
            for (var i = 0; i < response['results'].length; i++) {
                if (i == 0) { 
                    let id = response['results'][i].id;
                    let title = response['results'][i].original_title;
                    let voteAvg = response['results'][i].vote_average;
                    let overview = response['results'][i].overview;
                    let posterPath = "https://image.tmdb.org/t/p/w500/" + response['results'][i].poster_path;
                    let releaseDate = response['results'][i].release_date;
                    createTendance(id, title, voteAvg, overview, posterPath, releaseDate);
                } else { 
                    let id = response['results'][i].id;
                    let title = response['results'][i].original_title;
                    let voteAvg = response['results'][i].vote_average;
                    let overview = response['results'][i].overview;
                    let posterPath = "https://image.tmdb.org/t/p/w500/" + response['results'][i].poster_path;
                    let releaseDate = response['results'][i].release_date;
                    createDivs(id, title, voteAvg, overview, posterPath, releaseDate);
                }
            }
        }
    };
    xhttp.open("GET", "https://api.themoviedb.org/3/movie/upcoming?" + apiKey + "&language=en-US&page=1", true);

    xhttp.send(); 
}

function getHighestRates() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); 
            for (var i = 0; i < response['results'].length; i++) {
                if (i == 0) { 
                    let id = response['results'][i].id;
                    let title = response['results'][i].original_title;
                    let voteAvg = response['results'][i].vote_average;
                    let overview = response['results'][i].overview;
                    let posterPath = "https://image.tmdb.org/t/p/w500/" + response['results'][i].poster_path;
                    let releaseDate = response['results'][i].release_date;
                    createTendance(id, title, voteAvg, overview, posterPath, releaseDate);
                } else { 
                    let id = response['results'][i].id;
                    let title = response['results'][i].original_title;
                    let voteAvg = response['results'][i].vote_average;
                    let overview = response['results'][i].overview;
                    let posterPath = "https://image.tmdb.org/t/p/w500/" + response['results'][i].poster_path;
                    let releaseDate = response['results'][i].release_date;
                    createDivs(id, title, voteAvg, overview, posterPath, releaseDate);
                }
            }
        }
    };
    xhttp.open("GET", "https://api.themoviedb.org/3/movie/top_rated?" + apiKey + "&language=en-US&page=1", true); 
    xhttp.send(); 
}

function getImages(id) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); 
            let images = [];
            for (var i = 0; i < response['backdrops'].length; i++) {
                images[i] = response['backdrops'][i]['file_path'];
            }
            createImgGallery(images);
        }
    };
    xhttp.open("GET", "https://api.themoviedb.org/3/movie/" + id + "/images?" + apiKey, true); 
    xhttp.send();
}

function getVids(id) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); 
            let videosKeys = [];
            for (let i = 0; i < response['results'].length; i++) {
                videosKeys[i] = response['results'][i]['key'];
            }
            createVidsGallery(videosKeys);
        }
    };

    xhttp.open("GET", "https://api.themoviedb.org/3/movie/" + id + "/videos?" + apiKey, true); 
    xhttp.send();
}

function getFullCast() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); 
            let cast = [];
            for (let i = 0; i < response['cast'].length; i++) {
                cast[i] = response['cast'][i];
            }
            createCastGallery(cast);
        }
    };

    xhttp.open("GET", "https://api.themoviedb.org/3/movie/" + id + "/credits?" + apiKey, true); 
    xhttp.send();
}


function getCast(idCast) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); 
            let name = response.name;
            let pic = response.profile_path;
            let bio = response.biography;
            let birthday = response.birthday;
            let death = response.deathday;
            if (death == null) {
                death = "Alive";
            }
            let known = response.known_for_department;
            let birthPlace = response.place_of_birth;
            let popularity = response.popularity;
            createCastDetail(name, pic, bio, birthday, death, known, birthPlace, popularity);
        }
    };

    xhttp.open("GET", "https://api.themoviedb.org/3/person/" + idCast + "?" + apiKey, true); 
    xhttp.send();
}

function getRecommendation(id) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); 
            let recommendationTab = [];
            for (var i = 0; i < response['results'].length; i++) {
                recommendationTab[i] = response['results'][i];
            }
            createRecommendation(recommendationTab);
        }
    };

    xhttp.open("GET", "https://api.themoviedb.org/3/movie/" + id + "/recommendations?" + apiKey, true); 
    xhttp.send();
}

function getCastMovieRecom(idCast) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); 
            let recommendationTab = [];
            for (var i = 0; i < response['cast'].length; i++) {
                recommendationTab[i] = response['cast'][i];
            }
            createCastRecommendation(recommendationTab);
        }
    };

    xhttp.open("GET", "https://api.themoviedb.org/3/person/" + idCast + "/movie_credits?" + apiKey, true);
    xhttp.send();
}

function liveSearch(stringToSearch) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            let recommendationTab = [];
            for (var i = 0; i < response['cast'].length; i++) {
                recommendationTab[i] = response['cast'][i];
            }
            createCastRecommendation(recommendationTab);
        }
    };

    xhttp.open("GET", "https://api.themoviedb.org/3/search/multi?" + apiKey + "&query=" + stringToSearch + "&page=1&include_adult=false", true);
    xhttp.send();
}

/*function slickSlider() {
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        focusOnSelect: true
    });

    $('a[data-slide]').click(function (e) {
        e.preventDefault();
        var slideno = $(this).data('slide');
        $('.slider-nav').slick('slickGoTo', slideno - 1);
    });
}*/


let menu = document.getElementById('menu');
window.addEventListener('scroll', (event) => {
    if (scrollY >= 100) {
        menu.id = 'menuAfter';
    } else {
        menu.id = 'menu';
    }
});