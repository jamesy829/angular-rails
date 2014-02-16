function TodoCtrl($scope) {
  $scope.tasks = [
    {text:'learn angular', completed: 'false'},
    {text:'test angular', completed: 'false'}
  ];

  $scope.addTask = function() {
    $scope.tasks.push({text: $scope.newTask.text, completed: 'false'});
    $scope.newTask = '';
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.tasks, function(task) {
      count += task.completed ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTasks = $scope.tasks;
    $scope.tasks = [];
    angular.forEach(oldTasks, function(task) {
      if (!task.completed) $scope.tasks.push(task);
    });
  };
}
