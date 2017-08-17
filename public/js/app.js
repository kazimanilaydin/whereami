window.addEventListener('load', function(){

    var whereAmI = function() {
        this.started        = false;
        this.notSupported   = false;
        this.error          = false;
        this.errorText      = "";
        this.coords         = {
                                latitude: 0,
                                longitude: 0
                            }
    }

    whereAmI.prototype = function() {

        var init = function(){
            this.started = true;

            var map             = document.getElementById('map');
            var home            = document.getElementById('home');
            var showMapButton   = document.getElementById('showMap');

            var _self = this;

            showMapButton.addEventListener('click', function(){
                _self.getLocation();
                _self.showMap(map, home);
            });
        }

        var showMap = function(showMap, hideHome){
            showMap.classList.remove('hide');
            hideHome.classList.add('hide');
        }

        var cookieInit = function(){
            var _setErrorFromCookie = false;

            (this.getErrorCookie("error") == -1 || 
            this.getErrorCookie("error") != this.error ||
            this.getErrorCookie("errorText") == -1 || 
            this.getErrorCookie("errorText") != this.errorText)
                ? this.setErrorCookie()
                : _setErrorFromCookie = true;

            this.error      = this.getErrorCookie("error");
            this.errorText  = this.getErrorCookie("errorText");
            
            return true;
        }

        var getErrorCookie = function(cookieName){
            var allCookies = document.cookie;

            cookieArray = allCookies.split(';');

            for(var i = 0; i < cookieArray.length; i++){
                name = cookieArray[i].split('=')[0];
                value = cookieArray[i].split('=')[1];

                if(name.trim() == cookieName){
                    return value;
                    break;
                }
            }

            return -1;
        }

        var setErrorCookie = function(){
            document.cookie = "error=" + this.error;
            document.cookie = "errorText=" + this.errorText;
            return true;
        }

        var getLocation = function() {

            var _self = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    _self.setLocation(position);
                }, function(error){
                    _self.setError(error);
                });
            } else {
                this.notSupported   = true;
                this.error          = true;
                this.errorText      = "Sorry - your browser doesn't support geolocation!";
                this.cookieInit();

            }
        }

        var setLocation = function(position) {
            var latitude    = position.coords.latitude,
                longitude   = position.coords.longitude;

                this.coords = {
                    latitude: latitude,
                    longitude: longitude
                }

                var displayText = "User latitude is " + latitude + " and longitude is " + longitude;

                console.log(displayText);

                this.cookieInit();

                this.getMap();
        }

        var setError = function(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorText = "Permission was denied";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorText = "Location data not available";
                    break;
                case error.TIMEOUT:
                    errorText = "Location request timeout";
                    break;
                case error.UNKNOWN_ERROR:
                    errorText = "An unspecified error occurred";
                    break;
                default:
                    errorText = "Who knows what happened...";
                    break;
            }

            this.error      = true;
            this.errorText  = errorText;
            this.cookieInit();

        }

        var getMap = function(){
            var latitude    = this.coords.latitude, 
                longitude   = this.coords.longitude;

                console.log(latitude, longitude);

                var map = L.map('map').setView([latitude, longitude], 13);

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                var marker = L.icon({
                    iconUrl: './img/marker.png',
                    iconSize:     [48, 48], 
                    iconAnchor:   [26, 94], 
                    popupAnchor:  [-3, -76] 
                });

                L.marker([latitude, longitude], {icon: marker}).bindPopup("You are HERE!").addTo(map).openPopup();
        }

        return {
            init: init,
            showMap: showMap,
            cookieInit: cookieInit,
            getErrorCookie: getErrorCookie,
            setErrorCookie: setErrorCookie,
            getLocation: getLocation,
            setLocation: setLocation,
            setError: setError,
            getMap: getMap
        }

    }();

    var _proto_ = new whereAmI();

    _proto_.init();

});