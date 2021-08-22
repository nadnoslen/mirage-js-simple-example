import Data from "./data"
import { startMirage } from "./mirage"

import * as data from "./data"
// -------------------------------------------------------------------------------------------------------- Before/After

let server

beforeEach(() => {
  server = startMirage();
});

afterEach(() => {
  server.shutdown();
});

// --------------------------------------------------------------------------------------------------------------- Tests

it('will return no users when requesting `/allUsers`', done => {
  new Data().allUsers().then(response => {
    expect(response.users.length).toBe(0);
    done();
  })
});

it('will return five users created by the mirage factory when requesting `/allUsers`', done => {
  server.createList('user', 5);

  new Data().allUsers().then(response => {
    expect(response.users.length)
        .toBe(5);
    done();
  })
});

it('will throw 404 when specific user cannot be found', async () => {
  await expect(new Data().lookupUser(-1))
      .rejects
      .toThrow('Response not 2xx.  Status Code 404')
});

it('will return the requested user and their factory created information', done => {
  let factoryUser = server.create('user');

  new Data().lookupUser(factoryUser.id).then(response => {
    expect(response.user.email)
        .toBe(factoryUser.email);
    done();
  });
});

// @ponicode
describe("allUsers", () => {
    let inst

    beforeEach(() => {
        inst = new data.default()
    })

    test("0", async () => {
        await inst.allUsers()
    })
})

// @ponicode
describe("lookupUser", () => {
    let inst

    beforeEach(() => {
        inst = new data.default()
    })

    test("0", async () => {
        await inst.lookupUser("c466a48309794261b64a4f02cfcc3d64")
    })

    test("1", async () => {
        await inst.lookupUser("b'nXQpVsglEGFJgfK'")
    })

    test("2", async () => {
        await inst.lookupUser("/people/%s/@self")
    })

    test("3", async () => {
        await inst.lookupUser("A1234")
    })

    test("4", async () => {
        await inst.lookupUser("fake_user_id")
    })

    test("5", async () => {
        await inst.lookupUser(undefined)
    })
})
