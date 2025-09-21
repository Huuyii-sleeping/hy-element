<script lang="ts" setup>
import { reactive, ref } from "vue";
import { hyMessage } from "hy-element";

const form = reactive({
  name: "",
  region: "",
  delivery: false,
  desc: "",
});

const options = ref([
  { value: "beijing", label: "Zone One" },
  { value: "shanghai", label: "Zone Two" },
]);

const onSubmit = () => {
  hyMessage.success("submit!");
};
</script>

<template>
  <hy-form :model="form">
    <hy-form-item label="Activity name">
      <hy-input v-model="form.name" />
    </hy-form-item>
    <hy-form-item label="Activity zone">
      <hy-select
        v-model="form.region"
        placeholder="please select your zone"
        :options="options"
      />
    </hy-form-item>
    <hy-form-item label="Instant delivery">
      <hy-switch v-model="form.delivery" />
    </hy-form-item>
    <hy-form-item label="Activity form">
      <hy-input v-model="form.desc" type="textarea" />
    </hy-form-item>
    <hy-form-item>
      <hy-button type="primary" @click="onSubmit">Create</hy-button>
      <hy-button>Cancel</hy-button>
    </hy-form-item>
  </hy-form>
</template>
