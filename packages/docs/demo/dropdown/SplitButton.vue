<script setup lang="ts">
import { type DropdownItemProps, hyMessage } from "hy-element";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];

function handleClick() {
  hyMessage.info("button click");
}
</script>

<template>
  <div class="row">
    <hy-dropdown :items="items">
      <hy-button type="primary">
        Dropdown List
        <hy-icon icon="angle-down" style="margin-left: 8px" />
      </hy-button>
    </hy-dropdown>
    <hy-dropdown
      :items="items"
      type="primary"
      @click="handleClick"
      split-button
    >
      Dropdown List
    </hy-dropdown>
  </div>
</template>

<style scoped>
.row div {
  margin-right: 16px;
}
</style>
