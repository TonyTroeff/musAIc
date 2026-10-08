import type { ApiError, MeResponse } from '../../../../backend/src/types/api';
import SpotifyProfile from '../../../src/components/SpotifyProfile';

const me: MeResponse = {
  clerkUserId: 'user_test',
  spotify: {
    id: 'spotify-test',
    displayName: 'Test Listener',
    email: 'listener@example.test',
    country: 'BG',
    product: 'premium',
    // No avatar: the snapshot must not depend on an external image.
    imageUrl: null,
    profileUrl: 'https://open.spotify.com/user/spotify-test',
  },
};

describe('SpotifyProfile', () => {
  it('loads the profile → shows name, details and Spotify link', () => {
    cy.intercept('GET', '/api/me', { body: me }).as('me');
    cy.mount(<SpotifyProfile />);
    cy.wait('@me');

    cy.contains('h2', 'Test Listener').should('be.visible');
    cy.contains('a', 'Open in Spotify').should('have.attr', 'href', me.spotify.profileUrl);
    cy.get('section[aria-label="Spotify profile"]').matchImage();
  });

  it('API fails → shows the error alert', () => {
    cy.intercept('GET', '/api/me', { statusCode: 401, body: { error: 'Unauthorized' } satisfies ApiError }).as('me');
    cy.mount(<SpotifyProfile />);
    cy.wait('@me');

    cy.get('[role="alert"]').should('contain.text', 'Unauthorized').matchImage();
  });
});
