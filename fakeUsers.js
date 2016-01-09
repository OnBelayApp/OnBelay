var User = require('./server/models').User;
​
var seedUsers = [
    {
      username: 'SnowAlone',
      password: 'castleblack',
      name: {
        first: 'Jon',
        last: 'Snow'
      },
      zipcode: 1,
      skillLevel: 'expert',
      gender: 'male',
      climb: true
    },
    {
      username: 'TeamLannister4Life',
      password: 'casterlyrock',
      name: {
        first: 'Cersei',
        last: 'Lannister'
      },
      zipcode: 1,
      skillLevel: 'beginner',
      gender: 'female',
      climb: true
    },
    {
      username: 'DragonDragonDragon',
      password: 'cominghome',
      name: {
        first: 'Daenerys',
        last: 'Targaryen'
      },
      zipcode: 1,
      skillLevel: 'intermediate',
      gender: 'female',
      climb: true
    },
    {
      username: 'SamDaSlaya',
      password: 'oldtown',
      name: {
        first: 'Samwell',
        last: 'Tarly'
      },
      zipcode: 1,
      skillLevel: 'beginner',
      gender: 'male',
      climb: true
    },
    {
      username: 'ValarMorghulis',
      password: 'valardohaeris',
      name: {
        first: 'Arya',
        last: 'Stark'
      },
      zipcode: 1,
      skillLevel: 'advanced',
      gender: 'female',
      climb: true
    }
  ];
​
module.exports = function() {
  User.find({}, function(err, users) {
    if (users.length) {
      return;
    }
​
    seedUsers.forEach(function(user) {
      var newUser = new User(user);
      newUser.hashPassword(newUser.password, function(hash) {
        newUser.password = hash;
        newUser.save(function(err, user) {
          if (err) console.error(err);
        });
      });
    });   
  });
};