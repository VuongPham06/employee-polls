import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Navigation Bar', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
  });

  it('Verify the navigation bar displays all expected links.', () => {
    const homeTab = screen.getByRole('tab', { name: /home/i });
    const leaderboardTab = screen.getByRole('tab', { name: /leaderboard/i });
    const newQuestionTab = screen.getByRole('tab', { name: /new question/i });

    expect(homeTab).toBeInTheDocument();
    expect(leaderboardTab).toBeInTheDocument();
    expect(newQuestionTab).toBeInTheDocument();
  });

  it('Verify redirects to the correct URL when a tab is clicked', () => {
    fireEvent.click(screen.getByRole('tab', { name: /home/i }));
    expect(window.location.pathname).toEqual('/');

    fireEvent.click(screen.getByRole('tab', { name: /leaderboard/i }));
    expect(window.location.pathname).toEqual('/leaderboard');

    fireEvent.click(screen.getByRole('tab', { name: /new question/i }));
    expect(window.location.pathname).toEqual('/add-new-question');
  });
});
