//Create Angular App
const app = angular.module('myApp', ["ngRoute"]);

//View Controller (R)
app.controller('viewCtrl', ($scope, $http)=>{
    $http.get('http://localhost:3005/')
        .then((res)=>{
           $scope.data = res.data;
        });
});


//Adding entry into database (C)
app.controller('addCtrl', function ($scope){
    $scope.addEntry = function () {
        const newEntry = `{"id": "${$scope.id}", "name": "${$scope.name}", "category": "${$scope.category}", "rating": "${$scope.rating}"}`;
        console.log(newEntry);
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

//Update Controller (U)
app.controller('updateCtrl', function ($scope, $http, $route){
    $http.get('http://localhost:3005/')
        .then((res)=>{
            $scope.datas = res.data;
        })

    $scope.getId = function () {
        const selectedID = $scope.id;
        console.log(selectedID);
        $scope.name = selectedID['name'];
        $scope.category = selectedID['category'];
        $scope.rating = selectedID['rating'];
    }

    $scope.update = function () {
        const newData = `{"id":"${$scope.id['id']}", "name":"${$scope.name}", "category":"${$scope.category}", "rating":"${$scope.rating}"}`;

        fetch('http://localhost:3005/update', {
            method: "POST",
            body: newData,
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
            .then(res => console.log(res))
            .catch(err =>console.log(err));

        $route.reload();
        $scope.id = "";
        $scope.name = "";
        $scope.category = "";
        $scope.rating = "";
    }
});

//Delete Controller (D)
app.controller('deleteCtrl', ($scope, $http)=>{
   $http.get('http://localhost:3005/')
       .then((res)=>{
           $scope.data = res.data;
       })
    $scope.delete = function () {
       const delId = `{"id":${$scope.id['id']}}`;

       fetch('http://localhost:3005/delete', {
           method: "POST",
           body:delId,
           headers: {'Content-Type': 'application/json; charset=UTF-8'}
       })
           .then(res => console.log(res))
           .catch(err => console.log(err))
    }
});


//Route Provider
app.config(($routeProvider)=>{
    $routeProvider
        .when("/", {
            templateUrl: "view.html",
        })
        .when("/add", {
            templateUrl: "add.html",
        })
        .when("/update", {
            templateUrl: "update.html",
        })
        .when("/delete", {
            templateUrl: "delete.html",
        })
});

//Input Display for search
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