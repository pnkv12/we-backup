import React from "react";
import LoadingIndicator from "../Loading.js"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Custom Error Message from app loading failure
      return <LoadingIndicator/>;
    }

    return this.props.children;
  }
}
