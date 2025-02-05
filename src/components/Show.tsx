import { Children, ReactNode } from 'react';

interface ShowProps {
  children: ReactNode;
}

interface ShowWhenProps {
  isTrue: boolean;
  name?: string;
  children: ReactNode;
}

interface ShowElseProps {
  isTrue?: ReactNode;
  children: ReactNode;
}

export const Show: React.FC<ShowProps> & {
  When: React.FC<ShowWhenProps>;
  Else: React.FC<ShowElseProps>;
} = (props) => {
  let when: ReactNode[] = [];
  let otherwise: ReactNode = null;

  Children.forEach(props.children, (child) => {
    const children = child as React.ReactElement<ShowWhenProps | ShowElseProps>;

    if (!children.props.isTrue) {
      otherwise = children;
    } else if (children.props.isTrue === true) {
      when = [...when, children];
    }
  });

  return when.length > 0 ? when : otherwise;
};

const When: React.FC<ShowWhenProps> = ({ isTrue, name, children }) =>
  isTrue && children;
Show.When = When;

const Else: React.FC<ShowElseProps> = ({ isTrue, children }) =>
  isTrue || children;
Show.Else = Else;
