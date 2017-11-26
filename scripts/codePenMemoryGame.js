// JavaScript source code

// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

// Adapted by Miguel Legault 8547102

(function () {
    var Memory = {

        init: function (cards) {
            this.bindingDone = false; // Flag to indicate whether or not binding is done. Starts as false
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $("button.restart");
            this.$newGameButton = $("#newGame"); // Add a new game button available anytime
            this.$gameSettingsButton = $("#gameSettings"); // Add a settings button
            this.$settingsModal = $("#settingsModal"); // Add a modal settings dialog
            this.$settingsDoneButton = $("#settingsDone"); // Add a button to dismiss settings dialog
            this.$settingsAbandonButton = $("#abandonNewSettings"); // Add a button to leave settings dialog without changing anything
            this.buildHTML = this.buildImageCardHTML; // Assign a the correct buildHTML function for the collection
            //this.buildHTML = this.buildTextCardHTML;
            this.currentCardCollection = "cardCollection1"; // Set the card collection
            cards = eval(this.currentCardCollection); 
            this.cardsArray = $.merge([], cards); // Merge in a manner that preserves the cards array
            this.cardsArray = $.merge(this.cardsArray, this.cardsArray);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },

        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function () {
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.binding();
            this.paused = false;
            this.guess = null;
        },

        binding: function () {
            this.$memoryCards.on("click", this.cardClicked);

            if (this.bindingDone == false) { // Only perform button binding once
                this.$restartButton.on("click", $.proxy(this.reset, this));
                this.$newGameButton.on("click", $.proxy(this.reset, this)); // Bind the newGame button
                this.$gameSettingsButton.on("click", $.proxy(this.showSettings, this)); // Bind the settings button
                this.$settingsDoneButton.on("click", $.proxy(this.updateSettings, this)); // Bind the settingsDone button
                this.$settingsAbandonButton.on("click", $.proxy(this.abandonSettings, this)); // Bind the settingsAbandon button
                this.bindingDone = true;
            }
        },
        // kinda messy but hey
        cardClicked: function () {
            var _ = Memory;
            var $card = $(this);
            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                $card.find(".inside").addClass("picked");
                if (!_.guess) {
                    _.guess = $(this).attr("data-id");
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched");
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function () {
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);
                }
                if ($(".matched").length == $(".card").length) {
                    _.win();
                }
            }
        },

        win: function () {
            this.paused = true;
            setTimeout(function () {
                Memory.showModal();
                Memory.$game.fadeOut();
            }, 1000);
        },
        /* Add a settings dialog */
        showSettings: function () {
            this.paused = true;
            this.$overlay.show();
            this.$settingsModal.fadeIn("slow");
            Memory.$game.fadeOut();

        },

        abandonSettings: function () {
            this.paused = false;
            this.hideSettings();
            this.$game.show("slow");
        },

        hideSettings: function () {
            this.$overlay.hide();
            this.$settingsModal.hide();
        },

        updateSettings: function () {
            // Commit new settings to memory
            var collectionButtons = document.getElementsByName("collectionRadio");
            for (var i = 0; i < collectionButtons.length;i++){
                if (collectionButtons[i].checked) {
                    cards = eval(collectionButtons[i].value);
                    break;
                }
            } 
            //this.buildHTML = this.buildTextCardHTML;

            //cards = cardCollection2; // Set the card collection
            this.cardsArray = $.merge([], cards); // Merge in a manner that preserves the cards array
            this.cardsArray = $.merge(this.cardsArray, this.cardsArray);

            // Restart the game
            this.hideSettings();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show("slow");

        },

        showModal: function () {
            this.$overlay.show();
            this.$modal.fadeIn("slow");
        },

        hideModal: function () {
            this.$overlay.hide();
            this.$modal.hide();
        },

        reset: function () {
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show("slow");
        },

        // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
        shuffle: function (array) {
            var counter = array.length, temp, index;
            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);
                // Decrease counter by 1
                counter--;
                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },


        // This builds the HTML of image cards. Expects an img field in the collection
        buildImageCardHTML: function () {

            var frag = '';
            this.$cards.each(function (k, v) {
                frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="'+ v.img + '" alt="' + v.name + '" /></div>\
				<div class="back"><img src="images/eagleHead.svg"\
				alt="Eagle Head Logo" /></div></div>\
				</div>';
            });
            return frag;
        },

        // This builds the HTML of text cards. Uses the name field in the collection
        buildTextCardHTML: function () { // This version uses text and uses different backside artwork
        var frag = '';
        this.$cards.each(function (k, v) {
            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><p>'+v.name+'</p></div>\
				<div class="back"><img src="images/eagleHead.svg"\
				alt="Codepen" /></div></div>\
				</div>';
        });
        return frag;
    } 

        /* createCards() -- A function to create an array of cards. The array must at least have
            a name: the name of the card
            an id: a value that we'll use to match cards up: cards with same id are identical
            some content: the original game used images for this, by for some cards it could be text
        */

        /* buildCardHTML() -- A function to create the card's HTML
            The original code to build cards uses images but different flavours of buildCardHTML
            can use different content, such as plain text
        */

        /* The createCards() and buildCardHTML functions are coordinated in the sense
            that the particular createCards() function must build a structure with
            content that a particular buildCardHTML understands. Images, text, color.
            These 2 functions should be generated by some sort of creating code,
            factory-style.
            Something like createGame(cardStyle, levelOfDifficulty)()
            that return an object with createCards and buildCardHTML functions taylored
            to the particular version of the game.
        */
    };

    var cards;

    var cardCollection1 = [
		{
		    name: "aligator",
		    img: "images/ImageSet1/aligator.png",
		    id: 1,
		},
		{
		    name: "antillope",
		    img: "images/ImageSet1/antillope.png",
		    id: 2
		},
		{
		    name: "bird",
		    img: "images/ImageSet1/bird.png",
		    id: 3
		},
		{
		    name: "bird2",
		    img: "images/ImageSet1/bird2.png",
		    id: 4
		},
		{
		    name: "cat",
		    img: "images/ImageSet1/cat.png",
		    id: 5
		},
		{
		    name: "dog",
		    img: "images/ImageSet1/dog.png",
		    id: 6
		},
		{
		    name: "elephant",
		    img: "images/ImageSet1/elephant.png",
		    id: 7
		},
		{
		    name: "girafe",
		    img: "images/ImageSet1/girafe.png",
		    id: 8
		},
		{
		    name: "gorilla",
		    img: "images/ImageSet1/gorilla.png",
		    id: 9
		},
		{
		    name: "horse",
		    img: "images/ImageSet1/horse.png",
		    id: 10
		},
		{
		    name: "kangooroo",
		    img: "images/ImageSet1/kangooroo.png",
		    id: 11
		},
		{
		    name: "llama",
		    img: "images/ImageSet1/llama.png",
		    id: 12
		},/*
        {
            name: "seal",
            img: "images/ImageSet1/seal.png",
            id: 13
        },*/
    ];

    
    var cardCollection2 = [
		{
		    name: "php",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
		    id: 1,
		},
		{
		    name: "css3",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
		    id: 2
		},
		{
		    name: "html5",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
		    id: 3
		},
		{
		    name: "jquery",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
		    id: 4
		},
		{
		    name: "javascript",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
		    id: 5
		},
		{
		    name: "node",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
		    id: 6
		},
		{
		    name: "photoshop",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
		    id: 7
		},
		{
		    name: "python",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
		    id: 8
		},
		{
		    name: "rails",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
		    id: 9
		},
		{
		    name: "sass",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
		    id: 10
		},
		{
		    name: "sublime",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
		    id: 11
		},
		{
		    name: "wordpress",
		    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
		    id: 12
		},
    ];

    Memory.init(cards);


})();

