// 08.07.23 Typescript Challenges
// (https://github.com/type-challenges/type-challenges)

'use strict';

type Combined = { a: number } & { b: string };    // sensible Union Type
type Conflicting = { a: number } & { a: string }; // Union Type that will fail / cause a Type-Error

const test = { a: {} } as Conflicting;


// Union Types
type SomeMultiplesOf10 = 10 | 20 | 30 // Unit Types

const a: SomeMultiplesOf10 = 30;


// Discriminated Unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number }
  | { kind: 'nesting', child?: Shape };

const b: Shape = { kind: 'nesting', child: { kind: 'nesting' } }

const arr: Readonly<Array<number>> = [1, 2];
// @ts-expect-error
arr.push(3);

// @ts-expect-error
arr.slingshot()


// Recursive Types
type Horse = string;
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const horse: OnlyBoolsAndHorses = {
  some_key: false,
}

type keyMap = {
  key_1: string,
  key_2: string,
}


type OptionsFlags<SomeType> = {
  [P in keyof SomeType]: boolean;
};

let xp: OptionsFlags<keyMap> = {
  key_1: false,
  key_2: true
};


type Animal2 = (k: string) => void;

const foo: Animal2 = (key) => {
  return;
}


type Obj = {
  id: string,
  name: string,
  age: number,
}

type ObjString<T> = {
  [k in keyof T]: T[k] extends string ? true : false
}

type N = ObjString<Obj>


// type assertions start
// use sparingly -> runtime errors!
type First = {
  first: string,
}
type FirstAndSecond = {
  first: string,
  second: string,
}

const oFirst = {
  first: 'foo',
} as FirstAndSecond;
// here we expect the type of 'myObj' to be of type 'FirstAndSecond'
// even though this is not the case
//

// 10.07.23
//
// FUNDAMENTALS ('Types.pdf')
//
//
// Types vs. Interfaces
//
// - interfaces can only describe object shapes
// - interfaces can be extended by declaring it multiple times
interface MyShape {
  name: string,
}
interface MyShape {
  size: number
}

const someShape: MyShape = {
  name: 'myShape',
  size: 10,
}

// Primitive Types
type Length = number;
type Name = string;

// Object Literal Type
type Person = {
  name: string,
  age: number,
}

// Tuple Type
type Point2D = [x: number, y: number]
const myPoint: Point2D = [2, 3];
// @ts-expect-error
const notAPoint: Point2D = [0, 1, 2];

// Union Type
type ExecutionStates = 'queued' | 'running' | 'finished';

// Intersection Type
type Point = { x: number } & { y: number };

// Type Indexing
type Response2 = { data: string[] }
type Data = Response2['data']

// Type from Value
const foobar = { foo: 'foo', bar: 10 }
type Foo = typeof foobar;

// Type from Func Return
const guessPerson = () => ({ name: 'Bob', age: 34 });
type GuessedName = ReturnType<typeof guessPerson>

// Mapped Types
// https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md
type MyPick<T, K extends keyof T> = { [k in K]: T[k] }

type Fruits = {
  0: 'apple',
  1: 'mango',
  2: 'banana',
  3: 'strawberry'
}
type FruitsILike = MyPick<Fruits, 0 | 2 | 3>

// Conditional Types
type HasName<T> = T extends { name: string } ? T : never;

type Guy = { name: string, age: number };
type Thing = { id: '123' };
type RAM  = { size: 1024 };

type TheThings = Guy | Thing | RAM;
type NamedThing = HasName<TheThings>

// Template Union Types
type Assets = 'banner' | 'logo' | 'welcome';
type FileTypes = 'png' | 'jpg';
type Files = `${Assets}.${FileTypes}`;


// FUNDAMENTALS ('interfaces.pdf')

type Model = {
  name: string
}
interface Renderer {
  running: boolean,
  /** returns current model in scene */
  getModel: (scene?: string) => Model,
  (): Renderer // object can be called
  readonly id: string // property cannot be changed
  // a property not described already is assumed to exist and all properties must be numbers
  // [key: string]: number
}
