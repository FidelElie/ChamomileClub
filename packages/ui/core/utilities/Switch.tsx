import { createContext, ReactNode, useContext } from "react";
import { Show } from "./Show";

const SwitchContext = createContext<string | number | undefined>(undefined);

const SwitchBlock = (props: SwitchProps) => {
  const { match, else: _else = null, children } = props;

  return (
    <SwitchContext.Provider value={match}>
      <Show if={children} else={_else}>
        {children}
      </Show>
    </SwitchContext.Provider>
  );
};

const SwitchCase = (props: SwitchCaseProps) => {
  const { when, children } = props;

  const match = useContext(SwitchContext);

  if (!match) { throw new Error("Switch.Case should only be used within a Switch component"); }

  return (
    <Show if={match === when}>
      {children}
    </Show>
  );
};

export const Switch = Object.assign(SwitchBlock, { Case: SwitchCase });

export interface SwitchProps {
  match: string | number;
  else?: ReactNode;
  children: ReactNode;
}

export interface SwitchCaseProps {
  when: string | number;
  children: ReactNode;
}
