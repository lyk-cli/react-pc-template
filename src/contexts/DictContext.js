/**
 * dict context
 */
import React, { createContext } from "react";

export const DictContext = createContext({ value: {} });

export function withDict(Component) {
  const displayName = Component.name;
  const C = props => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <DictContext.Consumer>
        {context => (
          <Component
            {...remainingProps}
            {...context}
            ref={wrappedComponentRef}
          />
        )}
      </DictContext.Consumer>
    );
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  return C;
}
