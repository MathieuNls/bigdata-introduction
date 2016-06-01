# An Introduction to big data for eXia students

This is the code part of an big data introduction [course](https://docs.google.com/presentation/d/1ktjFywgAkm0rUqZpl6Rr_Wgu12Kzjt457vYdMg40U-g/edit?usp=sharing) for [eXia.Cesi](https://exia.cesi.fr/).

It contains:

- A showcase of a binary tree for index purposes (not limited to big data).

```javascript
    bst.insert(15, {name: "Mathieu", lastname: "Nayrolles"});
    console.log(bst.search(15));
```

- A map reduce application

```javascript
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
```

- An application that finds tweets by users using Map/reduce and BST
