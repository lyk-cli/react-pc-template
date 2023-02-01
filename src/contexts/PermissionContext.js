/**
 * permission context
 */
import React, { createContext } from "react";

export const PermissionContext = createContext({ value: [] });

export function withPermission(Component) {
  const displayName = Component.name;
  const C = props => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <PermissionContext.Consumer>
        {context => (
          <Component
            {...remainingProps}
            {...context}
            ref={wrappedComponentRef}
          />
        )}
      </PermissionContext.Consumer>
    );
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  return C;
}
