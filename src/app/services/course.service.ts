export default class CourseService {
  private _name = '';

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

}
