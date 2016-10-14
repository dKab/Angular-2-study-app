var faker = require('faker');
module.exports = function () {
 let fakeData = {
   courses: {
     data: []
   }
 };

 for (let i=0; i<25; i++) {
   let authors = [], course;

   for (let i = 0; i < 3; i++) {
      authors.push(faker.name.findName());
   }
   course = {
     id: i,
     title: faker.company.catchPhrase(),
     date: i%2 === 0 ? faker.date.future() : faker.date.past(),
     description: faker.lorem.paragraph(),
     duration: 60,
     authors: authors
   };

   fakeData.courses.data.push(course);
 }

 return fakeData;
};
