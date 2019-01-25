import {FormGroup, Radio} from "@patternfly/react-core";
import * as React from "react";


interface FieldEnumProps {
  parent: string;
  id: string;
  name: string;
  description: string;
  values: string[];
  required: boolean;
  value: string;

  onChange?(selected: string);
}

export function FieldEnum(props: FieldEnumProps) {
  const onChange = (_, event) => {
    props.onChange && props.onChange(event.currentTarget.value);
  };
  return (
    <FormGroup label={props.description} isRequired={props.required}
               fieldId={`capability-prop-${props.parent}-${props.id}`}>
      {props.values.map(v => (
        <Radio
          label={v}
          aria-label={`Select ${v} as ${props.name}`}
          checked={props.value === v}
          name={"select-" + props.id}
          id={`select-${props.parent}-${props.id}`}
          value={v}
          onChange={onChange}
        />
      ))}
    </FormGroup>
  );
}
