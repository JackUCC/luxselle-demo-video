import React from 'react';
import { Img, staticFile } from 'remotion';
import { colors, fonts } from '../lib/theme';

type MockBrowserProps = {
  screenshot: string | null;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

export const MockBrowser: React.FC<MockBrowserProps> = ({
  screenshot,
  children,
  style,
  innerStyle,
}) => {
  const src = screenshot ? staticFile(screenshot) : null;
  return (
    <div
      style={{
        width: '90%',
        maxWidth: 1600,
        margin: '0 auto',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        backgroundColor: colors.surface,
        ...style,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 48,
          background: colors.border,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          gap: 8,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
        <div
          style={{
            flex: 1,
            marginLeft: 24,
            marginRight: 16,
            height: 28,
            borderRadius: 6,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 12,
            fontSize: 13,
            color: colors.textSecondary,
            fontFamily: fonts.body,
          }}
        >
          {screenshot ? 'app.luxselle.com' : ''}
        </div>
      </div>
      {/* Content area */}
      <div
        style={{
          height: '100%',
          minHeight: 540,
          background: colors.canvas,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...innerStyle,
        }}
      >
        {src ? (
          <Img
            src={src}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'top',
            }}
          />
        ) : (
          <div
            style={{
              color: colors.textSecondary,
              fontSize: 18,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Run npm run capture-screenshots (with dashboard dev server up) for live screenshots
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
