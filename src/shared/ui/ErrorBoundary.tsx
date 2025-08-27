import { Component, type ErrorInfo, type ReactNode } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Code,
  Paper,
} from '@mantine/core';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Nullable<Error>;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return (
        <Container size="sm" py="xl">
          <Paper shadow="sm" p="lg" withBorder>
            <Stack gap="md">
              <Title order={2} c="red">
                Something went wrong
              </Title>

              <Text c="dimmed">
                An unexpected error occurred. The error details have been logged
                to the console.
              </Text>

              <Code block color="red">
                {this.state.error.message}
              </Code>

              {this.state.error.stack && (
                <details>
                  <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>
                    <Text size="sm" component="span" c="dimmed">
                      Show stack trace
                    </Text>
                  </summary>
                  <Code block style={{ fontSize: '12px' }}>
                    {this.state.error.stack}
                  </Code>
                </details>
              )}

              <Button variant="filled" onClick={this.handleReset}>
                Try Again
              </Button>
            </Stack>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}
