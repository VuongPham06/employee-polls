export type UserId = string;
export type QuestionId = string;
export type AnswerId = 'optionOne' | 'optionTwo';

export interface Question {
  id: QuestionId;
  author: UserId;
  timestamp: number;

  optionOne: {
    votes: UserId[];
    text: string;
  };

  optionTwo: {
    votes: UserId[];
    text: string;
  };
}

export type QuestionsDictionary = Record<QuestionId, Question>;

export interface User {
  id: UserId;
  name: string;
  password: string;
  avatarURL: string | null;
  questions: QuestionId[];
  answers: Record<QuestionId, AnswerId>;
}

export type UsersDictionary = Record<UserId, User>;

export enum Status {
  IDLE = 'idle',
  SUCCESS = 'success',
  LOADING = 'loading',
  FAILED = 'failed'
}

export interface AuthenticatedUser {
  id: string | null;
  name: string | null;
  avatarURL: string | null;
  password: string | null;
  status: Status;
}

export interface PublicUser {
  id: string;
  name: string;
  avatarURL: string | null;
}
