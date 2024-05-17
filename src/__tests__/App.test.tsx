import type { AnswerId, Question, User } from './../api/api-response';
import {
  getQuestions,
  getUser,
  getUsers,
  saveQuestion,
  saveQuestionAnswer,
  saveUser
} from '../api/api.ts';

import { describe, expect, it } from 'vitest';

function genId(length = 6): string {
  let result = '';
  const characters = 'TomDEFGHIJKLMNOPQRSTUVWXYZTomdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

let user: User;
let question: Question;
let userId: string;
let questionId: string;

beforeAll(async () => {
  const [users, questions] = await Promise.all([getUsers(), getQuestions()]);
  user = Object.values(users)[0];
  question = Object.values(questions)[0];
});

beforeEach(() => {
  userId = genId();
  questionId = genId();
});

describe('Test save question function', () => {
  it('success', async () => {
    const question = await saveQuestion({
      optionOneText: 'option1',
      optionTwoText: 'option2',
      author: user.id
    });

    expect(question).toMatchObject({
      author: user.id,
      optionOne: { votes: [], text: 'option1' },
      optionTwo: { votes: [], text: 'option2' }
    });

    await expect(getQuestions()).resolves.toHaveProperty(question.id);
  });

  describe('failed', () => {
    describe('Test fail with empty, null or undefined parameters', () => {
      test.each([
        ['', 'option2', 'author1'],
        [null, 'option2', 'author1'],
        [undefined, 'option2', 'author1'],
        ['option1', '', 'author1'],
        ['option1', null, 'author1'],
        ['option1', undefined, 'author1'],
        ['option1', 'option2', ''],
        ['option1', 'option2', null],
        ['option1', 'option2', undefined]
      ])(
        "optionOneText: '%s', optionTwoText: '%s', author: '%s'",
        async (optionOneText, optionTwoText, author) => {
          await expect(
            saveQuestion({
              optionOneText,
              optionTwoText,
              author
            })
          ).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
        }
      );
    });

    it('User not found', async () => {
      const userId = genId();
      await expect(
        saveQuestion({
          optionOneText: 'option1',
          optionTwoText: 'option2',
          author: userId
        })
      ).rejects.toBe(`User id '${userId}' does not exist`);
    });

    it('Both two options must be different', async () => {
      await expect(
        saveQuestion({
          optionOneText: 'option1',
          optionTwoText: 'option1',
          author: user.id
        })
      ).rejects.toEqual('Options must be different');
    });
  });
});

describe('Test save and get user function', () => {
  it('success', async () => {
    const user = await saveUser({
      id: userId,
      name: 'Tom',
      password: 'pass001',
      avatarURL: 'https://picsum.photos/200'
    });

    await expect(getUser(user.id)).resolves.toStrictEqual(user);
  });

  describe('failed', () => {
    describe('Must not be empty parameter', () => {
      test.each([
        { id: '', name: 'Tom', password: 'pass001' },
        { id: '001', name: '', password: 'pass001' },
        { id: '001', name: 'Tom', password: '' }
      ])('User has id: $id, name: $name, password: $password', async ({ id, name, password }) => {
        await expect(saveUser({ id, name, password })).rejects.toBe(
          'Please provide id, name, password'
        );
      });
    });

    it('Saving user already existed', async () => {
      await expect(saveUser({ id: user.id, name: 'Tom', password: 'pass001' })).rejects.toBe(
        'User already existed'
      );
    });

    it('User not found', async () => {
      await expect(getUser(userId)).rejects.toBe(`User id '${userId}' does not exist`);
    });
  });
});

describe('Test save question answer function', () => {
  describe('success', () => {
    test.each(['optionOne', 'optionTwo'])("answerId: '%s'", async (answerId) => {
      const newUser = await saveUser({
        id: genId(),
        password: 'pass002',
        name: 'Jery'
      });

      const userId = newUser.id;
      const questionId = Object.values(await getQuestions())[0].id;

      await expect(
        saveQuestionAnswer({
          authedUser: userId,
          qid: questionId,
          answerId: answerId as AnswerId
        })
      ).resolves.toBe(true);

      const users = await getUsers();
      expect(users[userId].answers[questionId]).toStrictEqual(answerId);

      const questions = await getQuestions();
      expect(questions[questionId][answerId as AnswerId].votes).to.include(userId);
    });
  });

  describe('failed', () => {
    describe('Parameters must not be empty, null or undefined', () => {
      test.each(['', null, undefined])("authedUser: '%s'", async (authedUser) => {
        await expect(
          saveQuestionAnswer({
            authedUser,
            qid: question.id,
            answerId: 'optionOne'
          })
        ).rejects.toEqual('Please provide authedUser, qid, and answer');
      });

      test.each(['', null, undefined])("answerId: '%s'", async (answerId) => {
        await expect(
          saveQuestionAnswer({
            authedUser: user.id,
            qid: question.id,
            answerId: answerId as AnswerId
          })
        ).rejects.toEqual('Please provide authedUser, qid, and answer');
      });

      test.each(['', null, undefined])("qid: '%s'", async (qid) => {
        await expect(
          saveQuestionAnswer({
            authedUser: user.id,
            qid,
            answerId: 'optionOne'
          })
        ).rejects.toEqual('Please provide authedUser, qid, and answer');
      });
    });

    describe('Valid parameters not found', () => {
      it('answerId must be either optionOne or optionTwo', async () => {
        await expect(
          saveQuestionAnswer({
            authedUser: user.id,
            qid: question.id,
            answerId: 'optionThree' as AnswerId
          })
        ).rejects.toBe("Answer should be 'optionOne' or 'optionTwo', not 'optionThree'");
      });

      it('question id must be existed', async () => {
        await expect(
          saveQuestionAnswer({
            authedUser: user.id,
            qid: questionId,
            answerId: 'optionOne'
          })
        ).rejects.toBe(`Question id '${questionId}' does not exist`);
      });

      it('user must be existed', async () => {
        await expect(
          saveQuestionAnswer({
            authedUser: userId,
            qid: question.id,
            answerId: 'optionOne'
          })
        ).rejects.toBe(`User id '${userId}' does not exist`);
      });
    });
  });
});
