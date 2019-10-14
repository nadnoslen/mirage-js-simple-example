import { Factory, Model, Server } from '@miragejs/server';
import Faker from 'faker';

let startMirage = function({ environment = 'test' } = {}) {
  return new Server({
    environment,
    models: {
      user: Model
    },
    factories: {
      user: Factory.extend({
        createdAt: () => Faker.date.past(),
        email: () => Faker.internet.email(),
        firstName: () => Faker.name.firstName(),
        lastName: () => Faker.name.firstName(),
        updatedAt: () => Faker.date.past()
      })
    },
    baseConfig() {
      // routes below `this.urlPrefix` assignment are
      // expected to resolve to `https://some.example.com`
      this.urlPrefix = 'https://some.example.com'
      // EXAMPLE: a GET request that returns all users at
      // https://some.example.com/allUsers
      this.get('/allUsers', (schema/*, request*/) => schema.users.all());
      // ... add additional / routes here ...
      // routes below `this.namespace` assignment are
      // expected to resolve to `https://some.example.com/api/v1`
      this.namespace = '/api/v1'
      // EXAMPLE: the resource shorthand will expose the
      // GET/POST/DELETE/PATCH endpoints;
      // e.g. GET/POST of https://some.example.com/api/v1/users
      this.resource('users');
      // ... add additional /api/v1 routes here ...
      // all other XHR requests are passed through to
      // their destinations
      this.passthrough();
    }
  });
};

export { startMirage };