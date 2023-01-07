const app = angular.module('myApp', ["ngRoute"]);
app.controller('myCtrl', ($scope, $http)=>{
    $http.get('http://localhost:3005/')
        .then((res)=>{
            $scope.data = res.data;
        })
});

app.config(($routeProvider)=>{
    $routeProvider
        .when("/view", {
            templateUrl: "view.html"
        });
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