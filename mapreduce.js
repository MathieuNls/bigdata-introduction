/**
 * Demonstrate the built-in mapreduce capabilities of javascript
 */

var developers = [
    { name: "Joe", age: 23 },//0
    { name: "Sue", age: 28 },//23
    { name: "Jon", age: 32 },//23+28
    { name: "Bob", age: 24 }
], age = 0;

// Compute the average age of developers using the mapreduce programming model

age = developers.reduce(function(total, developer){
  return total + developer.age;
}, 0);

console.log('Average age :', age/developers.length);

var doctors = [
    { actor: "William Hartnell",     begin: 1963, end: 1966 },
    { actor: "Patrick Troughton",    begin: 1966, end: 1969 },
    { actor: "Jon Pertwee",          begin: 1970, end: 1974 },
    { actor: "Tom Baker",            begin: 1974, end: 1981 },
    { actor: "Peter Davison",        begin: 1982, end: 1984 },
    { actor: "Colin Baker",          begin: 1984, end: 1986 },
    { actor: "Sylvester McCoy",      begin: 1987, end: 1989 },
    { actor: "Paul McGann",          begin: 1996, end: 1996 },
    { actor: "Christopher Eccleston", begin: 2005, end: 2005 },
    { actor: "David Tennant",        begin: 2005, end: 2010 },
    { actor: "Matt Smith",           begin: 2010, end: 2013 },
    { actor: "Peter Capaldi",        begin: 2013, end: 2013 }
];

// Transform the doctors to look like
// { doctorNumber: "#9",  playedBy: "Christopher Eccleston", yearsPlayed: 1 }
// Only keep the doctors from 2000 to today and order them by alphabetic order.
// Finally, compute the average number of year for the remaining doctors.

doctors = doctors.filter(function(doctor){
  return doctor.begin > 2000;
}).map(function(doctor, index){

  return {
    doctorNumber: "#" + (index+1),
    playedBy : doctor.actor,
    yearsPlayed : doctor.end - doctor.begin +1
  }
}).sort(function(a, b){
  if(a < b){
    return -1;
  }else if(a > b){
    return 1;
  }else {
    return 0;
  }
});

var totalYear = doctors.reduce(function(total, doctor){
  return total + doctor.yearsPlayed;
}, 0);

console.log("Average", totalYear/doctors.length, doctors);
