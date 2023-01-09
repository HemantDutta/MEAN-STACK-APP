const app = angular.module('myApp', ["ngRoute"]);
app.controller('viewCtrl', ($scope, $http)=>{
    $http.get('http://localhost:3005/')
        .then((res)=>{
            $scope.data = res.data;
        })
});


//Adding entry into database
app.controller('addCtrl', function ($scope){
    $scope.addEntry = function () {
        const newEntry = `{"id": "${$scope.id}", "name": "${$scope.name}", "category": "${$scope.category}", "rating": "${$scope.rating}"}`;
        console.log(newEntry);
        // var newData = "{\"id\":\"" + $scope.id + "\", \"name\":\"" + $scope.name + "\", \"email\":\"" + $scope.email + "\", \"item\":\"" + $scope.item + "\", \"amount\":\"" + $scope.amount + "\", \"status\":\"" + $scope.status + "\"}";
        fetch('http://localhost:3005/add', {
            method: "POST",
            body: newEntry,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        $scope.id = "";
        $scope.name = "";
        $scope.category = "";
        $scope.rating = "";
    };
});

app.config(($routeProvider)=>{
    $routeProvider
        .when("/", {
            templateUrl: "view.html",
        })
        .when("/add", {
            templateUrl: "add.html",
        })
});


function showInp(inp){
    document.querySelectorAll(".srcInp").forEach(x=>{
        if(x.id !== inp){
            x.classList.add('d-none');
        }
        else{
            x.classList.remove('d-none');
        }
    })
}