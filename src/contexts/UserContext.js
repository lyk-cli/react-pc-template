/**
 * user context
 */
import React, { createContext } from "react";

export const UserContext = createContext({ value: { name: "" } });

export function withUser(Component) {
  // const displayName = `withRouter(${Component.displayName || Component.name})`;
  const displayName = Component.name;

  const C = props => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <UserContext.Consumer>
        {context => (
          <Component
            {...remainingProps}
            {...context}
            ref={wrappedComponentRef}
          />
        )}
      </UserContext.Consumer>
    );
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  // return hoistStatics(C, Component);
  return C;
}
