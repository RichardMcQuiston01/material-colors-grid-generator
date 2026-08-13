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
});
