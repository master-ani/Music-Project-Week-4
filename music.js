console.log("Wellos")

// API key	0694584b4c6ffe0ff950eaff3c359580
// Shared secret	afecc2711821e1d39a9a4a4575bd1e0f
// token=HSY0vaM6FgS74MwyNUo-KeueMlvWJObI
// http://127.0.0.1:5500/music.html?token=Y48DiaGdoZp8NIMJ05tzt3zDtR46WUHo#

// a253b205a0ff1cd208669569cfa99d88

// https://ws.audioscrobbler.com/2.0/?method=track.search&track=${TRACK_NAME}&api_key=0694584b4c6ffe0ff950eaff3c359580&format=json

// https://itunes.apple.com/search?term=${TRACK_NAME}&entity=song&limit=200 


function searchActive(value)
{
    const input = document.querySelector(".nav__input");
    input.focus();
}

async function searchBarEnter(event)
{
    let value = document.querySelector(".nav__input").value;
    const input = document.querySelector(".nav__input");

    if (event.key == "Enter")
    {
        if (input === document.activeElement)
        {
            searchResult(value);
            await musicSearch(value)
            return setTimeout (() => loadingDone(), 1000)
        }
        value = document.querySelector(".music__input").value
        searchResult(value);
        await musicSearch(value)
        return setTimeout (() => loadingDone(), 1000)
    }
}

async function searchBarClick()
{
    const value = document.querySelector(".music__input").value;

    searchResult(value);
    await musicSearch(value)
    setTimeout(() => loadingDone(), 1000)
}

function searchResult(value)
{
    const searchBar = document.querySelector(".music__top");
    const searchResult = document.querySelector(".music__search__result");
    const searchBarHTML = `<h3 class="music__search__text">Search Results for:</h3>
    <h3 class="music__search__result">"${value}"</h3>`

    searchBar.innerHTML = searchBarHTML;

    searchBar.classList.add("music__search__result-visible")
}


async function musicSearch(value)
{
    const response = await fetch(`https://itunes.apple.com/search?term=${value}&entity=song&limit=6`)

    const searchResults = await response.json();

    const array = await searchResults.results;

    const updatedTime = array.map((song) => {
    const totalSeconds = Math.floor(song.trackTimeMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes} mins ${seconds} secs`;
});

    const updatedDate = array.map((song) => {
        return song.releaseDate.slice(0, 4);
    });

    const music = document.querySelector(".music__list");

    musicHTML = array.map((song, index) => `<div class="music music__invisible">
                            <figure class="music__image__wrapper">
                                <img src="${song.artworkUrl100}" alt="" class="music__image">
                                <div class="music__hover__list">
                                    <div class="music__hover1">
                                        <i class="fa-solid fa-clock hover__icon"></i>
                                        <h4 class="music__hover">${updatedTime[index]}</h4>
                                    </div>
                                    <div class="music__hover2">
                                        <i class="fa-solid fa-calendar hover__icon"></i>
                                        <h4 class="music__hover">${updatedDate[index]}</h4>
                                    </div>
                                    <div class="music__hover3">
                                        <i class="fa-solid fa-record-vinyl hover__icon"></i>
                                        <h4 class="music__hover">${song.primaryGenreName}</h4>
                                    </div>
                                </div>
                            </figure>
                            <div class="music__info__list">
                                <div class="music__info1">
                                    <i class="fa-brands fa-itunes-note music__icon1"></i>
                                    <h3 class="music__title">${song.trackName}</h3>
                                </div>
                                <div class="music__info2">
                                    <i class="fa-solid fa-folder music__icon2"></i>
                                    <h4 class="music__album">${song.collectionName}</h4>
                                </div>
                                <div class="music__info3">
                                    <i class="fa-solid fa-user music__icon3"></i>
                                    <h4 class="music__artist">${song.artistName}</h4>
                                </div>
                            </div>
                        </div>`).join("");

                        music.innerHTML = `<i class="fa-solid fa-spinner music__list__loading music__list__loading-visible"></i>` + musicHTML;

                        console.log('pending');
}


function loadingDone()
{
    const targetMusic = document.querySelectorAll(".music");

    const targetLoading = document.querySelector(".music__list__loading");

    targetLoading.classList.remove("music__list__loading-visible");
    targetMusic.forEach((music) => music.classList.remove("music__invisible"))

}
