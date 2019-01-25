import * as React from "react";
import {useState} from "react";
import {
  ActionGroup,
  Button,
  DataList,
  DataListCell,
  DataListCheck,
  DataListContent,
  DataListItem,
  Form,
  FormGroup,
  Title,
  Toolbar,
  ToolbarGroup
} from "@patternfly/react-core";
import {FieldEnum} from "./field-enum";

interface Field {
  id: string;
  name: string;
  description: string;
  required: boolean;
  type: string;
  values?: string[]
  default?: string
}

interface CapabilityItem {
  id: string;
  name: string;
  description: string;
  category: string;
  fields?: Field[];
  icon?: string;
  selected: boolean;
  data?: any;
  disabled?: boolean;
}

interface CapabilityCardProps {
  capability: CapabilityItem;

  onChange(capability: CapabilityItem): void;
}


function CapabilityCard(props: CapabilityCardProps) {
  const {capability} = props;

  const onChangeSelected = (selected) => {
    props.onChange({...capability, selected})
  };

  const onChangeData = (data) => {
    props.onChange({...capability, data})
  };
  const elId = `toggle-capability-props-form-${capability.id}`;
  const fields = (capability.fields || []).filter(f => f.type === 'enum');
  return (
    <DataListItem aria-labelledby={capability.id} isExpanded={capability.selected}>
      <DataListCheck aria-labelledby={elId} name="Selection item check" onChange={onChangeSelected}
                     checked={capability.selected} isDisabled={!!capability.disabled}/>
      <DataListCell width={1} style={{flex: 'none'}}><img src={capability.icon}/></DataListCell>
      <DataListCell width={1}><Title size="lg">{capability.name}</Title></DataListCell>
      <DataListCell width={3}>{capability.description}</DataListCell>
      {fields.length > 0 && capability.selected && (
        <DataListContent isHidden={!capability.selected} aria-label={`capability-props-form-${capability.id}`}>
          {fields.map(f => {
            const selectedValue = (capability.data && capability.data[f.id]) || f.default;
            const onFieldChange = (v) => {
              const newData = {...capability.data, [f.id]: v}
              onChangeData(newData);
            };
            return (
              <FieldEnum parent={capability.id} id={f.id} name={f.name} description={f.description} values={f.values!}
                         required={f.required} value={selectedValue}
                         onChange={onFieldChange}
              />
            );
          })}
        </DataListContent>
      )}
    </DataListItem>
  );
}

interface SelectCapabilitiesProps {
  items: CapabilityItem[];

  onSave?(items: CapabilityItem[]);

  onCancel?();
}

export function SelectCapabilities(props: SelectCapabilitiesProps) {

  const [items, setItems] = useState<CapabilityItem[]>(props.items);

  const itemsMap = new Map(items.map(i => [i.id, i] as [string, CapabilityItem]));

  const onChange = (item: CapabilityItem) => {
    itemsMap.set(item.id, item);
    setItems(Array.from(itemsMap.values()));
  };

  const onSave = () => {
    if (props.onSave) {
      props.onSave(items);
    }
  };

  return (
    <Form className="select-capabilities" style={{padding: '20px'}}>
      <FormGroup fieldId={'capabilities'}>
        <DataList aria-label="select-capability">
          {
            items.map((cap, i) => (
              <CapabilityCard
                key={i}
                capability={cap}
                onChange={onChange}
              />
            ))
          }
        </DataList>
      </FormGroup>
      <ActionGroup>
        <Toolbar>
          <ToolbarGroup>
            <Button variant="primary" onClick={onSave}>Save</Button>
          </ToolbarGroup>
          <ToolbarGroup>
            <Button variant="secondary" onClick={props.onCancel}>Cancel</Button>
          </ToolbarGroup>
        </Toolbar>
      </ActionGroup>
    </Form>
  );
}
