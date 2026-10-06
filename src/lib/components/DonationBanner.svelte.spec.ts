import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import DonationBanner from './DonationBanner.svelte';

const DONATE_URL = 'https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800';
const STORAGE_KEY = 'mcgg:donation-dismissed';

beforeEach(() => {
  localStorage.clear();
});

describe('DonationBanner', () => {
  it('links to the Stripe donation page, opening safely in a new tab', () => {
    render(DonationBanner);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', DONATE_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('shows the QR code and the donation message', () => {
    render(DonationBanner);
    expect(
      screen.getByRole('img', {
        name: /QR code linking to the Stripe donation page/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/please consider donating/i)).toBeInTheDocument();
  });

  it('can be dismissed and stays dismissed', async () => {
    const user = userEvent.setup();
    render(DonationBanner);

    await user.click(
      screen.getByRole('button', { name: /dismiss donation message/i }),
    );

    expect(screen.queryByRole('link')).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBe('1');
  });

  it('does not render when already dismissed', () => {
    localStorage.setItem(STORAGE_KEY, '1');
    render(DonationBanner);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('is an inline card, not a floating overlay', () => {
    render(DonationBanner);
    const card = screen.getByRole('complementary', {
      name: 'Support this project',
    });

    expect(card).not.toHaveClass('fixed');
    expect(card).toHaveClass('flex');
  });

  it('puts the QR code to the left of the message', () => {
    render(DonationBanner);
    const qr = screen.getByRole('img', { name: /QR code/i });
    const message = screen.getByText(/please consider donating/i);

    expect(
      qr.compareDocumentPosition(message) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('includes the call to action link text', () => {
    render(DonationBanner);

    expect(screen.getByText('Donate via Stripe →')).toBeInTheDocument();
  });
});
