var app = angular.module("Robin", []);
app.controller("core", function ($scope) {

    $scope.themeList = [{
        color: '#F44336',
        active: true
    }];

    $scope.savedTheme = localStorage.getItem('theme');
    $scope.theme = (localStorage.getItem('theme') !== null) ? JSON.parse($scope.savedTheme) : $scope.themeList;
    $scope.themeStyle = (localStorage.getItem('theme') !== null) ? {
        'background-color': $scope.theme[0][0]['color']
    } : console.log('no color set');


    var checkBox, status, code;

    $scope.init = function () {
        // Use default value color = 'red' and likesColor = true.
        chrome.storage.sync.get({
            booleans: true,
            fontSizes: "12"
        }, function (items) {
            document.getElementById('like').checked = items.booleans;
            document.getElementById("number").value = items.fontSizes;
        });
    };


    $scope.setColor = function (color) {

        $scope.removeLocalStorage('theme');
        $scope.theme = [];
        $scope.theme.push([{
            color: color,
            active: true
        }]);
        localStorage.setItem('theme', JSON.stringify($scope.theme));
        $scope.themeStyle = {
            'background-color': color
        }
    }

    $scope.clearLocalStorage = function () {

        $scope.removeLocalStorage('theme');
        $scope.loadDefault();
    };

    $scope.removeLocalStorage = function (key) {
        localStorage.removeItem(key);
    };



    /**
     * Adds Saves the Optoins 
     */
    $scope.openDyslexic = function () { // Saves options to chrome.storage
        checkBox = document.getElementById('like').checked;
        chrome.storage.sync.set({
            booleans: checkBox
        }, function () { // Update status to let user know options were saved.
            reload();
        });
    };


    function reload() {
        chrome.tabs.getSelected(null, function (tab) {
            code = 'window.location.reload();';
            chrome.tabs.executeScript(tab.id, {
                code: code
            });
        });
    }


    $scope.changeNumber = function () {
        fontSize = document.getElementById('number').value;
        chrome.storage.sync.set({
            fontSizes: fontSize
        }, function () { // Update status to let user know options were saved.
            reload();
        });
    };








});
