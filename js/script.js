// When a user clicks the button a random gif of the 50 most trending GIFs on Giphy appears.

$(function() {
    // variables
    const giphyUrl = `https://api.giphy.com/v1/gifs/trending?api_key=VFjZH2MRuyqjAsHzJQGJNMiZKf48hWMV&limit=50&rating=pg`;
    const randomIndex = {
        largestNum: 25,
        smallestNum: 1,
        indexNum: null,
        play: function() {
            this.indexNum = Math.floor(Math.random() *
            (this.largestNum - this.smallestNum + 1)) + this.smallestNum;
            return this.indexNum
        }
    };

    // element references
    const $form = $('form');

    // event listeners
    $form.on('submit', handleGetData);

    // functions
    function handleGetData(evt) {
        evt.preventDefault();

        $.ajax(giphyUrl).then(function (giphyData) {
            $('form > #gif-parent').html(`
            <img src='${giphyData.data[randomIndex.play()].images.downsized.url}' 
            alt='${giphyData.data[randomIndex.play()].title}' 
            id='gif' class='center' height='500px' width='500px'/>`);

        }, function(error) {
            console.log("something went wrong");
            console.log(error);
        });
    };
});