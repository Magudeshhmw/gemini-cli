/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { describe, it, expect } from 'vitest';
import { identifySessionsToDelete } from './sessionCleanup.js';
import type { Settings } from '../config/settings.js';

describe('sessionCleanup forever reproduction', () => {
  it('should handle "forever" variations in maxAge without throwing', async () => {
    const variations = [
      'forever',
      'Forever',
      'FOREVER',
      ' forever ',
      'Forever ',
    ];
    for (const v of variations) {
      const retentionConfig = {
        enabled: true,
        maxAge: v,
      };

      const sessions = await identifySessionsToDelete([], retentionConfig);
      expect(sessions).toEqual([]);
    }
  });

  it('should log error for " forever " because of missing trim', async () => {
    const settings: Settings = {
      general: {
        sessionRetention: {
          enabled: true,
          maxAge: ' forever ',
        },
      },
    };

    const sessions = await identifySessionsToDelete(
      [],
      settings.general!.sessionRetention!,
    );
    expect(sessions).toEqual([]);
  });
});
