var models = require('../index');


var seedSpeakers = function() {

  models.Speaker.findAll({}).then(function(speakers) {
    if (speakers.length === 0) {
      models.Speaker.bulkCreate(
        [
          {
            first_name: 'Ben',
            last_name: 'Johnson',
            email: 'ben@johnson.com',
            topic: 'Python',
            speaking_date: new Date(),
            company: 'Google'
          },
          {
            first_name: 'Charlie',
            last_name: 'Arthur',
            email: 'charlie@arthur.com',
            topic: 'Angular',
            speaking_date: new Date(),
            company: 'Facebook'
          }
        ]
      ).then(function(speaker) {
        console.log('database seeded!');
      });
    }
  });


};

module.exports = seedSpeakers;
