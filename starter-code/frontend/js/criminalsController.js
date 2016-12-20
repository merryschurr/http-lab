angular.module('CriminalsApp', [])
  .controller('CriminalsController', CriminalsController);

CriminalsController.$inject = ['$http'];//using our $http library -like how we required other libraries

function CriminalsController($http){
  var self = this; //making this a global variable
  this.all = [];
  self.addCriminal = addCriminal;
  self.newCriminal ={};
  self.getCriminals = getCriminals;
  self.deleteCriminal = deleteCriminal;

  function getCriminals() {
    $http
    .get ('http://localhost:3000/criminals')//when the success hook fires do this
    .then (function(response){
      self.all = response.data.criminals;
    });
  }

  getCriminals();

  function addCriminal() {
    $http
    .post('http://localhost:3000/criminals', self.newCriminal)
    .then (function(response){
      getCriminals();
      });
     self.newCriminal ={};
  }

  function deleteCriminal(criminal) {
    $http
    .delete('http://localhost:3000/criminals/' + criminal._id)
    .then (function(response){
      var index = self.all.indexOf(criminal);
     self.all.splice(index,1);

    });
  }
}

