// 객체 구조 분해 할당
console.log('----객체 구조 분해 할당----');

const animalObj = {
  accessory: 'horn',
  animal: 'horse',
  color: 'purple',
  hairType: 'curly'
}

function buildAnimal(animalData){
  // 기존의 할당 방법 -> .연산자를 이용
  // let accessory = animalData.accessory,
  //   animal = animalData.animal,
  //   color = animalData.color,
  //   hairType = animalData.hairType;

  // 객체 구조 분해 할당
  // 반드시 객체 property 랑 같은 이름을 써야함
  let {accessory, animal, color, hairType} = animalData
  console.log(accessory);
  console.log(animal);
  console.log(color);
  console.log(hairType);
  // 객체 내에서 원하는 값만 쓸 수 있음
  // let {accessory, hairType} = animalData

  // 이거는 내 마음대로 변수명을 설정해서 undefined
  let {a, an, c, h} = animalData
  // undefined 가 출력된다
  console.log(a);
  console.log(an);
  console.log(c);
  console.log(h);

  // 내 마음대로 변수명 쓰고싶으면? 지정해줘야함
  let {accessory: acc, animal: ani, color: col, hairType: hair} = animalData;
  console.log(acc);
  console.log(ani);
  console.log(col);
  console.log(hair);
}

buildAnimal(animalObj);

// 객체 안 객체는!?
const people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith'
    }
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones'
    }
  }
]
// 객체 안 객체는 똑같이 대괄호{} 로 접근할 수 있음,
// default 값을 설정할 수 있음 -> 객체에 속성이 없으면 default 출력
for (const{ name: n, family: {mother: m, father: f='존재하지 않음'}} of people){
  console.log(`${n} 의 엄마는 ${m}, 아빠는 ${f}`);
}
// 출력 결과
/*
Mike Smith 의 엄마는 Jane Smith, 아빠는 Harry Smith
Tom Jones 의 엄마는 Norah Jones, 아빠는 존재하지 않음
*/



// 배열 구조 분해 할당
console.log('----배열 구조 분해 할당----');

let [a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a);       // 10
console.log(b);       // 20
console.log(rest);    // [30, 40, 50]

const week = ['mon', 'tue', 'wed', 'thu', 'fri'];
// 쉼표를 이용해서 배열 중 원하는 값만 가져올 수 있음
let [day1,,day3,,day5] = week;
console.log(day1);   // mon
console.log(day3);   // wed
console.log(day5);   // fri