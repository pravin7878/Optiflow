"use client"
import React from "react"

import { Portal, Select, createListCollection } from "@chakra-ui/react"

const CustomSelect = ({ data, label, placeholder, defaultValue,size }) => {

  if (!data || data.length === 0) return null;

  const collection = createListCollection({ items: data });

  return (
    <Select.Root
      collection={collection}
      size={size}
      defaultValue={defaultValue} 
      maxW={"xs"}
    >
      <Select.HiddenSelect />
      {label && <Select.Label>{label}</Select.Label>}
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder ?? ""} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {data.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default CustomSelect;