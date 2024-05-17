import { render, screen, waitFor } from '@testing-library/react';
import { LeaderboardPage } from '../pages/leaderboard/LeaderboardPage';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import * as API from '../api/api';
import { fetchUsers } from '../redux/slices/users-slice';

describe('LeaderboardPage', async () => {
  const mockUsers = Object.values(await API.getUsers());

  beforeEach(async () => {
    await store.dispatch(fetchUsers());

    render(
      <Provider store={store}>
        <LeaderboardPage />
      </Provider>
    );

    await waitFor(() => {
      screen.getByText('Leader Board');
    });
  });

  it('Display correct user information on Leader Board', () => {
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();

      const questionCells = screen.getAllByRole('cell', { name: String(user.questions.length) });
      const answerCells = screen.getAllByRole('cell', {
        name: String(Object.keys(user.answers).length)
      });

      questionCells.forEach((questionCell) => {
        if (questionCell.parentElement?.parentElement?.previousElementSibling) {
          const userNameCell =
            questionCell.parentElement.parentElement.previousElementSibling.querySelector('p');
          if (userNameCell && userNameCell.textContent === user.name) {
            expect(questionCell).toBeInTheDocument();
          }
        }
      });

      answerCells.forEach((answerCell) => {
        if (answerCell.parentElement?.parentElement?.previousElementSibling) {
          const userNameCell =
            answerCell.parentElement.parentElement.previousElementSibling.querySelector('p');
          if (userNameCell && userNameCell.textContent === user.name) {
            expect(answerCell).toBeInTheDocument();
          }
        }
      });
    });
  });
});
