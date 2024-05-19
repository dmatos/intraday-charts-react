import * as React from 'react';
import {Unstable_NumberInput as NumberInput} from '@mui/base/Unstable_NumberInput';
import {styled} from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export interface TimeframeProps{
    onChangeCallback: (value: string|undefined) => void
}

const TimeframeInput = (timeframeProps: TimeframeProps) => {

    const changeTimeframe = ( event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
                              value: number | undefined) => {
        timeframeProps.onChangeCallback(`${value}`);
    }

    return <NumberInput
        aria-label="Timeframe"
        placeholder="Minutes"
        min={1} max={99}
        onChange = {changeTimeframe}
        slots={{
            root: StyledInputRoot,
            input: StyledInput,
            incrementButton: StyledButton,
            decrementButton: StyledButton,
        }}
        slotProps={{
            incrementButton: {
                children: <AddIcon fontSize="small" />,
                className: 'increment',
            },
            decrementButton: {
                children: <RemoveIcon fontSize="small" />,
            },
        }}
    />;
}

const StyledInputRoot = styled('div')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.secondary};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styled('input')(
    ({ theme }) => `
  font-size: 10px;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.secondary.contrastText};
  background: ${theme.palette.background.paper};
  border: 0px solid ${theme.palette.secondary.dark};
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${theme.palette.secondary.dark};
  }
  
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  color: ${theme.palette.secondary.contrastText};
  background: ${theme.palette.background.paper};
  border: 0px solid ${theme.palette.secondary.dark};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
     color: ${theme.palette.secondary.dark};
  background: ${theme.palette.background.default};
  border: 1px solid ${theme.palette.secondary.dark};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);

export default TimeframeInput;
