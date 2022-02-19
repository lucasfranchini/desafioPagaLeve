export default class IdNotFoundError extends Error {
  constructor(id: String) {
    super(`Invalid id: ${id} Object not found`);

    this.name = "IdNotFoundError";
  }
}
