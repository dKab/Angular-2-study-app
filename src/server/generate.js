var faker = require('faker');
module.exports = function () {
 let fakeData = {
   courses: [],
   authors: []
 }, numberOfCourses = 25;

 for (let i=0; i<numberOfCourses; i++) {
   let authors = [], authorsPerCourse = 3, course;

   for (let k = 0; k < authorsPerCourse; k++) {
      authors.push({
        id: (i*authorsPerCourse)+k,
        name: faker.name.findName()
      });
   }
   course = {
     id: i,
     title: faker.company.catchPhrase(),
     date: i%2 === 0 ? faker.date.future() : faker.date.past(),
     description: faker.lorem.paragraph(),
     duration: 60,
     authors: authors
   };

   fakeData.courses.push(course);
   fakeData.authors.push(...authors);
 }

 return fakeData;
};
