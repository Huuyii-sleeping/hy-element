<template>
  <div class="row">
    <div class="col">
      <div class="desc">disabled</div>
      <hy-dropdown :items="items" disabled>
        <span class="dropdown-link">
          Dropdown List
          <hy-icon icon="angle-down"></hy-icon>
        </span>
      </hy-dropdown>
    </div>
    <div class="col">
      <div class="desc">undisabled</div>
      <hy-dropdown :items="items">
        <span class="dropdown-link">
          Dropdown List
          <hy-icon icon="angle-down"></hy-icon>
        </span>
      </hy-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type DropdownItemProps } from 'hy-element';
const items: DropdownItemProps[] = [
  { command: '1', label: 'Action1' },
  { command: '2', label: 'Action2' },
  { command: '3', label: 'Action3', disabled: true },
  { command: '4', label: 'Action4', divided: true},
]
</script>