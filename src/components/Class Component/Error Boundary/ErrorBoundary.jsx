import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
        };
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        }
    };

    componentDidCatch(error, info) {
        console.log("Error: ", error);
        console.log("From Here error is coming:", info);
    }

    render() {
        if (this.state.hasError) {
            <div style={{
                textAlign: "center",
                marginTop: "4rem",
                padding: "2rem",
                border: "1px solid red",
                borderRadius: "10px",
                width: "80%",
                marginInline: "auto"
            }}>
                <h1 style={{ color: "red" }}>⚠️ Oops! Something went wrong.</h1>
                <p style={{ marginTop: "1rem", fontSize: "18px" }}>
                    {this.state.error.message}
                </p>
            </div>
        }
        return (
            <>
                {this.props.children}
            </>
        )
    }
}

export default ErrorBoundary;