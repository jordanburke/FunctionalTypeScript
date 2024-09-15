import { _Functor_ } from "../functor"
import { List } from "../list"
import { none, Option, some } from "../option"

export type Either<L, R> = {
  value: L | R

  isLeft(): boolean

  isRight(): boolean

  map<U>(f: (value: R) => U): Either<L, U>

  flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U>

  toOption(): Option<R>

  toList(): List<R>
} & _Functor_<R>

export class Right<L, R> implements Either<L, R> {
  constructor(public value: R) {}

  isLeft(): this is Left<L, R> {
    return false
  }

  isRight(): this is Right<L, R> {
    return true
  }

  map<U>(f: (value: R) => U): Either<L, U> {
    return new Right<L, U>(f(this.value))
  }

  flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U> {
    return f(this.value)
  }

  toOption(): Option<R> {
    return some<R>(this.value)
  }

  toList(): List<R> {
    return List<R>([this.value])
  }
}

export class Left<L, R> implements Either<L, R> {
  constructor(public value: L) {}

  isLeft(): this is Left<L, R> {
    return true
  }

  isRight(): this is Right<L, R> {
    return false
  }

  map<U>(_f: (value: R) => U): Either<L, U> {
    return new Left<L, U>(this.value)
  }

  flatMap<U>(_f: (value: R) => Either<L, U>): Either<L, U> {
    return new Left<L, U>(this.value)
  }

  toOption(): Option<R> {
    return none<R>()
  }

  toList(): List<R> {
    return List()
  }
}
